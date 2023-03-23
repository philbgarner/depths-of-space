import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import { Start, pointer } from './main.js'
import { Character } from './character.js'
import { buildSprite } from './sprites.js'

import menus from './menus.json'
import equipment from './equipment.json'

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
        currentCharacterEquip = text
        console.log('character equip', text)
    },

    callback_SetupEquipment: (text) => {
        console.log('setup equp', squad)
        ChangeMenu('SetupEquipment')
        let menu = menus.filter(f => f.id === 'SetupEquipment')[0]
        let nextIndex = menu.Options.findIndex(f => f.text === 'Next')
        menu.Options = [
            ...squad.map((m, i) => {
            return {
                text: `${i + 1}. ${m.name}`,
                onSelect: 'callback_SelectCharacterEquip',
                width: 160,
                column: 0
            }}),
            menu.Options[nextIndex]
        ]
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
    currentMenuColumn = 0
    currentMenuId = id
    let menuItems = GetMenuItems(id)
    input.listen()
    menuItem = menuItems.filter(f => f.text === currentMenuItem)[0]
}

function GetMenuItems(menuId) {
    let menu = GetMenu(menuId)
    let items = menu.Options.filter(f => f.onSelect && (f.column === undefined || f.column === currentMenuColumn))
    if (items.length > 0 && currentMenuItem === '') {
        currentMenuItem = items[0].text
    }
    return items
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
        
        imu.onUpdate = (ui) => {
            //ui.Element({ id: 'imgGamename', type: 'Image', x: 10, y: 10, image: getImage('title') })
            let menu = GetMenu(currentMenuId)
            let menuItems = menu.Options.sort((a, b) => b.column !== undefined ? b.column : 0 - a.column !== undefined ? a.column : 0)
            //imu.RemoveElements()
            let dy = menuDy + 30
            for (let i in menuItems) {
                let item = menuItems[i].text
                let menuItem = menuItems[i]
                let colr = item === currentMenuItem ? menu.Style.SelectColor : menuItem.onSelect ? menu.Style.SelectableColor : menu.Style.Color
                let txt = `${currentMenuItem === item ? '>' : ' '}${item}${currentMenuItem === item ? '<' : ' ' }`
                if (txt.includes('{') && txt.includes('}') && menuItem.onRender) {
                    txt = OnRender(txt, menuItem.onRender)
                }
                let el = ui.Element({ id: 'lblMenu' + currentMenuId + item + i, text: txt, rect: { x: menuDx, y: dy, w: 64, h: 8 }, color: colr, highlight: colr, bgcolor: '#cccccc00' })

                if (el.Hover()) {
                    if (menuItem.onSelect) {
                        currentMenuItem = item
                    }
                }
                if (el.Clicked()) {
                    if (menuItem.onSelect) {
                        currentMenuItem = txt
                        Action(menuItem.onSelect)(menuItem.text)
                    }
                }
                dy += 12
            }
            if (currentMenuId === 'SetupEquipment') {
                let elEquip = ui.Element({ id: 'lblEquipMenu', text: 'Squad Equipment', rect: { x: menuDx, y: menuDy + 15, w: 128, h: 8 }, color: menu.Style.Color, highlight: menu.Style.Color, bgcolor: '#cccccc00' })
            }
            if (currentCharacterEquip && currentMenuId === 'SetupEquipment') {
                let tooltip = ''

                dy = menuDy + 42
                let colDx = 80
                let charName = currentCharacterEquip.split('.')[1].trim()
                let charIndex = parseInt(currentCharacterEquip.split('.')) - 1
                let equiplist = equipment.filter(f => f.characters.includes(charName))
                for (let e in equiplist) {
                    let equip = equiplist[e]
                    let equipped = squad[charIndex].equipment.filter(f => equip.name === f.name)
                    let colr = menu.Style.SelectableColor
                    if (equipped.length > 0) {
                        colr = menu.Style.Disabled
                    }

                    let el = ui.Element({ id: 'lblEquip' + currentMenuId + equip.name + e, text: equip.name, rect: { x: colDx, y: dy, w: 128, h: 8 }, color: colr, highlight: colr, bgcolor: '#cccccc00' })
                    
                    if (el.Hover()) {
                        let attr = [`Attacks: ${equip.attacks}`, `Damage: ${equip.damage}`, `Range: ${equip.range}`, `Cost: ${equip.cost}`]
                        if (equip.reload) {
                            attr.push('Requires Reload')
                        }
                        tooltip = attr.join('\n')
                    }
                    if (el.Clicked()) {
                        if (equipped.length > 0) {
                            squad[charIndex].equipment = squad[charIndex].equipment.filter(f => f.name !== equip.name)
                        } else {
                            squad[charIndex].equipment.push(equip)
                        }
                    }
                        
                    dy += 12
                    if (dy > 180) {
                        dy = menuDy + 42
                        colDx += 90
                    }
                }

                if (tooltip) {
                    let tip = ui.Element({ id: 'lblTooltip', text: tooltip, x: pointer.x, y: pointer.y + 8, color: menu.Style.SelectableColor, highlight: menu.Style.SelectColor, bgcolor: '#000000dd' })
                }
            }
        }
    }
    imu.Draw()
}

export { drawFrame, StartMenu }