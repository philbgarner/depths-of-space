var sfxs = [
    // { name: 'human_walk_stone1', sfx: null, filename: './sfx/16_human_walk_stone_1.wav' },
]
var sfxVolume = 0.45

function isPlaying(name) {
    let sf = getSfx(name)
    if (sf) {
        return !sf.paused || sf.currentTime && sf.currentTime < sf.duration
    }
    return false
}

function getSfx(name) {
    let sf = sfxs.filter(f => f.name === name)
    return sf.length > 0 ? sf[0].sfx : null
}

function playSfx(name, onEnded) {
    return new Promise((resolve, reject) => {
        let sf = sfxs.filter(f => f.name === name)
        if (sf.length > 0) {
            sf[0].sfx.volume = sfxVolume
            if (onEnded) {
                sf[0].sfx.onended = (e) => {
                    onEnded(e)
                    sf[0].sfx.onended = (e) => { resolve() }
                }
            } else {
                sf[0].sfx.onended = (e) => { resolve() }
            }
            sf[0].sfx.play()
        }
    })
}

function loadSfx(filename) {
    return new Promise((resolve, reject) => {
        let sf = new Audio(filename)
        sf.oncanplaythrough = (e) => {
            resolve(sf)
        }
        sf.onerror = (e) => {
            console.error(`Failed to load file ${filename}:`, e)
            reject(null)
        }
    })
}

function loadAllSfx() {
    let promises = []
    for (let i in sfxs) {
        let sfx = sfxs[i]
        promises.push(new Promise((resolve, reject) => loadSfx(sfx.filename).then(r => {
            sfx.sfx = r
            resolve(r)
        }).catch(e => console.error('Failed to load', sfx.filename, e))))
    }
    return Promise.allSettled(promises)
}

export { loadAllSfx, loadSfx, playSfx, getSfx, isPlaying }