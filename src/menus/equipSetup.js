import { getImage } from '../images.js'
import characters from '../characters.json'
import menus from './menus.json'
import { Character } from '../character.js'
import { ChangeMenu } from '../menuScene.js'
import { squad } from './gameSetup.js'

let selIndex = -1

function onUpdate(ui) {
    let paramsTealFrame = { innerRect: { x: 6, y: 8, w: 53 , h: 47 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-frame-teal'), imageDown: getImage('ui-frame-teal'), imageHover: getImage('ui-frame-teal') }
    let paramsTealButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#fa6a0aff', bgcolor: '#000000cc', image: getImage('ui-button-teal'), imageDown: getImage('ui-button-teal-down'), imageHover: getImage('ui-button-teal') }
    let paramsGreyButton = { innerRect: { x: 5, y: 4, w: 9, h: 2 }, type: 'ButtonImage', color: '#122020ff', highlight: '#122020ff', bgcolor: '#000000cc', image: getImage('ui-button-grey'), imageDown: getImage('ui-button-grey-down'), imageHover: getImage('ui-button-grey') }
    let paramsLabel = { type: 'Element', color: '#cacacaff', highlight: '#cacacaff', bgcolor: '#00000000' }
    let frameMenu = ui.Element({ id: 'frameMenu', rect: {x: 5, y: 28, w: 128, h: 160 }, ...paramsTealFrame })

    let eqabRect = { ...frameMenu.rect }
    eqabRect.x += eqabRect.w + 2
    console.log(eqabRect)
    let eqabMenu = ui.Element({ id: 'eqabMenu', rect: eqabRect, ...paramsTealFrame })

    let dy = 9
    for (let s in squad) {
        let style = { ...paramsLabel }
        style.bgcolor = selIndex === s ? '#328464ff' : '#00000000'
        style.color = selIndex === s ? '#f1f1f1ff' : '#cacacaff'
        style.highlight = style.color
        let el = ui.Element({ id: 'lblCharacter' + s, text: squad[s].name, rect: {x: 8, y: dy + 2, w: 76, h: 9}, ...style }, frameMenu)

        if (el.Clicked()) {
            selIndex = s
        }
        dy += 10
    }

}

export { onUpdate }
