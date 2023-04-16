import { getContext, getImage } from "./images.js"
import { getCamera, drawMap, getUnits, setPlacingSprite, getPlacingSprite, gridDimensions } from "./map.js"
import { currentPhase, currentTeam, nextPhase, nextTeam } from "./teams.js"
import { getPointer, gameMap } from "./main.js"

let imu = null

let ctx = null

let tooltip = ''

let currentUnit = null

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

function handleAction() {
    if (currentPhase() === 'positioning') {
        let units = getUnits(currentTeam().name).filter(f => !f.placed)
        if (units.length > 0) {
            currentUnit = units[0]
            setPlacingSprite(units[0].sprite)
        } else if (getUnits().filter(f => !f.placed).length > 0) {
            nextTeam()
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
            if (currentPhase() === 'positioning') {
                let cellx = getPointer().cellX() + getCamera().cellX()
                let celly = getPointer().cellY() + getCamera().cellY()
                let bg = ui.Element({ id: 'lblBg', text: ``, rect: { x: 0, y: 0, w: 320, h: 200 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#00000000'})
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
                    delay(300).then(() => handleAction())
                }
            }

            let phase = currentPhase().slice(0, 1).toUpperCase() + currentPhase().slice(1)
            ui.Element({ id: 'lblPhase', text: `${phase}: ${currentTeam().name}`, rect: { x: 10, y: 3, w: 300, h: 9 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#000000cc'})

            ui.Element({ id: 'lblTooltip', text: tooltip, rect: { x: 0, y: 190, w: 240, h: 10 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#000000cc' })
        }
    }
    imu.Draw()
}

export { drawFrame, StartScene }