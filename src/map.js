var width = 36
var height = 24

var startAreaWidth = 24
var startAreaHeight = 10

var camera = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
}

function buildMap() {
    var tiles = []
    var teamATiles = []
    var teamBTiles = []

    let mx = 0
    let my = 0

    for (let y = 0; my < height; y++) {
        for (let x = 0; mx < width; x++) {
            tiles.push([x, y])
        }
    }
    
    return {
        tiles: tiles, teamA: teamATiles, teamB: teamBTiles
    }
}
