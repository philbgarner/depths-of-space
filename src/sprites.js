import { drawImage, getImages } from './images.js'
import animations from './sprites.json'

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }
  function lerpCoords (start, end, amt){
    return { x: (1-amt)*start.x+amt*end.x, y: (1-amt)*start.y+amt*end.y }
  }

function removeSprite(name) {
    let index = sprites.findIndex(f => f.name === name)
    if (index >= 0) {
        sprites[index] = undefined
    }
    sprites = sprites.filter(f => f !== undefined)
}

function getMsSinceMidnight(d) {
    var e = new Date(d);
    return d - e.setHours(0,0,0,0)
    }

function buildSprite(name, x, y, pose, onComplete) {
    if (!animations[name]) {
        throw new Error(`Can't build sprite, missing animation definition '${name}'.`)
    }
    let sprite = {
        name: name,
        x: x, y: y,
        frames: [],
        pose: pose,
        framesImage: null,
        currentFrame: 0,
        updateDelta: 0,
        play: true
    }
    sprite.SetAnimation = (animation, pose, onComplete) => {
        sprite.animStartTime = getMsSinceMidnight(new Date())
        let anim = animations[animation]
        if (onComplete) {
            sprite.onComplete = onComplete
        }
        if (anim) {
            let sprPose = anim.default ? anim.default : null
            sprPose = anim[pose] ? anim[pose] : sprPose
            if (sprPose) {
                let img = getImages().filter(f => f.name === sprPose.imageName)
                if (img.length > 0) {
                    sprite.frames = sprPose.frames
                    sprite.currentFrame = 0
                    sprite.animation = animation
                    sprite.pose = pose
                    sprite.framesImage = sprPose.imageName
                    if (sprPose.sfx) {
                        let sfx = getSfx(sprPose.sfx)
                        if (sfx) {
                            sfx.play()
                        }
                    }
                } else {
                    throw new Error(`Can't find pose ${pose} in ${animation}.`)
                }
            } else {
                sprite.frames = []
                sprite.currentFrame = 0
                sprite.animation = ''
                sprite.pose = ''
            }
            sprite.play = true
        }
    }
    sprite.draw = (offsetx, offsety) => {
        offsetx = offsetx ? offsetx : 0
        offsety = offsety ? offsety : 0
        drawImage(sprite.framesImage, sprite.x + offsetx, sprite.y + offsety, sprite.frames[sprite.currentFrame])
    }
    sprite.moveTo = async (x, y, speed) => {
        return new Promise(async (resolve, reject) => {
            let spr = sprite
            let ox = spr.x
            let oy = spr.y
            let spd = speed
            let t = 0
            let move = (mx, my) => new Promise((resolve, reject) => {
                let handler = () => {
                    t += spd
                    if (t >= 1) {
                        spr.x = x
                        spr.y = y
                        resolve()
                    } else {
                        let p = lerpCoords({ x: ox, y: oy }, { x: mx, y: my }, t)
                        spr.x = p.x
                        spr.y = p.y
                        setTimeout(handler, 16)
                    }
                }
                setTimeout(handler, 16)
            })
    
            await move(x, y)
            resolve()
        })
    }
    sprite.onComplete = onComplete ? onComplete : (sprite) => {}
    sprite.update = (delta) => {
        let sprPose = animations[sprite.animation][sprite.pose]
        if (sprPose && sprite.play) {
            if (sprite.updateDelta > sprPose.frameDelay) {
                sprite.currentFrame++
                if (sprite.currentFrame > sprite.frames.length - 1) {
                    if (sprPose.repeat) {
                        sprite.currentFrame = 0
                        sprite.animDuration = getMsSinceMidnight(new Date()) - sprite.animStartTime
                        sprite.onComplete(sprite)
                    } else {
                        sprite.animDuration = getMsSinceMidnight(new Date()) - sprite.animStartTime
                        sprite.currentFrame--
                        sprite.play = false
                        sprite.onComplete(sprite)
                    }
                    if (sprPose.onComplete) {
                        sprPose.onComplete(sprite)
                    }
                }
                sprite.updateDelta = 0
            } else {
                sprite.updateDelta += delta
            }
        }
    }
    sprite.SetAnimation(name, pose)

    return sprite
}

function getAnimation(animation) {
    try {
        return animations[animation]
    } catch {}
    return {}
}

export { buildSprite, removeSprite, getAnimation, getMsSinceMidnight }