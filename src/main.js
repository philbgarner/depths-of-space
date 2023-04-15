import images from './images.js'
import sfx from './sfx.js'
import music from './music.js'
import sprites from './sprites.js'
import Actor from './actor.js'
import { setContext, loadAllImages } from './images.js'
import { drawFrame as drawMain, StartScene } from './mainScene.js'
import { drawFrame as drawMainMenu, StartMenu } from './menuScene.js'
import { set, setDictionary } from './grammar.js'
import input from './input.js'
import { addTeam, currentTeam } from './teams.js'
import { addUnit, gridDimensions } from './map.js'

var dateNow = Date.now()
var dateThen = Date.now()

var targetDelta = 16 // Roughly 60fps by default

var currentScene = 'mainMenu'

var pointer = { x: 0, y: 0 }

var gameMap = null

function getPointer() {
    return { ...pointer, cellX: () => parseInt(pointer.x / gridDimensions().x), cellY: () => parseInt(pointer.y / gridDimensions().y) }
}

function setTargetFrameRate(target) {
    targetDelta = parseInt(1000 / target) // Number of ms divided by target fps
}

function requestAnimationFrame() {
    dateNow = Date.now()
    let delta = dateNow - dateThen
    if (delta >= targetDelta) {
        drawFrame(delta)
        dateThen = dateNow
    }
    window.requestAnimationFrame(requestAnimationFrame)
}

/**
 * Draws the animation frame.
 * @param {number} delta Number of ms since last frame.
 */
function drawFrame(delta) {
    if (currentScene === 'mainMenu') {
        drawMainMenu(delta)
    } else if (currentScene === 'main') {
        drawMain(delta)
    }
}

async function StartMainMenu() {
    await loadAllImages()

    let canvas = document.getElementById('maincanvas')
    let ratio = canvas.width / canvas.height
    canvas.style.height = window.innerHeight + 'px'
    canvas.style.width = window.innerHeight * ratio + 'px'
    window.addEventListener('resize', () => {
        canvas.style.height = window.innerHeight + 'px'
        canvas.style.width = window.innerHeight * ratio + 'px'
      })
        
    canvas.addEventListener('mousemove', (e) => {
        pointer.x = parseInt((e.clientX - canvas.offsetLeft) * (canvas.width / parseInt(canvas.style.width))) - 2
        pointer.y = parseInt((e.clientY - canvas.offsetTop) * (canvas.height / parseInt(canvas.style.height)))
    })

    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        return false
    })     

    setTargetFrameRate(60)
    setContext(canvas.getContext('2d'))

    StartMenu()

    window.requestAnimationFrame(requestAnimationFrame)
}

async function Start(squad, map) {

    gameMap = map

    input.unlisten()
    let canvas = document.getElementById('maincanvas')
    currentScene = 'main'

    addTeam('Team Alpha', '2d10')
    addTeam('Team Bravo', '1d1')
    
    for (let s in squad) {
        addUnit('Team Alpha', squad[s])
    }

    setTargetFrameRate(60)
    setContext(canvas.getContext('2d'))

    StartScene()

    window.requestAnimationFrame(requestAnimationFrame)
}

export { Start, StartMainMenu, getPointer, pointer, gameMap }