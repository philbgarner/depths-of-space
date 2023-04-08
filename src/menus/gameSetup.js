import { getImage } from '../images.js'
import characters from '../characters.json'
import menus from './menus.json'
import { Character } from '../character.js'
import { ChangeMenu } from '../menuScene.js'

var squad = []
var stars = 16

let menu = menus.filter(f => f.id === 'GameSetup')[0]

function hireCharacter(name) {
    let char = new Character(name)
    if (stars - char.Cost() >= 0) {
        squad.push(char)
        stars -= char.Cost()
    }
}

function fireCharacter(name) {
    let char = new Character(name)
    let charIndex = squad.findIndex(f => f.name === name)
    if (charIndex > -1) {
        stars += char.Cost()
        squad = squad.filter((f, i) => i !== charIndex)
    }
}

function onUpdate(ui) {
    let paramsTealFrame = { innerRect: { x: 6, y: 8, w: 53 , h: 47 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-frame-teal'), imageDown: getImage('ui-frame-teal'), imageHover: getImage('ui-frame-teal') }
    let paramsTealButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#fa6a0aff', bgcolor: '#000000cc', image: getImage('ui-button-teal'), imageDown: getImage('ui-button-teal-down'), imageHover: getImage('ui-button-teal') }
    let paramsGreyButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-button-grey'), imageDown: getImage('ui-button-grey-down'), imageHover: getImage('ui-button-grey') }
    let paramsLabel = { type: 'Element', color: '#cacacaff', highlight: '#cacacaff', bgcolor: '#00000000' }
    let frameMenu = ui.Element({ id: 'frameMenu', rect: {x: 5, y: 28, w: 128, h: 160 }, ...paramsTealFrame,
        anim: {
            curve: 'bezier',
            duration: 100,
            params: {
                y: -128
            },
            onComplete: (el) => { el }
        }
    })

    let statsMenu = ui.Element({ id: 'frameStats', rect: {x: 135, y: 28, w: 128, h: 110 }, ...paramsTealFrame,
        anim: {
            curve: 'bezier',
            duration: 100,
            params: {
                x: 260
            },
            onComplete: (el) => { el }
        }
    })

    let buttonsMenu = ui.Element({ id: 'frameButtons', rect: {x: 135, y: 156, w: 128, h: 32 }, ...paramsTealFrame,
        anim: {
            curve: 'bezier',
            duration: 100,
            params: {
                y: 190
            },
            onComplete: (el) => { el }
        }
    })

    let classDescription = squad.length === 0 ? 'Hire your squad and click next\nto continue.' : `Squad Size: ${squad.length}` + (stars === 0 ? `\nNo stars remaining.\nClick 'Next'.` : '')
    if (!frameMenu.anim) {
        let lblStars = ui.Element({ id: 'lblMenuStars', text: `${stars}`, rect: { x: 98, y: 10, w: 64, h: 11 }, ...paramsLabel}, frameMenu)
        ui.Element({ id: 'imgStars', type: 'Image', x: 108, y: 8, image: getImage('star-icon') }, frameMenu)
        let dy = 19
        for (let o in menu.Options) {
            let option = menu.Options[o].text
            let name = option.split(' ')[0]
            let character = characters.filter(f => f.name === name)[0]
            option = option.replace('{0}', squad.filter(f => f.name === name).length)
            let el = ui.Element({ id: 'lblMenu' + o, text: option, rect: {x: 16, y: dy + 2, w: 76, h: 14}, ...paramsLabel }, frameMenu)
            let elAdd = ui.Element({ id: 'lblMenuAdd' + o, text: '+', rect: {x: 94, y: dy, w: 14, h: 14}, ...paramsGreyButton }, frameMenu)
            if (elAdd.Clicked()) {
                hireCharacter(name)
            }
            let elRemove = ui.Element({ id: 'lblMenuRem' + o, text: '-', rect: {x: 109, y: dy, w: 14, h: 14}, ...paramsGreyButton }, frameMenu)
            if (elRemove.Clicked()) {
                fireCharacter(name)
            }

            if (el.Hover() || elAdd.Hover() || elRemove.Hover()) {
                classDescription = [
                    `${name}`, `Cost: ${character.Cost}`, `Melee Skill: ${character.meleeSkill}`, `Gunnery Skill: ${character.gunnerySkill}`, `Speed: ${character.speed}`
                    , `HP: ${character.speed}`, `Equipment/Abilities`, `Points: ${character.equipAbilities}`
                ].join('\n')
            }

            dy += 15
        }
    }

    if (!buttonsMenu.anim) {
        let btnNext = ui.Element({ id: 'btnNext', text: 'Next', rect: { x: 72, y: 8, w: 50, h: 16 }, ...paramsTealButton }, buttonsMenu)
        if (btnNext.Hover()) {
            classDescription = 'Accept squad and move\non to outfitting equipment\nand abilities.'
        }
        if (btnNext.Clicked()) {
            transitionOut(frameMenu, statsMenu, buttonsMenu)
        }
    }

    if (!statsMenu.anim) {
        if (classDescription.length) {
            let lblTooltip = ui.Element({ id: 'lblTooltip', text: classDescription, rect: { x: 8, y: 8, w: 110, h: 100 }, ...paramsLabel}, statsMenu)
        }
    }

    function transitionOut(frameMenu, statsMenu, buttonsMenu) {
            let toFrame = { ...frameMenu.Rect() }
            toFrame.x = -130
            frameMenu.Animate(190, { ...frameMenu.Rect() }, toFrame)
            let toStats = { ...statsMenu.Rect() }
            toStats.x = 320
            statsMenu.Animate(190, { ...statsMenu.Rect() }, toStats)
            let toButtons = buttonsMenu.Rect()
            toButtons.y = 200
            buttonsMenu.Animate(200, { ...buttonsMenu.Rect() }, toButtons, () => ChangeMenu('SetupEquipment'))
    }
}

export { onUpdate, squad }
