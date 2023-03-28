import { getContext } from "./images.js"

var map = null

var width = 36
var height = 24

var gridSize = 10

var startAreaWidth = 24
var startAreaHeight = 10

var camera = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
}

function triangleContains(ax, ay, bx, by, cx, cy, x, y) {

    let det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)

    return  det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) >= 0 &&
            det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) >= 0 &&
            det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) >= 0    

}

function drawMap(delta) {
    let ctx = getContext()

    ctx.strokeStyle = '#f1f1f1ff'
    for (let t in map.tiles) {
        let x = map.tiles[t][0] * gridSize
        let y = map.tiles[t][1] * gridSize
        ctx.strokeRect(x, y, gridSize, gridSize)
    }

    ctx.strokeStyle = '#f1f191ff'
    for (let t in map.teamA) {
        let x = map.teamA[t][0] * gridSize
        let y = map.teamA[t][1] * gridSize
        ctx.strokeRect(x, y, gridSize, gridSize)
    }
    for (let t in map.teamB) {
        let x = map.teamB[t][0] * gridSize
        let y = map.teamB[t][1] * gridSize
        ctx.strokeRect(x, y, gridSize, gridSize)
    }
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
    return map
}

export { buildMap, drawMap }