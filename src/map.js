import Actor from "./actor.js"
import { getContext, drawImage } from "./images.js"
import { getTeam } from "./teams.js"
import { pointer } from "./main.js"

var map = null

var width = 36
var height = 24

var gridSize = 24
var gridOpacity = 0.3

var startAreaWidth = 10
var startAreaHeight = 24

var placingSprite = null

var units = []

var camera = {
    x: 24,
    y: 8.5 * gridDimensions().y,
    w: 320 / gridDimensions().x, h: 200 / gridDimensions().y,
    targetX: 0,
    targetY: 8.5 * gridDimensions().y,
}

function setPlacingSprite(sprite) {
    placingSprite = sprite
}

function triangleContains(ax, ay, bx, by, cx, cy, x, y) {

    let det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)

    return  det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) >= 0 &&
            det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) >= 0 &&
            det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) >= 0    

}

function addUnit(teamName, unit) {
    let actor = new Actor({
        team: getTeam(teamName),
        name: unit.name,
        character: unit,
        spriteName: 'player',
        x: 0,
        y: 0
    })
    units.push(actor)
    return actor
}

function getUnits(teamName) {
    console.log(teamName, units)
    if (teamName) {
        return units.filter(f => f.team.name === teamName)
    } else {
        return units
    }
}

function drawMap(delta) {
    let ctx = getContext()
    ctx.save()

    //ctx.translate(-camera.x, -camera.y)

    drawImage('mars-scape', 0, 0)

    let ga = ctx.globalAlpha
    ctx.globalAlpha = gridOpacity
    let tiles = map.tiles
    for (let t in tiles) {
        let x = tiles[t][0] * gridDimensions().x
        let y = tiles[t][1] * gridDimensions().y
        drawImage('grid-white', x, y)
    }

    for (let t in map.teamA) {
        let x = map.teamA[t][0] * gridDimensions().x
        let y = map.teamA[t][1] * gridDimensions().y
        drawImage('grid-yellow', x, y)
    }
    for (let t in map.teamB) {
        let x = map.teamB[t][0] * gridDimensions().x
        let y = map.teamB[t][1] * gridDimensions().y
        drawImage('grid-yellow', x, y)
    }
    ctx.globalAlpha = ga

    if (placingSprite) {
        placingSprite.x = parseInt(((pointer.x) / gridDimensions().x)) * gridDimensions().x - 12
        placingSprite.y = parseInt(((pointer.y) / gridDimensions().y)) * gridDimensions().y - 20
        placingSprite.update(delta)
        placingSprite.draw()
        bfontjs.DrawText(getContext(), placingSprite.x + 8, placingSprite.y + 40, 'Unit Name', '#f1f1f1ff', font)
    }

    ctx.restore()
}

function gridDimensions() {
    return { x: gridSize, y: gridSize }
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
        tiles: tiles, teamA: teamATiles, teamB: teamBTiles, allTiles: tiles
    }
    map.tiles = map.tiles.filter(f => !map.teamA.filter(a => a[0] === f[0] && a[1] === f[1]).length && !map.teamB.filter(b => f[0] === b[0] && f[1] === b[1]).length)
    console.log('map =', map)
    return map
}

export { buildMap, drawMap, gridDimensions as gridSize, addUnit, setPlacingSprite, getUnits }