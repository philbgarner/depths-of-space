import { getContext } from "./images.js"

let imu = null

let ctx = null

var selectedAttack = 0
var tooltip = ''

function getSelectedAttack() {
    return selectedAttack
}

function incrementSelectedAttack(amt) {
    selectedAttack += (amt !== undefined ? amt : 1)
    if (selectedAttack > 2) {
        selectedAttack = 0
    } else if (selectedAttack < 0) {
        selectedAttack = 2
    }
    Player().selectedWeapon = selectedAttack
    return selectedAttack
}

function drawFrame(delta) {
    if (!ctx) {
        ctx = getContext()
    }
    ctx.clearRect(0, 0, 240, 160)

    ctx.save()
    ctx.translate(120 - Player().x * TileSizes().x, 80 - Player().y * TileSizes().y)
    DrawFOV(Player())
    Player().draw()
    let spriteObjs = getSpriteObjects()
    for (let index in spriteObjs) {
        spriteObjs[index].update(16)
        spriteObjs[index].draw()
    }

    ctx.restore()

    drawUI()
}

function drawUI(delta) {
    if (!imu) {
        imu = new imui.ImUI(ctx.canvas)
        imu.font = font

        imu.onUpdate = (ui) => {
            if (getTargets().length > 0) {
                let targetPct = getSelectedTarget().hp / getSelectedTarget().maxhp
                let targetHealth = 'It is in perfect health.' + getSelectedTarget().state
                if (targetPct < 0.05) {
                    targetHealth = 'It is near death.'
                } else if (targetPct < 0.3) {
                    targetHealth = 'It is gravely injured.'
                } else if (targetPct < 0.6) {
                    targetHealth = 'It is hurt.'
                } else if (targetPct < 0.85) {
                    targetHealth = 'It is bruised.'
                } else if (targetPct < 1) {
                    targetHealth = 'It is scratched.'
                }
                switch(selectedAttack) {
                    case 0:
                        tooltip = `Melee attack against ${getSelectedTarget().name}.\n${targetHealth}`
                        break
                    case 1:
                        tooltip = `Ranged attack against ${getSelectedTarget().name}.\n${targetHealth}`
                        break
                    case 2:
                        tooltip = `Area attack against ${getSelectedTarget().name}.\n${targetHealth}`
                        break;    
                }    
            } else {
                let calcDmg = CalculateDamage(Player(), selectedAttack)
                switch(selectedAttack) {
                    case 0:
                        tooltip = `Melee attack (${Player().slots[0]}/16 shards)\nMin/Avg/Max: ${calcDmg.min.toFixed(2)}/${calcDmg.avg.toFixed(2)}/${calcDmg.max.toFixed(2)}`
                        break
                    case 1:
                        tooltip = `Ranged attack (${Player().slots[1]}/16 shards)\nMin/Avg/Max: ${calcDmg.min.toFixed(2)}/${calcDmg.avg.toFixed(2)}/${calcDmg.max.toFixed(2)}`
                        break
                    case 2:
                        tooltip = `Area attack (${Player().slots[2]}/16 shards)\nMin/Avg/Max: ${calcDmg.min.toFixed(2)}/${calcDmg.avg.toFixed(2)}/${calcDmg.max.toFixed(2)}`
                        break;    
                }    
            }

            ui.RemoveElement('tooltip')
            ui.Element({ id: 'lblGamename', text: `Grimoire`, rect: { x: 2, y: 0, w: 64, h: 8 }, color: '#c10000ff', highlight: '#c10000ff', bgcolor: '#cccccc00', font: nightmare })

            ui.Element({ id: 'lblScore', text: `Score: ${Player().score}`, rect: { x: 108, y: 5, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
            ui.Element({ id: 'lblXp', text: `XP: ${Player().xp}`, rect: { x: 172, y: 5, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })

            ui.Element({ id: 'lblHp', text: `HP: ${Player().hp}/${Player().maxhp}`, rect: { x: 108, y: 15, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })

            ui.Element({ id: 'lblMelee', text: `${selectedAttack === 0 ? '>': ' '} Melee ${parseInt(Player().slots[0] / 16 * 100)}%`, rect: { x: 0, y: 136, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
            ui.Element({ id: 'lblRanged', text: `${selectedAttack === 1 ? '>' : ' '} Ranged ${parseInt(Player().slots[1] / 16 * 100)}%`, rect: { x: 0, y: 144, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
            ui.Element({ id: 'lblArea', text: `${selectedAttack === 2 ? '>' : ' '} Area ${parseInt(Player().slots[2] / 16 * 100)}%`, rect: { x: 0, y: 152, w: 64, h: 8 }, color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })

            if (tooltip.length > 0) {
                ui.Element({ id: 'tooltip', text: tooltip + `\n${Player().x}, ${Player().y}`, rect: { x: 66, y: 136, w: 194, h: 24 }, wrap: 'word', color: '#f1f1f1ff', highlight: '#f1f1f1ff', bgcolor: '#cccccc00' })
            }
        }
    }
    imu.Draw()
}

export { drawFrame, getSelectedAttack, incrementSelectedAttack }