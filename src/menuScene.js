import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import { Start, pointer } from './main.js'
import { Character } from './character.js'
import { buildSprite } from './sprites.js'

//import menus from './menus.json'
import equipment from './equipment.json'
import { buildMap } from './map.js'
import { addTeam } from './teams.js'

import { onUpdate as onGameSetupUpdate } from './menus/gameSetup.js'
import { onUpdate as onEquipSetupUpdate } from './menus/equipSetup.js'

let imu = null

let ctx = null

var stars = 16

var squad = []

var background = buildSprite('background', 0, 0, 'idle')

var menu = null
var menuItems = []
var menuItem = {}
var currentMenuId = 'Main'
var currentMenuItem = 'Start'
var currentMenuColumn = 0

var currentCharacterEquip = null

// var menuMethods = {
//     callback_OnRenderStars: (text, replacements) => {
//         return [stars.toString()]
//     },
//     callback_OnRenderHireSquad: (text, replacements) => {
//         return [squad.length]
//     },

//     callback_OnRenderCharacter: (text, replacements) => {
//         let name = text.split(' ')[0].replace('>', '')
//         return [(squad.filter(f => f.name === name).length)]
//     },

//     callback_HireCharacter: (text) => {
//         let name = text.split(' ')[0].replace('>', '')
//         let char = new Character(name)
//         if (stars - char.Cost() >= 0) {
//             squad.push(char)
//             stars -= char.Cost()
//         }
//     },

//     callback_StartGame: () => {
//         buildMap()
//         Start(squad)
//     },

//     callback_SelectCharacterEquip: (text) => {
//         currentCharacterEquip = text
//     },

//     callback_SetupEquipment: (text) => {
//         ChangeMenu('SetupEquipment')
//         let menu = menus.filter(f => f.id === 'SetupEquipment')[0]
//         let nextIndex = menu.Options.findIndex(f => f.text === 'Next')
//         menu.Options = [
//             ...squad.map((m, i) => {
//             return {
//                 text: `${i + 1}. ${m.name}`,
//                 onSelect: 'callback_SelectCharacterEquip',
//                 width: 160,
//                 column: 0
//             }}),
//             menu.Options[nextIndex]
//         ]
//     }
// }

let menuDx = 39
let menuDy = 42

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
    currentMenuColumn = 0
    currentMenuId = id
    imu.RemoveElements()

    if (id === 'GameSetup') {
        imu.onUpdate = onGameSetupUpdate
    } if (id === 'SetupEquipment') {
        imu.onUpdate = onEquipSetupUpdate
    }
}

// function GetMenuItems(menuId) {
//     let menu = GetMenu(menuId)
//     let items = menu.Options.filter(f => f.onSelect && (f.column === undefined || f.column === currentMenuColumn))
//     if (items.length > 0 && currentMenuItem === '') {
//         currentMenuItem = items[0].text
//     }
//     return items
// }

// function GetMenu(id) {
//     try {
//         return menus.filter(f => f.id === id)[0]
//     } catch { return null }
// }

function StartMenu(id) {
    input.listen()

    input.released('moveDown', () => {
        menu = GetMenu(currentMenuId)
        menuItems = GetMenuItems(currentMenuId) //menu.Options.filter(f => f.onSelect)
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
        menuItems = GetMenuItems(currentMenuId)//menu.Options.filter(f => f.onSelect)
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
        menuItems = GetMenuItems(currentMenuId) //menu.Options.filter(f => f.onSelect)
        try {
            menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]    
            if (menuItem.onSelect) {
                Action(menuItem.onSelect)(menuItem.text)
            }
        } catch {}
    })
}

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    background.draw(0, 0)
    background.update(delta)
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

        let paramsTealFrame = { innerRect: { x: 6, y: 8, w: 53 , h: 47 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-frame-teal'), imageDown: getImage('ui-frame-teal'), imageHover: getImage('ui-frame-teal') }
        let paramsTealButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#fa6a0aff', bgcolor: '#000000cc', image: getImage('ui-button-teal'), imageDown: getImage('ui-button-teal-down'), imageHover: getImage('ui-button-teal') }

        imu.onUpdate = (ui) => {
            let frameMenu = ui.Element({ id: 'frameMenu', rect: {x: 38, y: 28, w: 97, h: 96}, ...paramsTealFrame })

            let el = ui.Element({ id: 'lblMenu', text: 'Start', rect: {x: 6, y: 10, w: 86, h: 19}, ...paramsTealButton }, frameMenu)
            if (el.Clicked()) {
                ChangeMenu('GameSetup')
            }
        }
    }
    imu.Draw()
}

export { drawFrame, StartMenu, ChangeMenu }