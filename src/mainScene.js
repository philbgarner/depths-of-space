import { getContext } from "./images.js"
import { drawMap, getUnits, setPlacingSprite } from "./map.js"
import { currentPhase, currentTeam } from "./teams.js"
import { pointer } from "./main.js"

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
        console.log(currentTeam())
        if (units.length > 0) {
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
            let phase = currentPhase().slice(0, 1).toUpperCase() + currentPhase().slice(1)
            ui.Element({ id: 'lblPhase', text: `${phase}: ${currentTeam().name}`, rect: { x: 10, y: 3, w: 300, h: 9 }, color: '#f1f100ff', color: '#f1f100ff', bgcolor: '#000000cc'})

            ui.Element({ id: 'lblTooltip', text: tooltip, rect: { x: 0, y: 0, w: 240, h: 10 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
        }
    }
    imu.Draw()
}

export { drawFrame, StartScene }