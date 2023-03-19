import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import menus from './menus.json'
import { Start } from './main.js'

let imu = null

let ctx = null

var stars = 16

var menu = null
var menuItems = []
var menuItem = {}
var currentMenuId = 'Main'
var currentMenuItem = 'Start'
var menuMethods = {
    // callback_GameSetup: () => {
    //     Start()
    // }
    callback_OnRenderStars: (text, replacements) => {
        return [stars.toString()]
    },
    callback_StarUp: () => {
        stars++
        console.log('stars', stars)
    },
    callback_StarDown: () => {
        stars--
        console.log('stars', stars)
    }
}

let menuDx = 0
let menuDy = 0

function Action(actionId) {
    if (actionId.includes('callback_')) {
        return menuMethods[actionId]
    } else if (actionId.includes('menu_')) {
        let action = actionId.split('_')
        currentMenuId = action[1]
        let menu = GetMenu(currentMenuId)
        let menuItems = menu.Options.filter(f => f.onSelect)
        currentMenuItem = menuItems[0].text
        menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]
        console.log(currentMenuId, currentMenuItem)
    }
    return () => {}
}

function GetMenu(id) {
    try {
        return menus.filter(f => f.id === id)[0]
    } catch { return null }
}

function StartMenu(id) {
    input.listen()
    menu = GetMenu(currentMenuId)
    menuItems = menu.Options.filter(f => f.onSelect)
    menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]

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
            console.log(menuItem.onSelect, Action(menuItem.onSelect))
            Action(menuItem.onSelect)()
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

function OnRender(text, onRender) {
    let arr = text.split(/{[0-9]}/)
    let replacements = []
    for (let r in arr) {
        replacements.push(`{${r}}`)
    }
    let values = Action(onRender)(text, arr)
    for (let v in values) {
        text = text.replace(replacements[v], values[v])
    }
    return text
}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font
        imu.onUpdate = (ui) => {
            //ui.Element({ id: 'imgGamename', type: 'Image', x: 10, y: 10, image: getImage('title') })
            let menu = GetMenu(currentMenuId)
            let menuItems = menu.Options

            let dy = menuDy + 30
            for (let i in menuItems) {
                let item = menuItems[i].text
                let menuItem = menuItems[i]
                let colr = item === currentMenuItem ? menu.Style.SelectColor : menuItem.onSelect ? menu.Style.SelectableColor : menu.Style.Color
                let txt = `${currentMenuItem === item ? '>' : ' '}${item}${currentMenuItem === item ? '<' : ' ' }`
                if (txt.includes('{') && txt.includes('}') && menuItem.onRender) {
                    txt = OnRender(txt, menuItem.onRender)
                }
                ui.Element({ id: 'lblMenu' + currentMenuId + item, text: txt, rect: { x: menuDx, y: dy, w: 64, h: 8 }, color: colr, highlight: colr, bgcolor: '#cccccc00' })
                dy += 12
            }
        }
    }
    imu.Draw()
}

export { drawFrame, StartMenu }