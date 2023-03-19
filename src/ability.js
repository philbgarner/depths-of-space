import abilities from './abilities.json'

class Ability {
    constructor(name) {
        // data property holds base ability data from json
        try {
            this.data = abilities.filter(f.name === name)[0]
        } catch {
            this.data = {}
            console.error(`Could not locate template for ${name}.`)
        }
    }
}

export { Ability }