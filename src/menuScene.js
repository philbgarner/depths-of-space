import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import menus from './menus.json'
import { Start } from './main.js'
import { Character } from './character.js'

let imu = null

let ctx = null

var stars = 16

var squad = []

var menu = null
var menuItems = []
var menuItem = {}
var currentMenuId = 'Main'
var currentMenuItem = 'Start'
var menuMethods = {
    callback_OnRenderStars: (text, replacements) => {
        return [stars.toString()]
    },
    callback_OnRenderHireSquad: (text, replacements) => {
        return [squad.length]
    },

    callback_OnRenderCharacter: (text, replacements) => {
        let name = text.split(' ')[0].replace('>', '')
        return [(squad.filter(f => f.name === name).length)]
    },

    callback_HireCharacter: (text) => {
        let name = text.split(' ')[0].replace('>', '')
        let char = new Character(name)
        if (stars - char.Cost() >= 0) {
            squad.push(char)
            stars -= char.Cost()
        }
    },

    callback_SelectCharacterEquip: (text) => {
        console.log('character equip', text)
    },

    callback_SetupEquipment: (text) => {
        let menu = menus.filter(f => f.id === 'SetupEquipment')[0]
        let nextIndex = menu.Options.findIndex(f => f.text === 'Next')
        menu.Options = [
            menu.Options[0],
            ...squad.map(m => {
            return {
                text: m.name,
                onSelect: 'callback_SelectCharacterEquip',
                width: '90%'
            }}),
            menu.Options[nextIndex]
        ]
        ChangeMenu('SetupEquipment')
    }
}

let menuDx = 0
let menuDy = 0

function Action(actionId) {
    if (actionId.includes('callback_')) {
        return menuMethods[actionId] ? menuMethods[actionId] : () => {}
    } else if (actionId.includes('menu_')) {
        let action = actionId.split('_')
        ChangeMenu(action[1])
    }
    return () => {}
}

function ChangeMenu(id) {
    input.unlisten()
    currentMenuId = id
    let menu = GetMenu(currentMenuId)
    let menuItems = menu.Options.filter(f => f.onSelect)
    currentMenuItem = menuItems[0].text
    menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]
    input.listen()
}

function GetMenu(id) {
    try {
        return menus.filter(f => f.id === id)[0]
    } catch { return null }
}

function StartMenu(id) {
    input.listen()

    input.released('moveDown', () => {
        menu = GetMenu(currentMenuId)
        menuItems = menu.Options.filter(f => f.onSelect)
        menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]
        let index = menuItems.findIndex(f => f.text === currentMenuItem)
        index++
        if (index >= menuItems.length) {
            index = 0
        }
        currentMenuItem = menuItems[index].text
    })
    input.released('moveUp', () => {
        menu = GetMenu(currentMenuId)
        menuItems = menu.Options.filter(f => f.onSelect)
        menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]
        let index = menuItems.findIndex(f => f.text === currentMenuItem)
        index--
        if (index < 0) {
            index = menuItems.length - 1
        }
        currentMenuItem = menuItems[index].text
    })
    input.released('attack', () => {
        menu = GetMenu(currentMenuId)
        menuItems = menu.Options.filter(f => f.onSelect)
        menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]    
        if (menuItem.onSelect) {
            Action(menuItem.onSelect)(menuItem.text)
        }
    })
}

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 320, 200)

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
            imu.RemoveElements()
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