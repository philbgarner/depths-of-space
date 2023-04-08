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
    let paramsGreyListImage = {
        scrollAreaImage: {
            image: getImage('ui-button-scroll-area'),
            hover: getImage('ui-button-scroll-area'),
            pressed: getImage('ui-button-scroll-area'),
            innerRect: { x: 3, y: 4, w: 5, h: 40 }
        },
        caratImage: {
            image: getImage('ui-button-carat'),
            hover: getImage('ui-button-carat-hover'),
            pressed: getImage('ui-button-carat-pressed'),
            innerRect: { x: 3, y: 4, w: 5, h: 40 }
        }
    }
    let paramsTealFrame = { innerRect: { x: 6, y: 8, w: 53 , h: 47 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-frame-teal'), imageDown: getImage('ui-frame-teal'), imageHover: getImage('ui-frame-teal') }
    let paramsTealButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#fa6a0aff', bgcolor: '#000000cc', image: getImage('ui-button-teal'), imageDown: getImage('ui-button-teal-down'), imageHover: getImage('ui-button-teal') }
    let paramsGreyButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-button-grey'), imageDown: getImage('ui-button-grey-down'), imageHover: getImage('ui-button-grey') }
    let paramsLabel = { type: 'Element', color: '#cacacaff', highlight: '#cacacaff', bgcolor: '#00000000' }
    let frameMenu = ui.Element({ id: 'frameMenuSquad', rect: {x: 5, y: 8, w: 72, h: 110 }, ...paramsTealFrame,
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
        let eqabMenu = ui.Element({ id: 'eqabMenu', rect: {x: 79, y: 8, w: 235, h: 110 }, ...paramsTealFrame,
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
            let el = ui.Element({ id: 'charList', type: 'ListImage', list: squad.map(m => m.name), rect: {x: 8, y: 9, w: 55, h: 90 }, ...paramsGreyListImage}, frameMenu)
            if (el.currentItem !== null && el.currentItem !== selIndex) {
                selCharacter(el.currentItem)
            }

            if (selIndex > -1) {
                ui.Element({ id: 'charEquip', text: 'Equipment:', rect: { x: 8, y: 8, w: 64, h: 9 }}, eqabMenu)
                ui.Element({ id: 'charEquipList', type: 'ListImage', list: equip.map(m => m.name), rect: {x: 8, y: 19, w: 128, h: 80 }, ...paramsGreyListImage}, eqabMenu)
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
        let toButtons = buttonsMenu.Rect()
        toButtons.y = 200
        buttonsMenu.Animate(200, { ...buttonsMenu.Rect() }, toButtons, onComplete)
    }
}

export { onUpdate }
