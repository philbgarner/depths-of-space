import { getContext, getImage } from "./images.js"
import { getCamera, drawMap, getUnits, setPlacingSprite, getPlacingSprite } from "./map.js"
import { currentPhase, currentTeam } from "./teams.js"
import { getPointer, gameMap } from "./main.js"

let imu = null

let ctx = null

let tooltip = ''

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
        let units = getUnits(currentTeam().name)
        if (units.length > 0) {
            console.log('setting place sprite for', currentTeam(), units[0].sprite)
            setPlacingSprite(units[0].sprite)
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
                if (bg.Hover() && getPlacingSprite() !== null) {
                    if (gameMap.hasTeamATile(cellx, celly)) {
                        tooltip = 'Place unit.'
                    } else {
                        tooltip = `Invalid location (${cellx},${celly}), place inside the yellow area.`
                    }
                }
                if (bg.Clicked()) {
                    setPlacingSprite(null)
                    tooltip = `Placed at ${cellx}, ${celly}.`
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