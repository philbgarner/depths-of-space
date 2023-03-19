var tracks = [
    // { name: 'battle_theme', track: null, filename: './music/BattleTheme.ogg' },
    // { name: 'gameOver', track: null, filename: './music/Sadness.ogg' },
    // { name: 'ambient', track: null, filename: './music/ambient.ogg' },
    // { name: 'dungeonTheme1', track: null, filename: './music/GameMusic_ForestTheme_24.mp3' }
]

let playlist = []
let playlistCurrent = -1

function isPlaylistPlaying() {
    return playlistCurrent >= 0 && playlist.length > 0 && isTrackPlaying(playlist[playlistCurrent])
}

function stopPlaylist() {
    stopTrack(playlist[playlistCurrent])
    playlistCurrent = -1
}

function setPlaylist(tracks) {
    console.clear()
    playlist.push(...tracks)
}

async function playList() {
    if (playlist.length > 0) {
        if (playlistCurrent < 0) {
            playlistCurrent = randInt(0, playlist.length - 1)
        }
        await playTrack(playlist[playlistCurrent])
        let nextTrack = playlistCurrent + 1
        playlistCurrent = nextTrack < playlist.length ? nextTrack : 0
        playList()
    }
}

function getTracks() {
    return tracks
}

var musicVolume = 0.20

function setMusicVolume(v) {
    v = v < 0 ? 0 : v
    v = v > 1 ? 1 : v
    for (let t in tracks) {
        tracks[t].track.volume = v
        musicVolume = v
    }
}

function getTrack(name) {
    let img = tracks.filter(f => f.name === name)
    return img.length > 0 ? img[0].track : null
}

function playTrack(name) {
    return new Promise((resolve, reject) => {
        let sf = tracks.filter(f => f.name === name)

        function onTrackEnd(e) {
            resolve(sf[0])
        }
    
        if (sf.length > 0 && !isTrackPlaying(name)) {
            sf[0].track.volume = musicVolume
            sf[0].track.currentTime = 0
            sf[0].track.loop = false
            sf[0].track.onended = onTrackEnd
            sf[0].track.play().catch((e) => reject(e))
        } else {
            resolve()
        }
    })
}

function pauseTrack(name) {
    let sf = tracks.filter(f => f.name === name)
    if (sf.length > 0) {
        sf[0].track.pause()
    }
}

function stopTrack(name) {
    let sf = tracks.filter(f => f.name === name)
    if (sf.length > 0) {
        sf[0].track.pause()
        sf[0].track.currentTime = 0
    }
}

function isTrackPlaying(name) {
    let sf = tracks.filter(f => f.name === name)
    if (sf.length > 0) {
        return !sf[0].track.paused
    }
}

function loadTrack(filename) {
    return new Promise((resolve, reject) => {
        let sf = new Audio(filename)
        sf.oncanplaythrough = (e) => {
            sf.loop = false
            resolve(sf)
        }
        sf.onerror = (e) => {
            console.error(`Failed to load file ${filename}:`, e)
            reject(null)
        }
    })
}

function loadMusic() {
    let promises = []
    for (let i in tracks) {
        let track = tracks[i]
        promises.push(new Promise((resolve, reject) => loadTrack(track.filename).then(r => {
            track.track = r
            resolve(r)
        }).catch(e => console.error('Failed to load', track.filename, e))))
    }
    return Promise.allSettled(promises)
}

export { loadMusic, loadTrack, isTrackPlaying, playTrack, getTrack, setMusicVolume, pauseTrack, getTracks, setPlaylist, playList, stopTrack, isPlaylistPlaying, stopPlaylist }