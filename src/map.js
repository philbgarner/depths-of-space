import Actor from "./actor.js"
import { getContext, drawImage } from "./images.js"
import { currentPhase, getTeam, getTeams } from "./teams.js"
import { getPointer } from "./main.js"
import { getCurrentUnit } from "./mainScene.js"

var map = null

var width = 36
var height = 24

var gridSize = 24
var gridOpacity = 0.3

var startAreaWidth = 10
var startAreaHeight = 24

var placingSprite = null

var movementTiles = []
var movementPath = []

var units = []

var camera = {
    x: 24,
    y: 8.5 * gridDimensions().y,
    // x: 0, y: 0,
    w: width * gridDimensions().x, h: height * gridDimensions().y,
    targetX: 24,
    targetY: 8.5 * gridDimensions().y,
    targetStartX: 24,
    targetStartY: 8.5 * gridDimensions().y,
    targetDuration: 0,
    targetElapsed: 0
}

function getPotentialMoves() {
    return movementPath
}

function setPotentialMoves(unit, destX, destY) {
    movementTiles = []
    movementPath = []
    
    function handleMove(tx, ty, tiles, dist) {
        dist = parseFloat(dist)
        if (dist < 0) {
            return
        }
        let tileList = tiles.filter(f => f.x === tx && f.y === ty)
        if (tileList.length === 0) {
            tiles.push([tx, ty])
            handleMove(tx + 1, ty, tiles, dist - 1)
            handleMove(tx, ty - 1, tiles, dist - 1)
            handleMove(tx - 1, ty, tiles, dist - 1)
            handleMove(tx, ty + 1, tiles, dist - 1)
        }
    }
    handleMove(unit.x, unit.y, movementTiles, unit.character.Speed())

    function manhattanDistance(q, toX, toY) {
        return Math.abs (q.x - toX) + Math.abs (q.y -
            toY)
    }

    function getSuccessor(q, dx, dy, toX, toY) {
        let s = { x: q.x + dx, y: q.y + dy, parent: q, g: q.g + manhattanDistance(q, q.x + dx, q.y + dy), h: manhattanDistance({ x: q.x + dx, y: q.y + dy }, toX, toY)}
        s.f = s.g + s.h
        return s
    }

    function astar(tiles, startX, startY, toX, toY, mv) {
        if (!tiles) {
            return []
        }
        if (startX === toX && startY === toY) {
            return []
        }
        if (tiles.filter(f => f[0] === toX && f[1] === toY).length === 0) {
            return []
        }

        let open = []
        let closed = []
        open.push({ x: startX, y: startY, parent: null, g: 0, h: 0, f: 0 })
        while (open.length > 0) {
            let q = open.sort((a, b) => a.f - b.f)[0]
            
            open = open.filter(f => f.x !== q.x && f.y !== q.y)

            let successors = []
            
            if (tiles.filter(f => f[0] === q.x + 1 && f[1] === q.y).length > 0) {
                successors.push(getSuccessor(q, 1, 0, toX, toY))
            }
            if (tiles.filter(f => f[0] === q.x - 1 && f[1] === q.y).length > 0) {
                successors.push(getSuccessor(q, -1, 0, toX, toY))
            }    
            if (tiles.filter(f => f[0] === q.x && f[1] === q.y + 1).length > 0) {
                successors.push(getSuccessor(q, 0, 1, toX, toY))
            }
            if (tiles.filter(f => f[0] === q.x && f[1] === q.y - 1).length > 0) {
                successors.push(getSuccessor(q, 0, -1, toX, toY))
            }
            for (let index in successors) {
                let s = successors[index]
                s.f = s.g + s.h
                if (s.x === toX && s.y === toY) {
                    // Goal
                    let curr = s
                    let path = []
                    while (curr !== null) {
                        path.push(curr)
                        curr = curr.parent
                    }
                    if (path.length > mv + 1) {
                        return []
                    }
                    return path
                }
                
                let closedNode = closed.filter(f => f.x === s.x && f.y === s.y && f.f > s.f)
                if (closedNode.length === 0) {
                    open.push(s)
                }
            }
            closed.push(q)
            if (closed.length > tiles.length) {
                // console.error('Error: More closed tiles than possible tiles in the list. Dumping current path.')
                let curr = q
                let path = []
                while (curr !== null) {
                    curr.f = q.g + manhattanDistance(curr, toX, toY)
                    path.push(curr)
                    curr = curr.parent
                }
                return path
            }
        }
        return open
    }

    movementPath = astar(movementTiles, unit.x, unit.y, destX, destY, unit.character.Speed())
    console.log('movementPath', movementPath)
}

function clearPotentialMoves() {
    movementTiles = []
}

function BezierBlend(t)
{
    return t * t * (3.0 - 2.0 * t)
}

function getCamera() {
    return { ...camera, cellX: () => parseInt(camera.x / gridDimensions().x), cellY: () => parseInt(camera.y / gridDimensions().y),
        setTarget: (x, y, duration) => {
            camera.targetStartX = camera.x
            camera.targetStartY = camera.y
            camera.targetX = x
            camera.targetY = y
            camera.targetDuration = duration
            camera.targetElapsed = 0
        }
    }
}

function setPlacingSprite(sprite) {
    placingSprite = sprite
}

function getPlacingSprite() {
    return placingSprite
}

function triangleContains(ax, ay, bx, by, cx, cy, x, y) {

    let det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)

    return  det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) >= 0 &&
            det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) >= 0 &&
            det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) >= 0    

}

function addUnit(teamName, unit, flipped) {
    let actor = new Actor({
        team: getTeam(teamName),
        name: unit.name,
        character: unit,
        spriteName: 'player',
        x: 0,
        y: 0
    })
    if (flipped) {
        actor.sprite.flipped = flipped
    }
    units.push(actor)
    return actor
}

function getUnits(teamName) {
    if (teamName) {
        return units.filter(f => f.team.name === teamName)
    } else {
        return units
    }
}

function getUnit(x, y) {
    let unit = units.filter(f => f.x === x && f.y === y)
    return unit.length > 0 ? unit[0] : null
}

function drawMap(delta) {
    let ctx = getContext()
    ctx.save()

    ctx.translate(-camera.x, -camera.y)

    drawImage('mars-scape', 0, 0)

    let cellx = parseInt((getPointer().x + getCamera().x) / gridDimensions().x)
    let celly = parseInt((getPointer().y + getCamera().y) / gridDimensions().y)

    if (currentPhase() === 'positioning') {
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
    }

    movementTiles.forEach(t => drawImage('grid-green', t[0] * gridDimensions().x, t[1] * gridDimensions().y))
   
    if (getPotentialMoves().length > 0) {
        getPotentialMoves().forEach(loc => {
            drawImage('grid-selected', loc.x * gridDimensions().x, loc.y * gridDimensions().y)
        })
    }

    // Highlighted mouse cell.
    drawImage('grid-selected', cellx * gridDimensions().x, celly * gridDimensions().y)

    if (placingSprite) {
        placingSprite.x = cellx * gridDimensions().x - 12
        placingSprite.y = celly * gridDimensions().y - 20
        placingSprite.update(delta)
        placingSprite.draw()
        bfontjs.DrawText(getContext(), placingSprite.x + 12, placingSprite.y + 44, placingSprite.actor.name, '#000000cc', font)
        bfontjs.DrawText(getContext(), placingSprite.x + 12, placingSprite.y + 43, placingSprite.actor.name, '#f1f1f1ff', font)
    }

    getTeams().forEach(team => {
        let units = getUnits(team.name).filter(f => f.placed)
        for (let u in units) {
            units[u].sprite.update(delta)
            let colr = '#f1f1f1cc'
            if (getCurrentUnit() === units[u]) {
                colr = '#f1f1f1ff'
                drawImage('unit-selected', units[u].x * gridDimensions().x, units[u].y * gridDimensions().y)
            }
            units[u].sprite.draw()
            bfontjs.DrawText(getContext(), units[u].sprite.x + 12, units[u].sprite.y + 44, units[u].name, '#000000cc', font)
            bfontjs.DrawText(getContext(), units[u].sprite.x + 12, units[u].sprite.y + 43, units[u].name, colr, font)
        }
    })

    ctx.restore()

    if (camera.targetDuration > 0) {
        //parseInt(startVal + (this.anim.destination[param] - startVal) * BezierBlend(this.anim.elapsed / this.anim.duration))
        camera.x = parseInt(camera.targetStartX + (camera.targetX - camera.targetStartX) * BezierBlend(camera.targetElapsed / camera.targetDuration))
        camera.y = parseInt(camera.targetStartY + (camera.targetY - camera.targetStartY) * BezierBlend(camera.targetElapsed / camera.targetDuration))
        camera.targetElapsed += delta
        if (camera.targetElapsed >= camera.targetDuration) {
            camera.targetDuration = 0
            camera.x = camera.targetX
            camera.y = camera.targetY
        }
    }
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
            //if (triangleContains(width, parseInt(height / 2) - parseInt(startAreaHeight / 2), width - startAreaWidth, parseInt(height / 2), width, parseInt(height / 2) + parseInt(startAreaHeight / 2), x, y)) {
            if (triangleContains(width, parseInt(height / 2) - parseInt(startAreaHeight / 2), width - startAreaWidth, parseInt(height / 2), width, parseInt(height / 2) + parseInt(startAreaHeight / 2), x, y)) {
                teamBTiles.push([x, y])
            }
        }
    }
    map = {
        tiles: tiles, teamA: teamATiles, teamB: teamBTiles, allTiles: tiles
    }
    map.hasTile = (x, y) => {
        return map.tiles.filter(f => f[0] === x && f[1] === y).length > 0
    }
    map.hasTeamATile = (x, y) => {
        return map.teamA.filter(f => f[0] === x && f[1] === y).length > 0
    }
    map.hasTeamBTile = (x, y) => {
        return map.teamB.filter(f => f[0] === x && f[1] === y).length > 0
    }
    map.tiles = map.tiles.filter(f => !map.teamA.filter(a => a[0] === f[0] && a[1] === f[1]).length && !map.teamB.filter(b => f[0] === b[0] && f[1] === b[1]).length)
    console.log('map =', map)
    return map
}

export { buildMap, drawMap, gridDimensions, addUnit, setPlacingSprite, getPlacingSprite, getUnits, getUnit, getCamera, setPotentialMoves, clearPotentialMoves, getPotentialMoves }