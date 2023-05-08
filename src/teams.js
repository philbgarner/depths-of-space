import { roll } from './grammar.js'
import { getCamera, getUnits, gridDimensions } from './map.js'

var teams = []
var teamIndex = 0
var phases = ['positioning', 'movement', 'active', 'siege', 'upkeep']
var phase = 0

function addTeam(name, turnOrderRollDice) {
    let team = {
        name: name,
        color: '#ccccccff',
        order: roll(turnOrderRollDice),
        homePosition: { x: 24, y: 8.5 * gridDimensions().y }
    }
    if (teams.length % 2 === 1) {
        team.homePosition = { x: 600, y: 8.5 * gridDimensions().y }
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

function setPhases(phaselist) {
    phases = phaselist
}

function getPhases() {
    return phases
}

function nextPhase() {
    phase++
    phase = phase >= phases.length ? 1 : phase // 1 not 0 because we want to skip the positioning phase after the 1st time.
}

function nextTeam() {
    teamIndex++
    teamIndex = teamIndex >= teams.length ? 0 : teamIndex
}

export { addTeam, currentTeam, currentPhase, nextPhase, setPhases, getPhases, getTeam, nextTeam, getTeams }