import { getContext } from "./images.js"

let imu = null

let ctx = null

let tooltip = ''

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 320, 200)

    /*ctx.save()
    ctx.translate(120 - Player().x * TileSizes().x, 80 - Player().y * TileSizes().y)
    DrawFOV(Player())
    Player().draw()
    let spriteObjs = getSpriteObjects()
    for (let index in spriteObjs) {
        spriteObjs[index].update(16)
        spriteObjs[index].draw()
    }

    ctx.restore()*/

    drawUI()
}

function drawMap(delta) {
    
}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font

        imu.onUpdate = (ui) => {
            ui.Element({ id: 'lblTooltip', text: tooltip, rect: { x: 0, y: 0, w: 240, h: 10 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
        }
    }
    imu.Draw()
}

export { drawFrame }