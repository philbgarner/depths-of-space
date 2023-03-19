import input, { GetInputKeys, GetInputValue } from './input.js'
import { getContext, drawImage, getImage } from "./images.js"
import { Start } from './main.js'

let imu = null

let ctx = null

var menuItems = []
var menuSelect = ''
var selectedInput = 'gamepad'
var startingShards = 5
var rangedAmt = 0
var areaAmt = 0
var meleeAmt = 0

let menuDx = 0
let menuDy = 0

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 240, 160)

    drawUI()
}

function SetMenu(id) {
    if (id === 'Settings') {
        menuItems = [
            { text: 'Difficulty', value: 'Easy', action: (menuItem) => { menuItem.value = menuItem.value === 'Easy' ? 'Hard' : 'Easy' } },
            { text: 'Controls', value: '', action: (menuItem) => { SetMenu('Controls') } },
            { text: 'Back', value: '', action: (menuItem) => { SetMenu() } }
        ]
        menuSelect = 'Difficulty'
        menuDx = 70
        menuDy = 60
    } else if (id === 'Controls') {
        menuItems = [
            { text: 'Input Type', value: selectedInput.slice(0, 1).toUpperCase() + selectedInput.slice(1), action: (menuItem) => {
                selectedInput = menuItem.value.toLowerCase() === 'gamepad' ? 'Keyboard' : 'Gamepad'
                SetMenu(id)
                return
            }}
        ]
        let inputs = GetInputKeys(selectedInput)
        for (let i in inputs) {
            console.log(inputs[i], GetInputValue(selectedInput, inputs[i]))
            menuItems.push({
                text: inputs[i], value: GetInputValue(selectedInput, inputs[i]), action: (menuItem) => { console.log('listen for keypress') }
            })
        }
        menuItems.push({ text: 'Back', value: '', action: () => { SetMenu('Settings') }})
        menuSelect = 'Input Type'
        menuDx = 70
        menuDy = 20
    } else if (id === 'Character') {
        menuItems = [
            { text: `Soul Shards: ${startingShards}`, value: '', action: (menuItem) => {} },
            { text: '+1 Melee', value: meleeAmt.toString(), action: (menuItem) => {
                if (startingShards > 0) {
                    startingShards--
                    meleeAmt++
                    SetMenu('Character')
                }
            } },
            { text: '+1 Ranged', value: rangedAmt.toString(), action: (menuItem) => {
                if (startingShards > 0) {
                    startingShards--
                    rangedAmt++
                    SetMenu('Character')
                }
            } },
            { text: '+1 Area', value: areaAmt.toString(), action: (menuItem) => {
                if (startingShards > 0) {
                    startingShards--
                    areaAmt++
                    SetMenu('Character')
                }
            } },
            { text: 'Begin', value: '', action: () => Start(meleeAmt, rangedAmt, areaAmt)}
        ]
        if (menuItems.findIndex(f => f.text === menuSelect) < 0) {
            menuSelect = `+1 Melee`
        }
    } else {
        menuItems = [
            { text: 'Start', value: '', action: (menuItem) => { SetMenu('Character') } },
            { text: 'Settings', value: '', action: (menuItem) => { SetMenu('Settings')} },
            { text: 'Credits', value: '', action: (menuItem) => {} }
        ]
        menuSelect = 'Start'
        menuDx = 90
        menuDy = 40
    }
}

function moveMenu(y) {
    let index = menuItems.findIndex(f => f.text === menuSelect)
    index += y
    if (index > menuItems.length - 1) {
        index = 0
    } else if (index < 0) {
        index = menuItems.length - 1
    }
    menuSelect = menuItems[index].text
}

function SelectedMenuItem() {
    return menuItems.filter(f => f.text === menuSelect)[0]
}

function handleEvent() {
    
    input.listen()

    input.released('moveUp', (button) => {
        moveMenu(-1)
    })

    input.released('moveDown', (button) => {
        moveMenu(1)
    })

    input.released('attack', (button) => {
        SelectedMenuItem().action(SelectedMenuItem())
    })

}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font

        imu.onUpdate = (ui) => {
            //ui.Element({ id: 'imgGamename', type: 'Image', x: 10, y: 10, image: getImage('title') })

            let dy = menuDy + 30
            for (let i in menuItems) {
                let item = menuItems[i].text
                let value = ''
                if (menuItems[i].value.length > 0) {
                    value = menuItems[i].value
                }
                ui.Element({ id: 'lblMenu' + item, text: `${menuSelect === item ? '>' : ' '}${item}${menuSelect === item ? '<' : ' ' }${value.length > 0 ? `     ${value}` : ''}`, rect: { x: menuDx, y: dy, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
                dy += 12
            }
        }
    }
    imu.Draw()
    drawImage('title', 120 - 52, 10)
}

export { drawFrame, handleEvent, SetMenu }