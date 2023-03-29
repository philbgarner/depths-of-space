import { getContext, drawImage } from "./images.js"

var map = null

var width = 36
var height = 24

var gridSize = 24
var gridOpacity = 0.6

var startAreaWidth = 10
var startAreaHeight = 24

var camera = {
    x: 0,
    y: 8.5 * gridSize,
    targetX: 0,
    targetY: 8.5 * gridSize,
}

function triangleContains(ax, ay, bx, by, cx, cy, x, y) {

    let det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)

    return  det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) >= 0 &&
            det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) >= 0 &&
            det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) >= 0    

}

function drawMap(delta) {
    let ctx = getContext()
    ctx.save()

    ctx.translate(-camera.x, -camera.y)

    let ga = ctx.globalAlpha
    ctx.globalAlpha = gridOpacity
    let tiles = map.tiles
    for (let t in tiles) {
        let x = tiles[t][0] * gridSize
        let y = tiles[t][1] * gridSize
        drawImage('grid-white', x, y)
    }

    for (let t in map.teamA) {
        let x = map.teamA[t][0] * gridSize
        let y = map.teamA[t][1] * gridSize
        drawImage('grid-yellow', x, y)
    }
    for (let t in map.teamB) {
        let x = map.teamB[t][0] * gridSize
        let y = map.teamB[t][1] * gridSize
        drawImage('grid-yellow', x, y)
    }
    ctx.globalAlpha = ga

    ctx.restore()
}

function buildMap() {
    var tiles = []
    var teamATiles = []
    var teamBTiles = []

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            tiles.push([x, y])
            
            if (triangleContains(0, parseInt(height / 2) - parseInt(startAreaHeight / 2), startAreaWidth, parseInt(height / 2), 0, parseInt(height / 2) + parseInt(startAreaHeight / 2), x, y)) {
                teamATiles.push([x, y])
            }
            if (triangleContains(width, parseInt(height / 2) - parseInt(startAreaHeight / 2), width - startAreaWidth, parseInt(height / 2), width, parseInt(height / 2) + parseInt(startAreaHeight / 2), x, y)) {
                teamBTiles.push([x, y])
            }
        }
    }
    map = {
        tiles: tiles, teamA: teamATiles, teamB: teamBTiles
    }
    map.tiles = map.tiles.filter(f => !map.teamA.filter(a => a[0] === f[0] && a[1] === f[1]).length && !map.teamB.filter(b => f[0] === b[0] && f[1] === b[1]).length)
    return map
}

export { buildMap, drawMap }