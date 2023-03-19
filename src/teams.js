var teams = []
var currentTeam = 0
var phases = ['positioning', 'movement', 'active', 'siege', 'upkeep']
var phase = 0

function addTeam(name) {
    teams.push({
        name: name,
        color: '#ccccccff'
    })
}

function currentTeam() {
    return teams[currentTeam]
}

function currentPhase() {
    return phases[phase]
}

function nextPhase() {
    phase++
    phase = phase >= phases.length ? 0 : phase
}

export { addTeam, currentTeam, currentPhase, nextPhase }