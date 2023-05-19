!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tactics=t():e.tactics=t()}(self,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Start:()=>Le,StartMainMenu:()=>$e,gameMap:()=>Be,getPointer:()=>Pe,pointer:()=>Oe});const a=JSON.parse('[{"name":"grid-white","image":null,"filename":"./images/GridWhite.png"},{"name":"grid-selected","image":null,"filename":"./images/GridSelected.png"},{"name":"grid-movement-node","image":null,"filename":"./images/GridMoveNode.png"},{"name":"grid-movement-up","image":null,"filename":"./images/GridMoveNodeUp.png"},{"name":"grid-movement-right","image":null,"filename":"./images/GridMoveNodeRight.png"},{"name":"grid-movement-down","image":null,"filename":"./images/GridMoveNodeDown.png"},{"name":"grid-movement-left","image":null,"filename":"./images/GridMoveNodeLeft.png"},{"name":"unit-selected","image":null,"filename":"./images/UnitSelected.png"},{"name":"grid-green","image":null,"filename":"./images/GridGreen.png"},{"name":"grid-yellow","image":null,"filename":"./images/GridYellow.png"},{"name":"player-walk","image":null,"filename":"./images/anims/PlayerWalk 48x48.png"},{"name":"player-death","image":null,"filename":"./images/anims/Player Death 64x64.png"},{"name":"player-hurt","image":null,"filename":"./images/anims/Player Hurt 48x48.png"},{"name":"player-idle","image":null,"filename":"./images/anims/Character Idle 48x48.png"},{"name":"player-trooper-idle","image":null,"filename":"./images/anims/Character Trooper.png"},{"name":"player-crusader-idle","image":null,"filename":"./images/anims/Character Crusader.png"},{"name":"player-medic-idle","image":null,"filename":"./images/anims/Character Medic.png"},{"name":"player-technician-idle","image":null,"filename":"./images/anims/Character Technician.png"},{"name":"player-recon-idle","image":null,"filename":"./images/anims/Character Recon.png"},{"name":"mars-scape","image":null,"filename":"./images/Mars-Scape.png"},{"name":"mars-lookout","image":null,"filename":"./images/mars-lookout.png"},{"name":"star-icon","image":null,"filename":"./images/star.png"},{"name":"action-star-full","image":null,"filename":"./images/ActionStarFull.png"},{"name":"action-star-empty","image":null,"filename":"./images/ActionStarEmpty.png"},{"name":"ui-max-healthbar","image":null,"filename":"./images/ui-max-healthbar.png"},{"name":"ui-healthbar","image":null,"filename":"./images/ui-healthbar.png"},{"name":"ui-frame-teal","image":null,"filename":"./images/ui-frame-teal.png"},{"name":"ui-button-teal","image":null,"filename":"./images/ui-button-teal.png"},{"name":"ui-button-teal-down","image":null,"filename":"./images/ui-button-teal-down.png"},{"name":"ui-button-grey","image":null,"filename":"./images/ui-button-grey.png"},{"name":"ui-button-grey-down","image":null,"filename":"./images/ui-button-grey-down.png"},{"name":"ui-button-carat-hover","image":null,"filename":"./images/ui-button-carat-hover.png"},{"name":"ui-button-carat-pressed","image":null,"filename":"./images/ui-button-carat-pressed.png"},{"name":"ui-button-scroll-area","image":null,"filename":"./images/ui-button-scroll-area.png"},{"name":"ui-button-scroll-down","image":null,"filename":"./images/ui-button-scroll-down.png"},{"name":"ui-button-scroll-down-hover","image":null,"filename":"./images/ui-button-scroll-down-hover.png"},{"name":"ui-button-scroll-down-pressed","image":null,"filename":"./images/ui-button-scroll-down-pressed.png"},{"name":"ui-button-scroll-up","image":null,"filename":"./images/ui-button-scroll-up.png"},{"name":"ui-button-scroll-up-hover","image":null,"filename":"./images/ui-button-scroll-up-hover.png"},{"name":"ui-button-scroll-up-pressed","image":null,"filename":"./images/ui-button-scroll-up-pressed.png"},{"name":"ui-button-carat","image":null,"filename":"./images/ui-button-carat.png"},{"name":"ui-checkbox","image":null,"filename":"./images/ui-checkbox.png"},{"name":"ui-checkbox-hover","image":null,"filename":"./images/ui-checkbox-hover.png"},{"name":"ui-checkbox-pressed","image":null,"filename":"./images/ui-checkbox-pressed.png"}]');var r=null;function n(e){r=e}function i(){return r}function l(e){let t=a.filter((t=>t.name===e));return t.length>0?t[0].image:null}function o(e,t,r,n,l){!function(e,t,r,n,i,l){let o=a.filter((e=>e.name===t));o.length>0&&(i?l?(e.save(),e.scale(-1,1),e.drawImage(o[0].image,i.x,i.y,i.w,i.h,-r-i.w,n,i.w,i.h),e.restore()):e.drawImage(o[0].image,i.x,i.y,i.w,i.h,r,n,i.w,i.h):l?(e.save(),e.scale(-1,1),e.drawImage(o[0].image,r-i.w,n,i.w,i.h),e.restore()):e.drawImage(o[0].image,r,n))}(i(),e,t,r,n,l)}const s=JSON.parse('{"background":{"default":"idle","idle":{"repeat":true,"imageName":"mars-lookout","frameDelay":500,"frames":[{"x":0,"y":0,"w":320,"h":200}]}},"player":{"default":"idle","idle":{"repeat":true,"imageName":"player-trooper-idle","frameDelay":100,"frames":[{"x":0,"y":0,"w":48,"h":48},{"x":48,"y":0,"w":48,"h":48},{"x":96,"y":0,"w":48,"h":48},{"x":144,"y":0,"w":48,"h":48},{"x":192,"y":0,"w":48,"h":48},{"x":240,"y":0,"w":48,"h":48},{"x":288,"y":0,"w":48,"h":48},{"x":336,"y":0,"w":48,"h":48},{"x":384,"y":0,"w":48,"h":48},{"x":432,"y":0,"w":48,"h":48}]}}}');function c(e){return e-new Date(e).setHours(0,0,0,0)}function m(e,t,r,n,i,l){if(!s[e])throw new Error(`Can't build sprite, missing animation definition '${e}'.`);let m={name:e,x:t,y:r,frames:[],pose:n,framesImage:null,currentFrame:0,updateDelta:0,play:!0,flipped:!1,SetAnimation:(e,t,r)=>{m.animStartTime=c(new Date);let n=s[e];if(r&&(m.onComplete=r),n){let r=n.default?n.default:null;if(r=n[t]?n[t]:r,r){if(!(a.filter((e=>e.name===l?l:r.imageName)).length>0))throw new Error(`Can't find pose ${t} in ${e}.`);if(m.frames=r.frames,m.currentFrame=0,m.animation=e,m.pose=t,m.framesImage=l||r.imageName,r.sfx){let e=getSfx(r.sfx);e&&e.play()}}else m.frames=[],m.currentFrame=0,m.animation="",m.pose="";m.play=!0}},draw:(e,t)=>{e=e||0,t=t||0,o(m.framesImage,m.x+e,m.y+t,m.frames[m.currentFrame],m.flipped)},moveTo:async(e,t,a)=>new Promise((async(r,n)=>{let i=m,l=i.x,o=i.y,s=a,c=0;var u,f;await(u=e,f=t,new Promise(((a,r)=>{let n=()=>{if(c+=s,c>=1)i.x=e,i.y=t,a();else{let e={x:(1-(d=c))*(r={x:l,y:o}).x+d*(m={x:u,y:f}).x,y:(1-d)*r.y+d*m.y};i.x=e.x,i.y=e.y,setTimeout(n,16)}var r,m,d};setTimeout(n,16)}))),r()}))};return m.onComplete=i||(e=>{}),m.update=e=>{let t=s[m.animation][m.pose];t&&m.play&&(m.updateDelta>t.frameDelay?(m.currentFrame++,m.currentFrame>m.frames.length-1&&(t.repeat?(m.currentFrame=0,m.animDuration=c(new Date)-m.animStartTime,m.onComplete(m)):(m.animDuration=c(new Date)-m.animStartTime,m.currentFrame--,m.play=!1,m.onComplete(m)),t.onComplete&&t.onComplete(m)),m.updateDelta=0):m.updateDelta+=e)},m.SetAnimation(e,n),m}function u(e){if((e=e.toLowerCase()).includes("d")){let r=e.split("d"),n=0;for(let e=0;e<r[0];e++)n+=(t=1,a=r[1],Math.floor(Math.random()*(a-t+1)+t));return n}var t,a;throw new Error("At least one term must specify the number of dice.")}var f=[],d=0,g=["positioning","movement","active","siege","upkeep"],p=0;function h(e,t){let a={name:e,color:"#ccccccff",order:u(t),homePosition:{x:24,y:8.5*ce().y}};return f.length%2==1&&(a.homePosition={x:600,y:8.5*ce().y}),f.push(a),f.sort(((e,t)=>t.order-e.order)),a}function y(e){let t=f.filter((t=>t.name===e));return t.length>0?t[0]:null}function x(){return f[d]}function w(){return g[p]}function b(){p=++p>=g.length?1:p}function v(){d=++d>=f.length?0:d}const S=JSON.parse('{"d":{"moveUp":"ArrowUp","moveDown":"ArrowDown","moveLeft":"ArrowLeft","moveRight":"ArrowRight","attack":" ","select":"Shift","cancel":"Escape"},"v":{"moveUp":"button12","moveDown":"button13","moveLeft":"button14","moveRight":"button15","attack":"button0","select":"button7","cancel":"button1"}}');var k=!1;function C(e){R(e,!1),E[e]&&E[e](e)}var T={},E={},I={},A=["keyboard","gamepad"];function R(e,t){T[e]=t}function M(e){if(!k)return;let t=Object.keys(S.d);for(let r in t)e.key===S.d[t[r]]&&(R(a=t[r],!0),I[a]&&E[a](a));var a}function D(e){if(!k)return;let t=Object.keys(S.d);for(let a in t)e.key===S.d[t[a]]&&C(t[a])}T={},E={},I={},A.includes("keyboard")&&(window.removeEventListener("keydown",M),window.removeEventListener("keyup",D),window.addEventListener("keydown",M),window.addEventListener("keyup",D)),A.includes("gamepad")&&gameControl.on("connect",(function(e){let t=Object.keys(S.v);for(let a in t)e.on(S.v[t[a]],(()=>{})).after(S.v[t[a]],(()=>{C(t[a])}))})),k=!1;const H={listen:()=>{k=!0},unlisten:()=>{k=!1},released:(e,t)=>{E[e]=t},pressed:(e,t)=>{I[e]=t}};let O=null,B=null,P="",N=null,q=!1;function $(){return N}function L(){if("positioning"===w()){let e=oe(x().name).filter((e=>!e.placed));if(e.length>0)N=e[0],ne(e[0].sprite);else if(oe().filter((e=>!e.placed)).length>0){v();let e=oe(x().name);oe().forEach((e=>e.moved=!1)),e.length>0&&re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3,(()=>N=e[0])),L()}else{b();let e=oe(x().name);oe().forEach((e=>e.moved=!1)),e.length>0&&re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3,(()=>N=e[0]))}}}var _=null,G=36,F=24,j=24,U=.3,X=10,Y=24,z=null,J=[],W=[],K=[],Q={x:24,y:8.5*ce().y,w:G*ce().x,h:F*ce().y,targetX:24,targetY:8.5*ce().y,targetStartX:24,targetStartY:8.5*ce().y,targetDuration:0,targetElapsed:0};function V(){return W}function Z(e,t,a){function r(e,t,a){return Math.abs(e.x-t)+Math.abs(e.y-a)}function n(e,t,a,n,i){let l={x:e.x+t,y:e.y+a,parent:e,g:e.g+r(e,e.x+t,e.y+a),h:r({x:e.x+t,y:e.y+a},n,i)};return l.f=l.g+l.h,l}J=[],W=[],function t(a,r,n,i){if((i=parseFloat(i))<0)return;let l=n.filter((e=>e.x===a&&e.y===r));1!==K.filter((t=>t.x===a&&t.y===r&&t!==e)).length&&0===l.length&&(n.push([a,r]),t(a+1,r,n,i-1),t(a,r-1,n,i-1),t(a-1,r,n,i-1),t(a,r+1,n,i-1))}(e.x,e.y,J,e.character.Speed()),W=function(e,t,a,i,l,o){if(!e)return[];if(t===i&&a===l)return[];if(0===e.filter((e=>e[0]===i&&e[1]===l)).length)return[];let s=[],c=[];for(s.push({x:t,y:a,parent:null,g:0,h:0,f:0});s.length>0;){let t=s.sort(((e,t)=>e.f-t.f))[0];s=s.filter((e=>e.x!==t.x&&e.y!==t.y));let a=[];e.filter((e=>e[0]===t.x+1&&e[1]===t.y)).length>0&&0===K.filter((e=>e.x===t.x+1&&e.y===t.y)).length&&a.push(n(t,1,0,i,l)),e.filter((e=>e[0]===t.x-1&&e[1]===t.y)).length>0&&0===K.filter((e=>e.x===t.x-1&&e.y===t.y)).length&&a.push(n(t,-1,0,i,l)),e.filter((e=>e[0]===t.x&&e[1]===t.y+1)).length>0&&0===K.filter((e=>e.x===t.x&&e.y===t.y+1)).length&&a.push(n(t,0,1,i,l)),e.filter((e=>e[0]===t.x&&e[1]===t.y-1)).length>0&&0===K.filter((e=>e.x===t.x&&e.y===t.y-1)).length&&a.push(n(t,0,-1,i,l));for(let e in a){let t=a[e];if(t.f=t.g+t.h,t.x===i&&t.y===l){let e=t,a=[];for(;null!==e;)a.push(e),e=e.parent;return a.length>o+1?[]:a}0===c.filter((e=>e.x===t.x&&e.y===t.y&&e.f>t.f)).length&&s.push(t)}if(c.push(t),c.length>e.length){let e=t,a=[];for(;null!==e;)e.f=t.g+r(e,i,l),a.push(e),e=e.parent;return a}}return s}(J,e.x,e.y,t,a,e.character.Speed())}function ee(){J=[]}function te(){W=[]}function ae(e){return e*e*(3-2*e)}function re(){return{...Q,cellX:()=>parseInt(Q.x/ce().x),cellY:()=>parseInt(Q.y/ce().y),setTarget:(e,t,a,r)=>{Q.targetStartX=Q.x,Q.targetStartY=Q.y,Q.targetX=e,Q.targetY=t,Q.targetDuration=a,Q.targetElapsed=0,Q.onComplete=r||(()=>{})},isMoving:()=>Q.targetDuration>0}}function ne(e){z=e}function ie(e,t,a,r,n,i,l,o){let s=(a-e)*(i-t)-(r-t)*(n-e);return s*((a-e)*(o-t)-(r-t)*(l-e))>=0&&s*((n-a)*(o-r)-(i-r)*(l-a))>=0&&s*((e-n)*(o-i)-(t-i)*(l-n))>=0}function le(e,t,a){let r=new me({team:y(e),name:t.name,character:t,spriteName:"player",x:0,y:0});return a&&(r.sprite.flipped=a),r.character.data.hp=2,K.push(r),r}function oe(e){return e?K.filter((t=>t.team.name===e)):K}function se(e,t){let a=K.filter((a=>a.x===e&&a.y===t));return a.length>0?a[0]:null}function ce(){return{x:j,y:j}}const me=class{constructor(e){this.actionPoints=2,this.actionPointsPerTurn=2,this.team=e.team,this.name=e.name,this.character=e.character,this.placed=!1,this.sprite=m(e.spriteName,e.x?e.x:0,e.y?e.y:0,"idle",(()=>{}),this.character.data.spriteName),this.sprite.actor=this}MapPosition(){return{x:parseInt(this.sprite.x/ce().x),y:parseInt(this.sprite.y/ce().y)}}Position(){return{x:this.sprite.x,y:this.sprite.y}}MapCoords(){return{x:parseInt(this.sprite.x/ce().x),y:parseInt(this.sprite.y/ce().y)}}Draw(e){this.sprite.draw(e)}},ue=JSON.parse('[{"name":"Overseer","Cost":4,"equipAbilities":6,"gunnerySkill":5,"meleeSkill":5,"speed":4,"hp":22,"spriteName":"player-trooper-idle"},{"name":"Trooper","Cost":1,"equipAbilities":4,"gunnerySkill":5,"meleeSkill":6,"speed":4,"hp":16,"spriteName":"player-trooper-idle"},{"name":"Artillerist","Cost":3,"equipAbilities":5,"gunnerySkill":4,"meleeSkill":7,"speed":3,"hp":18,"spriteName":"player-trooper-idle"},{"name":"Recon","Cost":2,"equipAbilities":5,"gunnerySkill":8,"meleeSkill":4,"speed":6,"hp":16,"spriteName":"player-recon-idle"},{"name":"Technician","Cost":2,"equipAbilities":7,"gunnerySkill":7,"meleeSkill":8,"speed":3,"hp":14,"spriteName":"player-technician-idle"},{"name":"Medic","Cost":4,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":7,"speed":4,"hp":20,"spriteName":"player-medic-idle"},{"name":"Herald","Cost":3,"equipAbilities":8,"gunnerySkill":8,"meleeSkill":6,"speed":4,"hp":14,"spriteName":"player-trooper-idle"},{"name":"Crusader","Cost":5,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":5,"speed":5,"hp":25,"spriteName":"player-crusader-idle"},{"name":"Bastion","Cost":3,"equipAbilities":5,"gunnerySkill":6,"meleeSkill":4,"speed":3,"hp":28,"spriteName":"player-trooper-idle"}]');class fe{constructor(e){try{this.data=ue.filter((t=>t.name===e))[0],this.data.maxHp=this.data.hp,this.name=this.data.name,this.equipment=[]}catch{this.data={},console.error(`Could not locate template for ${e}.`)}this.effectModifiers={},this.effects=[]}EquipItem(e){}UpdateEffects(){for(let e in this.effects){let t=this.effects[e];t.ttl&&t.ttl--,t.ttl<=0&&this.RemoveEffectModifier(t)}this.effects=this.effects.filter((e=>e.ttl>0))}AddEffect(e){e.ttl&&this.effects.push(e),void 0!==e.attribute&&this.AddEffectModifier(e.attribute,e.amount)}RemoveEffectModifier(e){void 0!==e.attribute&&this.AddEffect(e.attribute,-1*e.amount)}AddEffectModifier(e,t){void 0===this.effectModifiers[e]&&(this.effectModifiers[e]=0),this.effectModifiers[e]+=t}EffectModifier(e){return void 0!==this.effectModifiers[e]?this.effectModifiers[e]:0}Name(){return this.data.name}Cost(){return this.data.Cost+this.EffectModifier("cost")}EquipmentAndAbilities(e){return void 0!==e&&(this.data.equipAbilities=e),this.data.equipAbilities+this.EffectModifier("equipAbilities")}GunnerySkill(){return this.data.gunnerySkill+this.EffectModifier("gunnerySkill")}MeleeSkill(){return this.data.meleeSkill+this.EffectModifier("meleeSkill")}Speed(){return this.data.speed+this.EffectModifier("speed")}Hp(){return this.data.hp+this.EffectModifier("hp")}MaxHp(){return this.data.maxHp+this.EffectModifier("maxHp")}}const de=JSON.parse('[{"name":"Phaser Pistol","attacks":4,"damage":1,"range":10,"reload":true,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Slug Revolver","attacks":2,"damage":2,"range":6,"reload":true,"cost":1,"characters":["Crusader","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Phaser Rifle","attacks":4,"damage":2,"range":20,"reload":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Slugger","attacks":2,"damage":5,"range":10,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Beam Rifle","attacks":3,"damage":3,"range":24,"reload":true,"cost":2,"characters":["Overseer","Artillerist","Recon","Technician","Crusader","Bastion"],"effects":[]},{"name":"Solumide Burner","attacks":2,"damage":3,"range":6,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Technician","Herald","Crusader"],"effects":[]},{"name":"Phaser Cannon","attacks":1,"damage":6,"range":20,"reload":true,"cost":2,"characters":["Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Heavy Rotary Rifle","attacks":10,"damage":1,"range":20,"reload":true,"cost":3,"characters":["Artillerist","Bastion"],"effects":[]},{"name":"Heavy Slug Cannon","attacks":2,"damage":6,"range":14,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Incendiary Cannon","attacks":4,"damage":2,"range":24,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Long-Range Phaser Rifle","attacks":1,"damage":8,"range":36,"reload":true,"cost":3,"characters":["Trooper","Artillerist","Recon"],"effects":[]},{"name":"Force Grenade","attacks":1,"damage":8,"range":12,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Flash Grenade","attacks":1,"damage":0,"range":12,"diameter":12,"thrown":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[{"disadvantage":true,"target":"targets","ttl":"next-siege-phase"}]},{"name":"Saw Sword","attacks":2,"damage":2,"range":0,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Force Hammer","attacks":1,"damage":4,"range":0,"cost":2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Righteous Ax","attacks":2,"damage":3,"range":0,"cost":2,"characters":["Overseer","Trooper","Herald","Crusader","Bastion"],"effects":[]},{"name":"Assassin\'s Knife","attacks":3,"damage":1,"range":0,"cost":1,"characters":["Recon"],"effects":[{"damage":1,"target":"enemy","ttl":"next-2-siege-phase"}]},{"name":"Dueling Blades","attacks":3,"damage":2,"range":0,"cost":2,"characters":["Overseer","Recon","Herald","Crusader"],"effects":[]},{"name":"Powered Titanium Fists","attacks":4,"damage":2,"range":0,"cost":3,"characters":["Overseer","Trooper","Crusader","Bastion"],"effects":[]},{"name":"Warding Staff","attacks":2,"damage":2,"range":0,"cost":3,"characters":["Overseer","Herald"],"effects":[{"advantage":true,"target":"abilities","ttl":0}]},{"name":"Powered Titanium Armor","cost":3,"speed":-2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Powered Titanium Boots","cost":2,"speed":2,"characters":["Overseer","Recon","Crusader","Bastion"],"effects":[]},{"name":"Laser Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Thermal Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Suture Kit","cost":3,"characters":["Overseer","Medic"],"effects":[]},{"name":"Cauterizing Torch","attacks":3,"damage":2,"range":4,"cost":5,"characters":["Medic"],"effects":[]}]'),ge=JSON.parse('[{"id":"Main","Style":{"Color":"#c1c1c1ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Start","onSelect":"menu_GameSetup","width":"90%"},{"text":"Settings","onSelect":"menu_Settings","width":"90%"},{"text":"Credits","onSelect":"menu_Credits","width":"90%"}]},{"id":"GameSetup","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Overseer (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Trooper (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Artillerist (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Recon (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Technician (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Medic (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Herald (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Crusader (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Bastion (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"}]},{"id":"SetupEquipment","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Columns":2,"Options":[{"text":"Next","onSelect":"callback_StartGame","width":160,"column":0}]},{"id":"Settings","onLoad":"callback_StartSettings","Options":[{"text":"Input Type","width":"90%"}]}]');var pe=[],he=16;let ye=ge.filter((e=>"GameSetup"===e.id))[0];function xe(e){let t=new fe(e);he-t.Cost()>=0&&(pe.push(t),he-=t.Cost())}function we(e){let t=new fe(e),a=pe.findIndex((t=>t.name===e));a>-1&&(he+=t.Cost(),pe=pe.filter(((e,t)=>t!==a)))}function be(e){let t={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},a={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")},r={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-button-grey"),imageDown:l("ui-button-grey-down"),imageHover:l("ui-button-grey")},n={type:"Element",color:"#cacacaff",highlight:"#cacacaff",bgcolor:"#00000000"},i=e.Element({id:"frameMenu",rect:{x:5,y:28,w:128,h:160},...t,anim:{curve:"bezier",duration:100,params:{y:-128},onComplete:e=>{}}}),o=e.Element({id:"frameStats",rect:{x:135,y:28,w:128,h:110},...t,anim:{curve:"bezier",duration:100,params:{x:260},onComplete:e=>{}}}),s=e.Element({id:"frameButtons",rect:{x:135,y:156,w:128,h:32},...t,anim:{curve:"bezier",duration:100,params:{y:190},onComplete:e=>{}}}),c=0===pe.length?"Hire your squad and click next\nto continue.":`Squad Size: ${pe.length}`+(0===he?"\nNo stars remaining.\nClick 'Next'.":"");if(!i.anim){e.Element({id:"lblMenuStars",text:`${he}`,rect:{x:98,y:10,w:64,h:11},...n},i),e.Element({id:"imgStars",type:"Image",x:108,y:8,image:l("star-icon")},i);let t=19;for(let a in ye.Options){let l=ye.Options[a].text,o=l.split(" ")[0],s=ue.filter((e=>e.name===o))[0];l=l.replace("{0}",pe.filter((e=>e.name===o)).length);let m=e.Element({id:"lblMenu"+a,text:l,rect:{x:16,y:t+2,w:76,h:14},...n},i),u=e.Element({id:"lblMenuAdd"+a,text:"+",rect:{x:94,y:t,w:14,h:14},...r},i);u.Clicked()&&xe(o);let f=e.Element({id:"lblMenuRem"+a,text:"-",rect:{x:109,y:t,w:14,h:14},...r},i);f.Clicked()&&we(o),(m.Hover()||u.Hover()||f.Hover())&&(c=[`${o}`,`Cost: ${s.Cost}`,`Melee Skill: ${s.meleeSkill}`,`Gunnery Skill: ${s.gunnerySkill}`,`Speed: ${s.speed}`,`HP: ${s.speed}`,"Equipment/Abilities",`Points: ${s.equipAbilities}`].join("\n")),t+=15}}if(!s.anim){let t=e.Element({id:"btnNext",text:"Next",rect:{x:72,y:8,w:50,h:16},...a},s);t.Hover()&&(c="Accept squad and move\non to outfitting equipment\nand abilities."),t.Clicked()&&function(e,t,a){let r={...e.Rect()};r.x=-130,e.Animate(190,{...e.Rect()},r);let n={...t.Rect()};n.x=320,t.Animate(190,{...t.Rect()},n);let i=a.Rect();i.y=200,a.Animate(200,{...a.Rect()},i,(()=>Ae("SetupEquipment")))}(i,o,s)}!o.anim&&c.length&&e.Element({id:"lblTooltip",text:c,rect:{x:8,y:8,w:110,h:100},...n},o)}let ve=-1,Se=[],ke=null;function Ce(e){let t={bgcolor:"#122020ff",color:"#cacacaff",bgcolorSelected:"#122020ff",colorSelected:"#f1f1f1ff",highlight:"#f1f1f1ff",scrollbarWidth:9,scrollAreaImage:{image:l("ui-button-scroll-area"),hover:l("ui-button-scroll-area"),pressed:l("ui-button-scroll-area"),innerRect:{x:3,y:4,w:7,h:40}},caratImage:{image:l("ui-button-carat"),hover:l("ui-button-carat-hover"),pressed:l("ui-button-carat-pressed")},upImage:{image:l("ui-button-scroll-up"),hover:l("ui-button-scroll-up-hover"),pressed:l("ui-button-scroll-up-pressed")},downImage:{image:l("ui-button-scroll-down"),hover:l("ui-button-scroll-down-hover"),pressed:l("ui-button-scroll-down-pressed")}},a={...t,multiSelect:!0,checkboxImage:{image:l("ui-checkbox"),hover:l("ui-checkbox-hover"),pressed:l("ui-checkbox-pressed")}};t.bgcolorSelected="#5daf8dff",t.colorSelected="#122020ff";let r={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},n={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")},i={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-button-grey"),imageDown:l("ui-button-grey-down"),imageHover:l("ui-button-grey")},o=e.Element({id:"frameMenuSquad",rect:{x:5,y:8,w:72,h:110},...r,anim:{curve:"bezier",duration:100,params:{x:-100},onComplete:e=>{}}});if(!o.anim){let l=e.Element({id:"eqabMenu",rect:{x:79,y:8,w:235,h:110},...r,anim:{curve:"bezier",duration:100,params:{y:-140},onComplete:e=>{}}});if(!l.anim){let f=e.Element({id:"charList",type:"ListImage",list:pe.map((e=>e.name)),rect:{x:8,y:9,w:55,h:90},...t},o);if(null!==f.currentItem&&f.currentItem!==ve&&((c=f.currentItem)<0||c>pe.length-1||(ve=c,ke=pe[ve],m=pe[ve].name,Se=de.filter((e=>e.characters.filter((e=>e===m)).length))),s&&(s.selectedList=[])),ve>-1){e.Element({id:"charEquip",text:"Equipment:",rect:{x:8,y:8,w:64,h:9}},l);var s=e.Element({id:"charEquipList",type:"ListImage",list:Se.map((e=>e.name)),rect:{x:8,y:19,w:128,h:80},...a},l);let t=Se[s.hoverItem];if(t){let a=[];t.speed&&a.push(`Speed ${t.speed}`),t.range>0?(a.push(`Gunnery ${t.damage}`),a.push(`Range ${t.range}`)):a.push(`Melee ${t.damage}`),a.push(`Cost ${t.cost}`),e.Element({id:"charEquipDescription",text:a.join("\n"),rect:{x:140,y:18,w:64,h:9}},l)}}let d=e.Element({id:"frameButtons",rect:{x:165,y:160,w:128,h:32},...r,anim:{curve:"bezier",duration:100,params:{y:190},onComplete:e=>{}}});d.anim||(e.Element({id:"btnNext",text:"Next",rect:{x:72,y:8,w:50,h:16},...n},d).Clicked()&&(Se=[],u(0,0,d,(()=>{Le(pe,function(){var e=[],t=[],a=[];for(let r=0;r<F;r++)for(let n=0;n<G;n++)e.push([n,r]),ie(0,parseInt(F/2)-parseInt(Y/2),X,parseInt(F/2),0,parseInt(F/2)+parseInt(Y/2),n,r)&&t.push([n,r]),ie(G,parseInt(F/2)-parseInt(Y/2),G-X,parseInt(F/2),G,parseInt(F/2)+parseInt(Y/2),n,r)&&a.push([n,r]);return(_={tiles:e,teamA:t,teamB:a,allTiles:e}).hasTile=(e,t)=>_.tiles.filter((a=>a[0]===e&&a[1]===t)).length>0,_.hasTeamATile=(e,t)=>_.teamA.filter((a=>a[0]===e&&a[1]===t)).length>0,_.hasTeamBTile=(e,t)=>_.teamB.filter((a=>a[0]===e&&a[1]===t)).length>0,_.tiles=_.tiles.filter((e=>!_.teamA.filter((t=>t[0]===e[0]&&t[1]===e[1])).length&&!_.teamB.filter((t=>e[0]===t[0]&&e[1]===t[1])).length)),console.log("map =",_),_}())}))),e.Element({id:"btnPrev",text:"Back",rect:{x:8,y:8,w:50,h:16},...i},d).Clicked()&&(Se=[],u(0,0,d,(()=>Ae("GameSetup")))))}}var c,m;function u(e,t,a,r){let n=a.Rect();n.y=200,a.Animate(200,{...a.Rect()},n,r)}}let Te=null,Ee=null;var Ie=m("background",0,0,"idle");function Ae(e){Te.RemoveElements(),"GameSetup"===e&&(Te.onUpdate=be),"SetupEquipment"===e&&(Te.onUpdate=Ce)}var Re=Date.now(),Me=Date.now(),De=16,He="mainMenu",Oe={x:0,y:0},Be=null;function Pe(){return{...Oe,cellX:()=>parseInt(Oe.x/ce().x),cellY:()=>parseInt(Oe.y/ce().y)}}function Ne(e){De=parseInt(1e3/e)}function qe(){let e=(Re=Date.now())-Me;e>=De&&(function(e){"mainMenu"===He?function(e){Ee||(Ee=i()),Ie.draw(0,0),Ie.update(e),function(e){if(!Te){Te=new imui.ImUI(Ee.canvas),Te.font=font;let e={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},t={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")};Te.onUpdate=a=>{let r=a.Element({id:"frameMenu",rect:{x:38,y:28,w:97,h:96},...e,anim:{curve:"bezier",duration:100,params:{w:12,h:12},onComplete:e=>{}}});r.anim||a.Element({id:"lblMenu",text:"Start",rect:{x:6,y:10,w:86,h:19},...t},r).Clicked()&&r.Animate(100,r.Rect(),{x:-116,y:28,w:12,h:12},(()=>Ae("GameSetup")))}}Te.Draw()}()}(e):"main"===He&&function(e){B||(B=i()),B.clearRect(0,0,320,200),function(e){let t=i();t.save(),t.translate(-Q.x,-Q.y),o("mars-scape",0,0);let a=parseInt((Pe().x+re().x)/ce().x),r=parseInt((Pe().y+re().y)/ce().y);if("positioning"===w()){let e=t.globalAlpha;t.globalAlpha=U;let a=_.tiles;for(let e in a)o("grid-white",a[e][0]*ce().x,a[e][1]*ce().y);for(let e in _.teamA)o("grid-yellow",_.teamA[e][0]*ce().x,_.teamA[e][1]*ce().y);for(let e in _.teamB)o("grid-yellow",_.teamB[e][0]*ce().x,_.teamB[e][1]*ce().y);t.globalAlpha=e}J.forEach((e=>o("grid-green",e[0]*ce().x,e[1]*ce().y))),V().length>0&&V().forEach(((e,t,a)=>{if(0===t){let t=e.x-a[1].x,r=e.y-a[1].y,n="grid-movement-right";t<0&&(n="grid-movement-left"),r<0?n="grid-movement-up":r>0&&(n="grid-movement-down"),o(n,e.x*ce().x,e.y*ce().y)}else t!==a.length-1&&o("grid-movement-node",e.x*ce().x,e.y*ce().y)})),o("grid-selected",a*ce().x,r*ce().y),z&&(z.x=a*ce().x-12,z.y=r*ce().y-20,z.update(e),z.draw(),bfontjs.DrawText(i(),z.x+12,z.y+44,z.actor.name,"#000000cc",font),bfontjs.DrawText(i(),z.x+12,z.y+43,z.actor.name,"#f1f1f1ff",font)),f.forEach((t=>{let a=oe(t.name).filter((e=>e.placed));for(let t in a){a[t].sprite.update(e);let r="#f1f1f1cc";$()===a[t]&&(r="#f1f1f1ff",o("unit-selected",a[t].x*ce().x,a[t].y*ce().y)),a[t].sprite.draw();for(let e=0;e<a[t].actionPointsPerTurn;e++)e<=a[t].actionPoints-1?o("action-star-full",a[t].sprite.x-1,a[t].sprite.y+41-11*e):o("action-star-empty",a[t].sprite.x-1,a[t].sprite.y+41-11*e);let n=bfontjs.CalculateTextWidth(a[t].name,font)+4;if(i().drawImage(l("ui-max-healthbar"),0,0,10,8,a[t].sprite.x+12,a[t].sprite.y+45,n-4,8),i().drawImage(l("ui-max-healthbar"),11,0,4,8,a[t].sprite.x+12+n-4,a[t].sprite.y+45,4,8),a[t].character.Hp){let e=parseInt(a[t].character.Hp()/a[t].character.MaxHp()*n);i().drawImage(l("ui-healthbar"),0,0,10,8,a[t].sprite.x+11,a[t].sprite.y+43,e-4,8),i().drawImage(l("ui-healthbar"),11,0,4,8,a[t].sprite.x+11+e-4,a[t].sprite.y+43,4,8)}bfontjs.DrawText(i(),a[t].sprite.x+12,a[t].sprite.y+44,a[t].name,"#000000cc",font),bfontjs.DrawText(i(),a[t].sprite.x+12,a[t].sprite.y+43,a[t].name,r,font)}})),t.restore(),Q.targetDuration>0&&(Q.x=parseInt(Q.targetStartX+(Q.targetX-Q.targetStartX)*ae(Q.targetElapsed/Q.targetDuration)),Q.y=parseInt(Q.targetStartY+(Q.targetY-Q.targetStartY)*ae(Q.targetElapsed/Q.targetDuration)),Q.targetElapsed+=e,Q.targetElapsed>=Q.targetDuration&&(Q.targetDuration=0,Q.x=Q.targetX,Q.y=Q.targetY,Q.onComplete(),Q.onComplete=()=>{}))}(e),function(e){if(!O){O=new imui.ImUI(B.canvas),O.font=font;let e={bgcolor:"#122020ff",color:"#cacacaff",bgcolorSelected:"#122020ff",colorSelected:"#f1f1f1ff",highlight:"#f1f1f1ff",scrollbarWidth:9,scrollAreaImage:{image:l("ui-button-scroll-area"),hover:l("ui-button-scroll-area"),pressed:l("ui-button-scroll-area"),innerRect:{x:3,y:4,w:7,h:40}},caratImage:{image:l("ui-button-carat"),hover:l("ui-button-carat-hover"),pressed:l("ui-button-carat-pressed")},upImage:{image:l("ui-button-scroll-up"),hover:l("ui-button-scroll-up-hover"),pressed:l("ui-button-scroll-up-pressed")},downImage:{image:l("ui-button-scroll-down"),hover:l("ui-button-scroll-down-hover"),pressed:l("ui-button-scroll-down-pressed")}},t="";O.onUpdate=async a=>{let r=parseInt((Pe().x+re().x)/ce().x),n=parseInt((Pe().y+re().y)/ce().y),i=a.Element({id:"lblBg",text:"",rect:{x:0,y:0,w:320,h:200},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#00000000"});if(i.Clicked()&&2===i.state.mouseButton&&(N=null,te(),ee()),"positioning"===w()){if(i.Hover()&&N&&(P=Be.hasTeamATile(r,n)?"Place unit.":`Invalid location (${r},${n}), place inside the yellow area.`),i.Clicked()&&N){N.x=r,N.y=n,N.sprite.x=r*ce().x-12,N.sprite.y=n*ce().y-20,N.placed=!0,ne(null),N=null,P=`Placed at ${r}, ${n}.`,v();let e=x().homePosition;re().setTarget(e.x,e.y,1500),new Promise(((e,t)=>{setTimeout((()=>{e()}),300)})).then((()=>L()))}}else if("movement"===w()){if(console.log("movement logic"),i.Clicked()&&null===N&&!q){let e=se(r,n);e&&!e.moved&&(N=e,re().setTarget(N.x*ce().x-160,N.y*ce().y-100,1e3),Z(e,r,n))}else if(i.Clicked()&&N&&!q&&!N.moved){let e=JSON.parse(JSON.stringify(V())).reverse().slice(1);ee(),async function(e){function t(e,t){return new Promise(((a,r)=>{e.sprite.moveTo(t.x*ce().x-12,t.y*ce().y-20,.3).then((()=>{re().setTarget(t.x*ce().x-160,t.y*ce().y-100,100),a()}))}))}q=!0;for(let a in e)await t(N,e[a]);q=!1}(e).then((()=>{N.x=V()[0].x,N.y=V()[0].y,N.moved=!0,N.actionPoints--,N=null,te()}))}else i.Hover()&&N&&!q&&Z(N,r,n);if(0===oe().filter((e=>!e.moved)).length){N=null,b(),v();let e=oe(x().name);oe().forEach((e=>e.moved=!1)),e.length>0&&(N=e[0],re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3))}else if(0===oe(x().name).filter((e=>!e.moved)).length){N=null,v();let e=oe(x().name).filter((e=>!e.moved));if(e.length>0)re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3,(()=>N=e[0]));else{let e=x().homePosition;re().setTarget(e.x,e.y,1500)}}}else if("active"===w()){if(P="Active phase.",N){let t=a.Element({id:"actionsList",type:"ListImage",list:["Throw Object >","Reload","Abilities >","Done"],rect:{x:8,y:19,w:96,h:32},...e});if(t.Clicked()&&"Done"===t.list[t.currentItem]){N.moved=!0,N=null,te(),ee(),v();let e=oe(x().name).filter((e=>!e.moved));if(e.length>0)re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3),N=e[0];else if(0===oe().filter((e=>!e.moved)).length){N=null,b(),oe().forEach((e=>e.moved=!1));let e=oe(x().name);e.length>0&&(N=e[0],re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3))}}}else if(i.Clicked()&&null===N){let e=se(r,n);e&&!e.moved&&(N=e,re().setTarget(N.x*ce().x-160,N.y*ce().y-100,1e3))}}else if("siege"===w()){P="Siege phase.";let l=["Ranged Attack >","Melee Attack >","Done"];if("melee"===t&&N&&(console.log(N),l=N.character.equipment.map((e=>e.name)),l.push("< Back")),N){let r=a.Element({id:"actionsList",type:"ListImage",list:l,rect:{x:8,y:19,w:96,h:32},...e});if(r.Clicked()){let e=r.list[r.currentItem];if("Done"===e){N.moved=!0,N=null,te(),ee(),v();let e=oe(x().name).filter((e=>!e.moved));if(e.length>0)re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3),N=e[0];else if(0===oe().filter((e=>!e.moved)).length){N=null,b(),oe().forEach((e=>e.moved=!1));let e=oe(x().name);e.length>0&&(N=e[0],re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3))}}else e.toLowerCase().includes("melee")&&(t="melee")}}else if(i.Clicked()&&null===N){let e=se(r,n);e&&!e.moved&&(N=e,re().setTarget(N.x*ce().x-160,N.y*ce().y-100,1e3))}}else if("upkeep"===w()){P="Applying damage",oe().forEach((e=>e.moved=!1)),N=null,b();let e=oe(x().name);oe().forEach((e=>e.moved=!1)),e.length>0&&re().setTarget(e[0].x*ce().x-160,e[0].y*ce().y-100,1e3,(()=>N=e[0]))}N&&($().x>Pe().cellX()?$().sprite.flipped=!0:$().sprite.flipped=!1),"movement"===w()&&N&&(P=`${N.name} Action Points: ${N.actionPoints} (${r}, ${n}).`);let l=w().slice(0,1).toUpperCase()+w().slice(1);a.Element({id:"lblPhase",text:`${l}: ${x().name}`,rect:{x:10,y:3,w:300,h:9},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#000000cc"}),a.Element({id:"lblTooltip",text:P,rect:{x:0,y:190,w:240,h:10},color:"#f1f1f1ff",highlight:"#f1f1f1ff",bgcolor:"#000000cc"})}}O.Draw()}()}(e)}(e),Me=Re),window.requestAnimationFrame(qe)}async function $e(){await function(){let e=[];for(let t in a){let r=a[t];e.push(new Promise(((e,t)=>{return(n=r.filename,new Promise(((e,t)=>{let r=new Image;r.onload=t=>{e(r)},r.onerror=e=>{console.error(`Failed to load file ${n}:`,e),t(null)},a.filter((e=>e.filename===n)).length>0?r.src=n:(console.error(`Image definition matching filename ${n} not found.`),t(null))}))).then((t=>{r.image=t,e(t)})).catch((e=>console.error("Failed to load",r.filename,e)));var n})))}return Promise.allSettled(e)}();let e=document.getElementById("maincanvas"),t=e.width/e.height;e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px",window.addEventListener("resize",(()=>{e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px"})),e.addEventListener("mousemove",(t=>{Oe.x=parseInt((t.clientX-e.offsetLeft)*(e.width/parseInt(e.style.width)))-2,Oe.y=parseInt((t.clientY-e.offsetTop)*(e.height/parseInt(e.style.height)))})),e.addEventListener("contextmenu",(e=>(e.preventDefault(),!1))),Ne(60),n(e.getContext("2d")),window.requestAnimationFrame(qe)}async function Le(e,t){Be=t,H.unlisten();let a=document.getElementById("maincanvas");He="main",h("Team Alpha","2d10"),h("Team Bravo","1d1");let r=JSON.parse(JSON.stringify(e));for(let t in e)le("Team Alpha",e[t],!1),r[t]=new fe(r[t].name),le("Team Bravo",r[t],!0);Ne(60),n(a.getContext("2d")),H.listen(),H.released("moveDown",(()=>{re().isMoving()||re().setTarget(re().x,re().y+48,320)})),H.released("moveUp",(()=>{re().isMoving()||re().setTarget(re().x,re().y-48,320)})),H.released("moveRight",(()=>{re().isMoving()||re().setTarget(re().x+48,re().y,320)})),H.released("moveLeft",(()=>{re().isMoving()||re().setTarget(re().x-48,re().y,320)})),H.pressed("moveDown",(()=>{re().isMoving()||re().setTarget(re().x,re().y+96,6)})),H.pressed("moveUp",(()=>{re().isMoving()||re().setTarget(re().x,re().y-96,6)})),H.pressed("moveRight",(()=>{re().isMoving()||re().setTarget(re().x+96,re().y,6)})),H.pressed("moveLeft",(()=>{re().isMoving()||re().setTarget(re().x-96,re().y,6)})),L(),window.requestAnimationFrame(qe)}return t})()));
//# sourceMappingURL=tactics.js.map