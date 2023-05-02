import { drawImage, getContext, getImage } from "./images.js"
import { getCamera, drawMap, getUnit, getUnits, setPlacingSprite, getPlacingSprite, gridDimensions, setPotentialMoves, clearPotentialMoves, getPotentialMoves, getPathMoves, clearPathMoves } from "./map.js"
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
            console.log('start', loc.x * gridDimensions().x - 12, loc.y * gridDimensions().y - 20)
            unit.sprite.moveTo(loc.x * gridDimensions().x - 12, loc.y * gridDimensions().y - 20, 0.3).then(() => {
                console.log('end', loc.x * gridDimensions().x - 12, loc.y * gridDimensions().y - 20)
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
                    if (unit) {
                        currentUnit = unit
                        getCamera().setTarget(currentUnit.x * gridDimensions().x - 160, currentUnit.y * gridDimensions().y - 100, 1000)
                        setPotentialMoves(unit, cellx, celly)
                    }
                } else if (bg.Clicked() && currentUnit && currentUnit.actionPoints > 0 && !isMoving && currentUnit.actionPoints > 0) {
                    let moves = JSON.parse(JSON.stringify(getPathMoves())).reverse().slice(1)
                    clearPotentialMoves()
                    startMove(moves).then(() => {
                        currentUnit.x = getPathMoves()[0].x
                        currentUnit.y = getPathMoves()[0].y
                        currentUnit.actionPoints--
                        currentUnit = null
                        clearPathMoves()
                    })
                } else if (bg.Hover() && currentUnit && !isMoving) {
                    setPotentialMoves(currentUnit, cellx, celly)
                }
            }

            if (currentPhase() === 'Movement' && currentUnit) {
                tooltip = `${unit.name} Action Points: ${unit.actionPoints} (${cellx}, ${celly}).`
            }

            let phase = currentPhase().slice(0, 1).toUpperCase() + currentPhase().slice(1)
            ui.Element({ id: 'lblPhase', text: `${phase}: ${currentTeam().name}`, rect: { x: 10, y: 3, w: 300, h: 9 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#000000cc'})

            ui.Element({ id: 'lblTooltip', text: tooltip, rect: { x: 0, y: 190, w: 240, h: 10 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#000000cc' })
        }
    }
    imu.Draw()
}

export { drawFrame, StartScene, getCurrentUnit }