import { roll } from './grammar.js'

var teams = []
var teamIndex = 0
var phases = ['positioning', 'movement', 'active', 'siege', 'upkeep']
var phase = 0

function addTeam(name, turnOrderRollDice) {
    teams.push({
        name: name,
        color: '#ccccccff',
        order: roll(turnOrderRollDice)
    })
    teams.sort((a, b) => b.order - a.order)
}

function currentTeam() {
    return teams[teamIndex]
}

function currentPhase() {
    return phases[phase]
}

function nextPhase() {
    phase++
    phase = phase >= phases.length ? 0 : phase
}

export { addTeam, currentTeam, currentPhase, nextPhase }