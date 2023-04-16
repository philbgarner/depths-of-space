import { roll } from './grammar.js'

var teams = []
var teamIndex = 0
var phases = ['positioning', 'movement', 'active', 'siege', 'upkeep']
var phase = 0

function addTeam(name, turnOrderRollDice) {
    let team = {
        name: name,
        color: '#ccccccff',
        order: roll(turnOrderRollDice)
    }
    teams.push(team)
    teams.sort((a, b) => b.order - a.order)
    return team
}

function getTeam(name) {
    let team = teams.filter(f => f.name === name)
    return team.length > 0 ? team[0] : null
}

function getTeams() {
    return teams
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

function nextTeam() {
    teamIndex++
    teamIndex = teamIndex >= teams.length ? 0 : teamIndex
}

export { addTeam, currentTeam, currentPhase, nextPhase, getTeam, nextTeam, getTeams }