import { getImage } from '../images.js'
import characters from '../characters.json'
import menus from './menus.json'
import { Character } from '../character.js'
import { ChangeMenu } from '../menuScene.js'
import { squad } from './gameSetup.js'
import equipment from '../equipment.json'
import { Start } from '../main.js'
import { buildMap } from '../map.js'

let selIndex = -1
let equip = []
let character = null

function selCharacter(index) {
    if (index < 0 || index > squad.length - 1) {
        return
    }
    selIndex = index
    character = squad[selIndex]
    equip = getEquipment(squad[selIndex].name)
}

function getEquipment(characterType) {
    return equipment.filter(f => f.characters.filter(c => c === characterType).length)
}

function onUpdate(ui) {
    let paramsGreyListImage = {
        bgcolor: '#122020ff',
        color: '#cacacaff',
        bgcolorSelected: '#122020ff',
        colorSelected: '#f1f1f1ff',
        highlight: '#f1f1f1ff',
        scrollbarWidth: 9,
        scrollAreaImage: {
            image: getImage('ui-button-scroll-area'),
            hover: getImage('ui-button-scroll-area'),
            pressed: getImage('ui-button-scroll-area'),
            innerRect: { x: 3, y: 4, w: 7, h: 40 }
        },
        caratImage: {
            image: getImage('ui-button-carat'),
            hover: getImage('ui-button-carat-hover'),
            pressed: getImage('ui-button-carat-pressed')
        },
        upImage: {
            image: getImage('ui-button-scroll-up'),
            hover: getImage('ui-button-scroll-up-hover'),
            pressed: getImage('ui-button-scroll-up-pressed')
        },
        downImage: {
            image: getImage('ui-button-scroll-down'),
            hover: getImage('ui-button-scroll-down-hover'),
            pressed: getImage('ui-button-scroll-down-pressed')
        }
    }

    let paramsGreyListImageMulti = { ...paramsGreyListImage, multiSelect: true,
        checkboxImage: {
            image: getImage('ui-checkbox'),
            hover: getImage('ui-checkbox-hover'),
            pressed: getImage('ui-checkbox-pressed')
        }
    }
    paramsGreyListImage.bgcolorSelected = '#5daf8dff'
    paramsGreyListImage.colorSelected = '#122020ff'

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
            let listEquip = null
            let el = ui.Element({ id: 'charList', type: 'ListImage', list: squad.map(m => m.name), rect: {x: 8, y: 9, w: 55, h: 90 }, ...paramsGreyListImage}, frameMenu)
            if (el.Clicked()) {
                selCharacter(el.currentItem)
                ui.RemoveElement('charEquipList')
                listEquip = ui.Element({ id: 'charEquipList', type: 'ListImage', list: equip.map(m => m.name), rect: {x: 8, y: 19, w: 128, h: 80 }, ...paramsGreyListImageMulti}, eqabMenu)
                listEquip.selectedList = character.equipment.map(m => equip.map(eq => eq.name).includes(m.name) ? equip.map(eq => eq.name).findIndex(f => f === m.name) : undefined).filter(f => f !== undefined)
                console.log('charEquipList remove', character.equipment, equip, listEquip.selectedList)
            }
            if (selIndex > -1) {
                ui.Element({ id: 'charEquip', text: 'Equipment:', rect: { x: 8, y: 8, w: 64, h: 9 }}, eqabMenu)
                listEquip = ui.Element({ id: 'charEquipList', type: 'ListImage', list: equip.map(m => m.name), rect: {x: 8, y: 19, w: 128, h: 80 }, ...paramsGreyListImageMulti}, eqabMenu)
                let selList = listEquip.selectedList.map(m => equip[m])
                character.SetEquipment([...selList])
                let eq = equip[listEquip.hoverItem]
                if (eq) {
                    let classDescription = []
                    if (eq.speed) {
                        classDescription.push(`Speed ${eq.speed}`)
                    }
                    if (eq.range > 0) {
                        classDescription.push(`Gunnery ${eq.damage}`)
                        classDescription.push(`Range ${eq.range}`)
                    } else {
                        classDescription.push(`Melee ${eq.damage}`)
                    }
                    classDescription.push(`Cost ${eq.cost}`)
                    ui.Element({ id: 'charEquipDescription', text: classDescription.join('\n'), rect: { x: 140, y: 18, w: 64, h: 9 }}, eqabMenu)              
                }
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
                    transitionOut(frameMenu, eqabMenu, buttonsMenu, () => {
                        ChangeMenu('end')
                        equip = []
                        Start(squad, buildMap())
                    })
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
