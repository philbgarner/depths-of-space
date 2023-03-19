import images from './images.js'
import sfx from './sfx.js'
import music from './music.js'
import sprites from './sprites.js'
import { setContext, loadAllImages } from './images.js'
import { drawFrame as drawMain } from './mainScene.js'
import { drawFrame as drawMainMenu, handleEvent, SetMenu } from './menuScene.js'
import { set, setDictionary } from './grammar.js'
import input from './input.js'

var dateNow = Date.now()
var dateThen = Date.now()

var targetDelta = 16 // Roughly 60fps by default

var currentScene = 'mainMenu'

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

    SetMenu()

    setTargetFrameRate(60)
    setContext(canvas.getContext('2d'))

    handleEvent()

    window.requestAnimationFrame(requestAnimationFrame)
}

async function Start(melee, ranged, area) {

    input.unlisten()

    setDictionary(bestiary.dictionary)
    LoadCombatBonusTable()

    set('dirt_floors', ['floor', 'floor_dirt'])
    set('grimoire', grimoire)

    let digger = await Digger(30, 30)
    
    Init(CreatePlayer('@', digger.Floors()))
    Player().slots = [melee, ranged, area]
    AddTemples(3)
    currentScene = 'main'
}

export { Start, StartMainMenu }