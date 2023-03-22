import images from './images.js'
import sfx from './sfx.js'
import music from './music.js'
import sprites from './sprites.js'
import { setContext, loadAllImages } from './images.js'
import { drawFrame as drawMain } from './mainScene.js'
import { drawFrame as drawMainMenu, StartMenu } from './menuScene.js'
import { set, setDictionary } from './grammar.js'
import input from './input.js'

var dateNow = Date.now()
var dateThen = Date.now()

var targetDelta = 16 // Roughly 60fps by default

var currentScene = 'mainMenu'

var pointer = { x: 0, y: 0 }

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

async function Start() {

    input.unlisten()
   
    // Init(CreatePlayer('@', digger.Floors()))
    // Player().slots = [melee, ranged, area]
    // AddTemples(3)
    currentScene = 'main'
}

export { Start, StartMainMenu, pointer }