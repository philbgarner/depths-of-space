import { getImage } from '../images.js'
import characters from '../characters.json'
import menus from './menus.json'
import { Character } from '../character.js'
import { ChangeMenu } from '../menuScene.js'
import { squad } from './gameSetup.js'
import equipment from '../equipment.json'
import { Start } from '../main.js'

let selIndex = -1
let equip = []

function selCharacter(index) {
    if (index < 0 || index > squad.length - 1) {
        return
    }
    selIndex = index
    equip = getEquipment(squad[selIndex].name)
}

function getEquipment(characterType) {
    return equipment.filter(f => f.characters.filter(c => c === characterType).length)
}

function onUpdate(ui) {
    let paramsTealFrame = { innerRect: { x: 6, y: 8, w: 53 , h: 47 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-frame-teal'), imageDown: getImage('ui-frame-teal'), imageHover: getImage('ui-frame-teal') }
    let paramsTealButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#fa6a0aff', bgcolor: '#000000cc', image: getImage('ui-button-teal'), imageDown: getImage('ui-button-teal-down'), imageHover: getImage('ui-button-teal') }
    let paramsGreyButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-button-grey'), imageDown: getImage('ui-button-grey-down'), imageHover: getImage('ui-button-grey') }
    let paramsLabel = { type: 'Element', color: '#cacacaff', highlight: '#cacacaff', bgcolor: '#00000000' }
    let frameMenu = ui.Element({ id: 'frameMenuSquad', rect: {x: 5, y: 8, w: 72, h: 160 }, ...paramsTealFrame,
        anim: {
            curve: 'bezier',
            duration: 100,
            params: {
                x: -100
            },
            onComplete: (el) => { el }
        }
    })
    
    if (!frameMenu.anim) {
        let dy = 9
        let eqabMenu = ui.Element({ id: 'eqabMenu', rect: {x: 79, y: 8, w: 235, h: 160 }, ...paramsTealFrame,
            anim: {
                curve: 'bezier',
                duration: 100,
                params: {
                    y: -140
                },
                onComplete: (el) => { el }
            }
        })
        if (!eqabMenu.anim) {
            // for (let s in squad) {
            //     let style = { ...paramsLabel }
            //     style.bgcolor = selIndex === s ? '#328464ff' : '#00000000'
            //     style.color = selIndex === s ? '#f1f1f1ff' : '#cacacaff'
            //     style.highlight = style.color
                //let el = ui.Element({ id: 'lblCharacter' + s, text: squad[s].name, rect: {x: 8, y: dy + 2, w: 55, h: 9}, ...style }, frameMenu)
            let el = ui.Element({ id: 'charList', type: 'ListImage', list: squad.map(m => m.name), rect: {x: 8, y: 9, w: 55, h: 140 }}, frameMenu)
            if (el.currentItem !== null && el.currentItem !== selIndex) {
                selCharacter(el.currentItem)
            }
            //     dy += 10
            // }

            if (selIndex > -1) {
                ui.Element({ id: 'charEquip', text: 'Equipment:', rect: { x: 8, y: 8, w: 64, h: 9 }}, eqabMenu)
                // for (let e in equip) {
                //     let eq = equip[e]
                //     ui.Element({ id: 'charEquip' + e, text: eq.name, rect: { x: dx, y: dy, w: 96, h: 9 }, ...paramsLabel}, eqabMenu)
                //     dy += 10
                //     if (dy > 145) {
                //         dy = 19
                //         dx += 96
                //     }
                // }
                ui.Element({ id: 'charEquipList', type: 'ListImage', list: equip.map(m => m.name), rect: {x: 8, y: 19, w: 128, h: 128 }}, eqabMenu)
            }

            let buttonsMenu = ui.Element({ id: 'frameButtons', rect: {x: 165, y: 160, w: 128, h: 32 }, ...paramsTealFrame,
                anim: {
                    curve: 'bezier',
                    duration: 100,
                    params: {
                        y: 190
                    },
                    onComplete: (el) => { el }
                }
            })
            if (!buttonsMenu.anim) {
                let btnNext = ui.Element({ id: 'btnNext', text: 'Next', rect: { x: 72, y: 8, w: 50, h: 16 }, ...paramsTealButton }, buttonsMenu)
                if (btnNext.Clicked()) {
                    equip = []
                    transitionOut(frameMenu, eqabMenu, buttonsMenu, () => Start(squad))
                }
                let btnPrev = ui.Element({ id: 'btnPrev', text: 'Back', rect: { x: 8, y: 8, w: 50, h: 16 }, ...paramsGreyButton }, buttonsMenu)
                if (btnPrev.Clicked()) {
                    equip = []
                    transitionOut(frameMenu, eqabMenu, buttonsMenu, () => ChangeMenu('GameSetup'))
                }
            }
        }
    }

    function transitionOut(frameMenu, eqabMenu, buttonsMenu, onComplete) {
        // let toFrame = { ...frameMenu.Rect() }
        // toFrame.x = -130
        // frameMenu.Animate(190, { ...frameMenu.Rect() }, toFrame)
        // let toStats = { ...statsMenu.Rect() }
        // toStats.x = 320
        // statsMenu.Animate(190, { ...statsMenu.Rect() }, toStats)
        let toButtons = buttonsMenu.Rect()
        toButtons.y = 200
        buttonsMenu.Animate(200, { ...buttonsMenu.Rect() }, toButtons, onComplete)
    }
}

export { onUpdate }
