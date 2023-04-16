import { gridDimensions } from "./map.js"
import { buildSprite } from "./sprites.js"
import { getContext } from "./images.js"

class Actor {
    constructor(params) {
        this.team = params.team
        this.name = params.name
        this.character = params.character
        this.placed = false
        this.sprite = buildSprite(params.spriteName, params.x ? params.x : 0, params.y ? params.y : 0, 'idle')
    }

    MapPosition() {
        return { x: parseInt(this.sprite.x / gridDimensions().x), y: parseInt(this.sprite.y / gridDimensions().y) }
    }

    Position() {
        return { x: this.sprite.x, y: this.sprite.y }
    }

    MapCoords() {
        return { x: parseInt(this.sprite.x / gridDimensions().x), y: parseInt(this.sprite.y / gridDimensions().y) }
    }

    Draw(delta) {
        this.sprite.draw(delta)
    }
}

export default Actor
