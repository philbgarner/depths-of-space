import input from "./input.js"
import { drawImage, getContext, getImage } from "./images.js"
import { getCamera, drawMap, getUnit, getUnits, setPlacingSprite, getPlacingSprite, gridDimensions,
    setPotentialMoves, clearPotentialMoves, getPotentialMoves, getPathMoves, clearPathMoves } from "./map.js"
import { currentPhase, currentTeam, nextPhase, nextTeam } from "./teams.js"
import { getPointer, gameMap } from "./main.js"

let imu = null

let ctx = null

let tooltip = ''

let currentUnit = null

let isMoving = false

function getCurrentUnit() {
    return currentUnit
}

function delay(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 320, 200)

    drawMap(delta)

    drawUI(delta)
}

async function startMove(moves) {
    isMoving = true
    function prom(unit, loc) {
        return new Promise((resolve, reject) => {
            unit.sprite.moveTo(loc.x * gridDimensions().x - 12, loc.y * gridDimensions().y - 20, 0.3).then(() => {
                resolve()
            })
        })
    }
    for (let m in moves) {
        await prom(currentUnit, moves[m])
    }
    isMoving = false
}

function handleAction() {
    if (currentPhase() === 'positioning') {
        let units = getUnits(currentTeam().name).filter(f => !f.placed)
        if (units.length > 0) {
            currentUnit = units[0]
            setPlacingSprite(units[0].sprite)
        } else if (getUnits().filter(f => !f.placed).length > 0) {
            nextTeam()
            let home = currentTeam().homePosition
            getCamera().setTarget(home.x, home.y, 1500)
            handleAction()
        } else {
            nextPhase()
        }
    }
}

function StartScene() {
    input.listen()

    input.released('moveDown', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x, getCamera().y + 48, 320)
    })
    input.released('moveUp', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x, getCamera().y - 48, 320)
    })
    input.released('moveRight', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x + 48, getCamera().y, 320)
    })
    input.released('moveLeft', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x - 48, getCamera().y, 320)
    })

    input.pressed('moveDown', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x, getCamera().y + 96, 6)
    })
    input.pressed('moveUp', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x, getCamera().y - 96, 6)
    })
    input.pressed('moveRight', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x + 96, getCamera().y, 6)
    })
    input.pressed('moveLeft', () => {
        if (!getCamera().isMoving()) getCamera().setTarget(getCamera().x - 96, getCamera().y, 6)
    })
    
    handleAction()
}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font

        imu.onUpdate = (ui) => {
            let cellx = parseInt((getPointer().x + getCamera().x) / gridDimensions().x)
            let celly = parseInt((getPointer().y + getCamera().y) / gridDimensions().y)
            let bg = ui.Element({ id: 'lblBg', text: ``, rect: { x: 0, y: 0, w: 320, h: 200 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#00000000'})
            
            if (bg.Clicked() && bg.state.mouseButton === 2) {
                currentUnit = null
                clearPathMoves()
                clearPotentialMoves()
            }
            
            if (currentPhase() === 'positioning') {
                if (bg.Hover() && currentUnit) {
                    if (gameMap.hasTeamATile(cellx, celly)) {
                        tooltip = 'Place unit.'
                    } else {
                        tooltip = `Invalid location (${cellx},${celly}), place inside the yellow area.`
                    }
                }
                if (bg.Clicked() && currentUnit) {
                    currentUnit.x = cellx
                    currentUnit.y = celly
                    currentUnit.sprite.x = cellx * gridDimensions().x - 12
                    currentUnit.sprite.y = celly * gridDimensions().y - 20
                    currentUnit.placed = true
                    setPlacingSprite(null)
                    currentUnit = null
                    tooltip = `Placed at ${cellx}, ${celly}.`
                    nextTeam()
                    let home = currentTeam().homePosition
                    getCamera().setTarget(home.x, home.y, 1500)        
                    delay(300).then(() => handleAction())
                }
            } else if (currentPhase() === 'movement') {
                if (bg.Clicked() && currentUnit === null && !isMoving) {
                    let unit = getUnit(cellx, celly)
                    if (unit && !unit.moved) {
                        currentUnit = unit
                        getCamera().setTarget(currentUnit.x * gridDimensions().x - 160, currentUnit.y * gridDimensions().y - 100, 1000)
                        setPotentialMoves(unit, cellx, celly)
                    }
                } else if (bg.Clicked() && currentUnit && !isMoving && !currentUnit.moved) {
                    let moves = JSON.parse(JSON.stringify(getPathMoves())).reverse().slice(1)
                    clearPotentialMoves()
                    startMove(moves).then(() => {
                        currentUnit.x = getPathMoves()[0].x
                        currentUnit.y = getPathMoves()[0].y
                        currentUnit.moved = true
                        currentUnit.actionPoints--
                        currentUnit = null
                        clearPathMoves()
                    })
                } else if (bg.Hover() && currentUnit && !isMoving) {
                    setPotentialMoves(currentUnit, cellx, celly)
                }

                if (getUnits().filter(f => !f.moved).length === 0) {
                    currentUnit = null
                    nextPhase()
                    nextTeam()
                    let teamUnits = getUnits(currentTeam().name)
                    getUnits().forEach(u => u.moved = false)
                    if (teamUnits.length > 0) {
                        currentUnit = teamUnits[0]
                        getCamera().setTarget(teamUnits[0].x * gridDimensions().x - 160, teamUnits[0].y * gridDimensions().y - 100, 1000)
                    }
                } else if (getUnits(currentTeam().name).filter(f => !f.moved).length === 0) {
                    currentUnit = null
                    nextTeam()
                    let home = currentTeam().homePosition
                    getCamera().setTarget(home.x, home.y, 1500)        
                }
            } else if (currentPhase() === 'active') {
                let paramsGreyListImage = {
                    bgcolor: '#122020ff',
                    color: '#cacacaff',
                    bgcolorSelected: '#122020ff',
                    colorSelected: '#f1f1f1ff',
                    highlight: '#f1f1f1ff',
                    scrollbarWidth: 9,
                    scrollAreaImage: {
                        image: getImage('ui-button-scroll-area'),
                        hover: getImage('ui-button-scroll-area'),
                        pressed: getImage('ui-button-scroll-area'),
                        innerRect: { x: 3, y: 4, w: 7, h: 40 }
                    },
                    caratImage: {
                        image: getImage('ui-button-carat'),
                        hover: getImage('ui-button-carat-hover'),
                        pressed: getImage('ui-button-carat-pressed')
                    },
                    upImage: {
                        image: getImage('ui-button-scroll-up'),
                        hover: getImage('ui-button-scroll-up-hover'),
                        pressed: getImage('ui-button-scroll-up-pressed')
                    },
                    downImage: {
                        image: getImage('ui-button-scroll-down'),
                        hover: getImage('ui-button-scroll-down-hover'),
                        pressed: getImage('ui-button-scroll-down-pressed')
                    }
                }

                tooltip = 'Active phase.'
                if (currentUnit) {
                    let elActions = ui.Element({ id: 'actionsList', type: 'ListImage', list: ['Throw Object >', 'Reload', 'Abilities >', 'Done'], rect: {x: 8, y: 19, w: 96, h: 32 }, ...paramsGreyListImage})
                    if (elActions.Clicked()) {
                        let action = elActions.list[elActions.currentItem]
                        if (action === 'Done') {
                            currentUnit.moved = true
                            currentUnit = null
                            clearPathMoves()
                            clearPotentialMoves()
                            nextTeam()
                            let teamUnits = getUnits(currentTeam().name).filter(f => !f.moved)
                            if (teamUnits.length > 0) {
                                getCamera().setTarget(teamUnits[0].x * gridDimensions().x - 160, teamUnits[0].y * gridDimensions().y - 100, 1000)
                                currentUnit = teamUnits[0]
                            } else if (getUnits().filter(f => !f.moved).length === 0) {
                                currentUnit = null
                                nextPhase()
                                getUnits().forEach(u => u.moved = false)
                                let teamUnits = getUnits(currentTeam().name)
                                if (teamUnits.length > 0) {
                                    currentUnit = teamUnits[0]
                                    getCamera().setTarget(teamUnits[0].x * gridDimensions().x - 160, teamUnits[0].y * gridDimensions().y - 100, 1000)
                                }
                            }
                        }
                    }
                } else if (bg.Clicked() && currentUnit === null) {
                    let unit = getUnit(cellx, celly)
                    if (unit && !unit.moved) {
                        currentUnit = unit
                        getCamera().setTarget(currentUnit.x * gridDimensions().x - 160, currentUnit.y * gridDimensions().y - 100, 1000)
                    }
                }
            } else if (currentPhase() === 'siege') {
                tooltip = 'Siege phase.'
            }

            if (currentUnit) {
                if (getCurrentUnit().x > getPointer().cellX()) {
                    getCurrentUnit().sprite.flipped = true
                } else {
                    getCurrentUnit().sprite.flipped = false
                }
            }

            if (currentPhase() === 'movement' && currentUnit) {
                tooltip = `${currentUnit.name} Action Points: ${currentUnit.actionPoints} (${cellx}, ${celly}).`
            }

            let phase = currentPhase().slice(0, 1).toUpperCase() + currentPhase().slice(1)
            ui.Element({ id: 'lblPhase', text: `${phase}: ${currentTeam().name}`, rect: { x: 10, y: 3, w: 300, h: 9 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#000000cc'})

            ui.Element({ id: 'lblTooltip', text: tooltip, rect: { x: 0, y: 190, w: 240, h: 10 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#000000cc' })
        }
    }
    imu.Draw()
}

export { drawFrame, StartScene, getCurrentUnit }