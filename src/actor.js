import { gridSize } from "./map.js"
import { buildSprite } from "./sprites.js"
import { getContext } from "./images.js"

class Actor {
    constructor(params) {
        this.team = params.team
        this.name = params.name
        this.character = params.character
        this.sprite = buildSprite(params.spriteName, params.x ? params.x : 0, params.y ? params.y : 0, 'idle')
    }

    Position() {
        return { x: this.sprite.x, y: this.sprite.y }
    }

    MapCoords() {
        return { x: parseInt(this.sprite.x / gridSize().x), y: parseInt(this.sprite.y / gridSize().y) }
    }

    Draw(delta) {
        this.sprite.draw(delta)
    }
}

export default Actor
