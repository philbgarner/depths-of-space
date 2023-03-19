import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import menus from './menus.json'
import { Start } from './main.js'

let imu = null

let ctx = null

var currentMenuId = 'Main'
var currentMenuItem = 'Start'
var menuMethods = {
    menu_GameSetup: () => {
        Start()
    }
}

let menuDx = 0
let menuDy = 0

function StartMenu(id) {
    input.listen()
    let menu = menus.filter(f => f.id === currentMenuId)[0]
    let menuItems = menu.Options
    let menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]

    input.released('moveDown', () => {
        let index = menuItems.findIndex(f => f.text === currentMenuItem)
        index++
        if (index >= menuItems.length) {
            index = 0
        }
        currentMenuItem = menuItems[index].text
    })
    input.released('moveUp', () => {
        let index = menuItems.findIndex(f => f.text === currentMenuItem)
        index--
        if (index < 0) {
            index = menuItems.length - 1
        }
        currentMenuItem = menuItems[index].text
    })
    input.released('attack', () => {
        if (menuItem.onSelect) {
            menuMethods[menuItem.onSelect]()
        }
    })
}

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 240, 160)

    drawUI(delta)
}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font
        imu.onUpdate = (ui) => {
            //ui.Element({ id: 'imgGamename', type: 'Image', x: 10, y: 10, image: getImage('title') })
            let menu = menus.filter(f => f.id === currentMenuId)[0]
            let menuItems = menu.Options

            let dy = menuDy + 30
            for (let i in menuItems) {
                let item = menuItems[i].text
                let menuItem = menuItems[i]
                let colr = item === currentMenuItem ? menu.Style.SelectColor : menuItem.onSelect ? menu.Style.SelectableColor : menu.Style.Color
                ui.Element({ id: 'lblMenu' + currentMenuId + item, text: `${currentMenuItem === item ? '>' : ' '}${item}${currentMenuItem === item ? '<' : ' ' }`, rect: { x: menuDx, y: dy, w: 64, h: 8 }, color: colr, highlight: colr, bgcolor: '#cccccc00' })
                dy += 12
            }
        }
    }
    imu.Draw()
}

export { drawFrame, StartMenu }