import { Pipeline } from './pipeline.js'

import characters from "./characters.json"

class Character {
    constructor(name) {
        // data property holds base class data from json
        try {
            this.data = characters.filter(f => f.name === name)[0]
            this.data.maxHp = this.data.hp
            this.name = this.data.name
            this.equipment = []
        } catch {
            this.data = {}
            console.error(`Could not locate template for ${name}.`)
        }

        // effectModifiers property holds active effect modifiers.
        this.effectModifiers = {}

        // Active effect modifiers, evaluated each phase and removed when
        // expired.
        this.effects = []
    }

    /**
     * Iterate over the effects currently active on this character and
     * do housekeeping (decrement ttl, removing ttl = 0, etc.)
     */
    UpdateEffects() {
        for (let e in this.effects) {
            let effect = this.effects[e]
            if (effect.ttl) {
                effect.ttl--
            }
            if (effect.ttl <= 0) {
                this.RemoveEffectModifier(effect)
            }
        }
        this.effects = this.effects.filter(f => f.ttl > 0)
    }

    AddEffect(effect) {
        if (effect.ttl) {
            this.effects.push(effect)
        }
        if (effect.attribute !== undefined) {
            this.AddEffectModifier(effect.attribute, effect.amount)
        }
    }
    RemoveEffectModifier(effect) {
        if (effect.attribute !== undefined) {
            this.AddEffect(effect.attribute, effect.amount * -1)
        }
    }

    AddEffectModifier(attribute, amount) {
        if (this.effectModifiers[attribute] === undefined) {
            this.effectModifiers[attribute] = 0
        }
        this.effectModifiers[attribute] += amount
    }

    EffectModifier(attribute) {
        if (this.effectModifiers[attribute] !== undefined) {
            return this.effectModifiers[attribute]
        }
        return 0
    }

    Name() {
        return this.data.name
    }

    Cost() {
        return this.data.Cost + this.EffectModifier('cost')
    }

    EquipmentAndAbilities() {
        return this.data.equipAbilities + this.EffectModifier('equipAbilities')
    }

    GunnerySkill() {
        return this.data.gunnerySkill + this.EffectModifier('gunnerySkill')
    }

    MeleeSkill() {
        return this.data.meleeSkill + this.EffectModifier('meleeSkill')
    }

    Speed() {
        return this.data.speed + this.EffectModifier('speed')
    }

    Hp() {
        return this.data.hp + this.EffectModifier('hp')
    }

    MaxHp() {
        return this.data.maxHp + this.EffectModifier('maxHp')
    }
}

 export { Character }