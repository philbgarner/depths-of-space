import maps from './keymapping.json'

var listening = false

function handlerPressed (button) {
  setState(button, true)
  if (pressCallbacks[button]) {
    releaseCallbacks[button](button)
  }
}

function handlerReleased (button) {
  setState(button, false)
  if (releaseCallbacks[button]) {
    releaseCallbacks[button](button)
  }
}

function GetInputKeys(inputType) {
  inputType = inputType.toLowerCase()
  return Object.keys(maps[inputType])
}

function GetInputValue(inputType, key) {
  inputType = inputType.toLowerCase()
  return maps[inputType][key]
}

var inputState = {}
var releaseCallbacks = {}
var pressCallbacks = {}

var enabled = [ 'keyboard', 'gamepad' ]

function setState(button, value) {
  inputState[button] = value
}

function getState(button) {
  if (!listening) {
    return false
  }
  return inputState[button] ? inputState[button] : false
}

function listenerKeyDown(e) {
  if (!listening) {
    return
  }
  let inputs = Object.keys(maps.keyboard)
  for (let i in inputs) {
    if (e.key === maps.keyboard[inputs[i]]) {
      handlerPressed(inputs[i])
    }
  }
}

function listenerKeyUp(e) {
  if (!listening) {
    return
  }
  let inputs = Object.keys(maps.keyboard)
  for (let i in inputs) {
    if (e.key === maps.keyboard[inputs[i]]) {
      handlerReleased(inputs[i])
    }
  }
}

function init() {
  inputState = {}
  releaseCallbacks = {}
  pressCallbacks = {}
  if (enabled.includes('keyboard')) {
    window.removeEventListener('keydown', listenerKeyDown)
    window.removeEventListener('keyup', listenerKeyUp)
    window.addEventListener('keydown', listenerKeyDown)
    window.addEventListener("keyup", listenerKeyUp)
  }
  if (enabled.includes('gamepad')) {
    gameControl.on('connect', function(gamepad) {
      let inputs = Object.keys(maps.gamepad)
      for (let i in inputs) {
        gamepad.on(maps.gamepad[inputs[i]], () => {
          
        }).after(maps.gamepad[inputs[i]], () => {
          handlerReleased(inputs[i])
        })
      }
    })
  }
  listening = false
}

init()

var input = {
  listen: () => {
    listening = true
  },
  unlisten: () => {
    listening = false
  },
  released: (button, method) => {
    releaseCallbacks[button] = method
  },
  pressed: (button, method) => {
    pressCallbacks[button] = method
  }
}

export default input
export { GetInputKeys, GetInputValue }