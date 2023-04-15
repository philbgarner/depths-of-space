!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tactics=t():e.tactics=t()}(self,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var n in a)e.o(a,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Start:()=>Me,StartMainMenu:()=>Ee,gameMap:()=>Ce,getPointer:()=>Ae,pointer:()=>ke});const a=JSON.parse('[{"name":"grid-white","image":null,"filename":"./images/GridWhite.png"},{"name":"grid-yellow","image":null,"filename":"./images/GridYellow.png"},{"name":"player-walk","image":null,"filename":"./images/anims/PlayerWalk 48x48.png"},{"name":"player-death","image":null,"filename":"./images/anims/Player Death 64x64.png"},{"name":"player-hurt","image":null,"filename":"./images/anims/Player Hurt 48x48.png"},{"name":"player-idle","image":null,"filename":"./images/anims/Character Idle 48x48.png"},{"name":"mars-scape","image":null,"filename":"./images/Mars-Scape.png"},{"name":"mars-lookout","image":null,"filename":"./images/mars-lookout.png"},{"name":"star-icon","image":null,"filename":"./images/star.png"},{"name":"ui-frame-teal","image":null,"filename":"./images/ui-frame-teal.png"},{"name":"ui-button-teal","image":null,"filename":"./images/ui-button-teal.png"},{"name":"ui-button-teal-down","image":null,"filename":"./images/ui-button-teal-down.png"},{"name":"ui-button-grey","image":null,"filename":"./images/ui-button-grey.png"},{"name":"ui-button-grey-down","image":null,"filename":"./images/ui-button-grey-down.png"},{"name":"ui-button-carat-hover","image":null,"filename":"./images/ui-button-carat-hover.png"},{"name":"ui-button-carat-pressed","image":null,"filename":"./images/ui-button-carat-pressed.png"},{"name":"ui-button-scroll-area","image":null,"filename":"./images/ui-button-scroll-area.png"},{"name":"ui-button-scroll-down","image":null,"filename":"./images/ui-button-scroll-down.png"},{"name":"ui-button-scroll-down-hover","image":null,"filename":"./images/ui-button-scroll-down-hover.png"},{"name":"ui-button-scroll-down-pressed","image":null,"filename":"./images/ui-button-scroll-down-pressed.png"},{"name":"ui-button-scroll-up","image":null,"filename":"./images/ui-button-scroll-up.png"},{"name":"ui-button-scroll-up-hover","image":null,"filename":"./images/ui-button-scroll-up-hover.png"},{"name":"ui-button-scroll-up-pressed","image":null,"filename":"./images/ui-button-scroll-up-pressed.png"},{"name":"ui-button-carat","image":null,"filename":"./images/ui-button-carat.png"},{"name":"ui-checkbox","image":null,"filename":"./images/ui-checkbox.png"},{"name":"ui-checkbox-hover","image":null,"filename":"./images/ui-checkbox-hover.png"},{"name":"ui-checkbox-pressed","image":null,"filename":"./images/ui-checkbox-pressed.png"}]');var n=null;function r(e){n=e}function i(){return n}function l(e){let t=a.filter((t=>t.name===e));return t.length>0?t[0].image:null}function o(e,t,r,i){let l=a.filter((t=>t.name===e));l.length>0&&(i?n.drawImage(l[0].image,i.x,i.y,i.w,i.h,t,r,i.w,i.h):n.drawImage(l[0].image,t,r))}const c=JSON.parse('{"background":{"default":"idle","idle":{"repeat":true,"imageName":"mars-lookout","frameDelay":500,"frames":[{"x":0,"y":0,"w":320,"h":200}]}},"player":{"default":"idle","idle":{"repeat":true,"imageName":"player-idle","frameDelay":100,"frames":[{"x":0,"y":0,"w":48,"h":48},{"x":48,"y":0,"w":48,"h":48},{"x":96,"y":0,"w":48,"h":48},{"x":144,"y":0,"w":48,"h":48},{"x":192,"y":0,"w":48,"h":48},{"x":240,"y":0,"w":48,"h":48},{"x":288,"y":0,"w":48,"h":48},{"x":336,"y":0,"w":48,"h":48},{"x":384,"y":0,"w":48,"h":48},{"x":432,"y":0,"w":48,"h":48}]}}}');function s(e){return e-new Date(e).setHours(0,0,0,0)}function m(e,t,n,r,i){if(!c[e])throw new Error(`Can't build sprite, missing animation definition '${e}'.`);let l={name:e,x:t,y:n,frames:[],pose:r,framesImage:null,currentFrame:0,updateDelta:0,play:!0,SetAnimation:(e,t,n)=>{l.animStartTime=s(new Date);let r=c[e];if(n&&(l.onComplete=n),r){let n=r.default?r.default:null;if(n=r[t]?r[t]:n,n){if(!(a.filter((e=>e.name===n.imageName)).length>0))throw new Error(`Can't find pose ${t} in ${e}.`);if(l.frames=n.frames,l.currentFrame=0,l.animation=e,l.pose=t,l.framesImage=n.imageName,n.sfx){let e=getSfx(n.sfx);e&&e.play()}}else l.frames=[],l.currentFrame=0,l.animation="",l.pose="";l.play=!0}},draw:(e,t)=>{e=e||0,t=t||0,o(l.framesImage,l.x+e,l.y+t,l.frames[l.currentFrame])},moveTo:async(e,t,a)=>new Promise((async(n,r)=>{let i=l,o=i.x,c=i.y,s=a,m=0;var u,f;await(u=e,f=t,new Promise(((a,n)=>{let r=()=>{if(m+=s,m>=1)i.x=e,i.y=t,a();else{let e={x:(1-(d=m))*(n={x:o,y:c}).x+d*(l={x:u,y:f}).x,y:(1-d)*n.y+d*l.y};i.x=e.x,i.y=e.y,setTimeout(r,16)}var n,l,d};setTimeout(r,16)}))),n()}))};return l.onComplete=i||(e=>{}),l.update=e=>{let t=c[l.animation][l.pose];t&&l.play&&(l.updateDelta>t.frameDelay?(l.currentFrame++,l.currentFrame>l.frames.length-1&&(t.repeat?(l.currentFrame=0,l.animDuration=s(new Date)-l.animStartTime,l.onComplete(l)):(l.animDuration=s(new Date)-l.animStartTime,l.currentFrame--,l.play=!1,l.onComplete(l)),t.onComplete&&t.onComplete(l)),l.updateDelta=0):l.updateDelta+=e)},l.SetAnimation(e,r),l}function u(e){if((e=e.toLowerCase()).includes("d")){let n=e.split("d"),r=0;for(let e=0;e<n[0];e++)r+=(t=1,a=n[1],Math.floor(Math.random()*(a-t+1)+t));return r}var t,a;throw new Error("At least one term must specify the number of dice.")}var f=[],d=0,g=["positioning","movement","active","siege","upkeep"],h=0;function p(e,t){let a={name:e,color:"#ccccccff",order:u(t)};return f.push(a),f.sort(((e,t)=>t.order-e.order)),a}function y(e){let t=f.filter((t=>t.name===e));return t.length>0?t[0]:null}function b(){return f[d]}function w(){return g[h]}var x=null,v=36,S=24,k=24,C=.3,A=10,I=24,R=null,E=[],M={x:24,y:8.5*q().y,w:320/q().x,h:200/q().y,targetX:24,targetY:8.5*q().y};function T(){return{...M,cellX:()=>parseInt(M.x/q().x),cellY:()=>parseInt(M.y/q().y)}}function H(e){R=e}function O(e,t,a,n,r,i,l,o){let c=(a-e)*(i-t)-(n-t)*(r-e);return c*((a-e)*(o-t)-(n-t)*(l-e))>=0&&c*((r-a)*(o-n)-(i-n)*(l-a))>=0&&c*((e-r)*(o-i)-(t-i)*(l-r))>=0}function B(e,t){let a=new P({team:y(e),name:t.name,character:t,spriteName:"player",x:0,y:0});return E.push(a),a}function D(e){return console.log(e,E),e?E.filter((t=>t.team.name===e)):E}function q(){return{x:k,y:k}}const P=class{constructor(e){this.team=e.team,this.name=e.name,this.character=e.character,this.sprite=m(e.spriteName,e.x?e.x:0,e.y?e.y:0,"idle")}Position(){return{x:this.sprite.x,y:this.sprite.y}}MapCoords(){return{x:parseInt(this.sprite.x/q().x),y:parseInt(this.sprite.y/q().y)}}Draw(e){this.sprite.draw(e)}};let _=null,$=null,N="";function G(){if("positioning"===w()){let e=D(b().name);e.length>0&&(console.log("setting place sprite for",b(),e[0].sprite),H(e[0].sprite))}}const L=JSON.parse('{"d":{"moveUp":"ArrowUp","moveDown":"ArrowDown","moveLeft":"ArrowLeft","moveRight":"ArrowRight","attack":" ","select":"Shift","cancel":"Escape"},"v":{"moveUp":"button12","moveDown":"button13","moveLeft":"button14","moveRight":"button15","attack":"button0","select":"button7","cancel":"button1"}}');var F=!1;function j(e){J(e,!1),z[e]&&z[e](e)}var U={},z={},Y=["keyboard","gamepad"];function J(e,t){U[e]=t}function X(e){if(!F)return;let t=Object.keys(L.d);for(let a in t)e.key===L.d[t[a]]&&J(t[a],!0)}function W(e){if(!F)return;let t=Object.keys(L.d);for(let a in t)e.key===L.d[t[a]]&&j(t[a])}U={},z={},Y.includes("keyboard")&&(window.removeEventListener("keydown",X),window.removeEventListener("keyup",W),window.addEventListener("keydown",X),window.addEventListener("keyup",W)),Y.includes("gamepad")&&gameControl.on("connect",(function(e){let t=Object.keys(L.v);for(let a in t)e.on(L.v[t[a]],(()=>{})).after(L.v[t[a]],(()=>{j(t[a])}))})),F=!1;const K={listen:()=>{F=!0},unlisten:()=>{F=!1},released:(e,t)=>{z[e]=t}},Q=JSON.parse('[{"name":"Overseer","Cost":4,"equipAbilities":6,"gunnerySkill":5,"meleeSkill":5,"speed":4,"hp":22},{"name":"Trooper","Cost":1,"equipAbilities":4,"gunnerySkill":5,"meleeSkill":6,"speed":4,"hp":16},{"name":"Artillerist","Cost":3,"equipAbilities":5,"gunnerySkill":4,"meleeSkill":7,"speed":3,"hp":18},{"name":"Recon","Cost":2,"equipAbilities":5,"gunnerySkill":8,"meleeSkill":4,"speed":6,"hp":16},{"name":"Technician","Cost":2,"equipAbilities":7,"gunnerySkill":7,"meleeSkill":8,"speed":3,"hp":14},{"name":"Medic","Cost":4,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":7,"speed":4,"hp":20},{"name":"Herald","Cost":3,"equipAbilities":8,"gunnerySkill":8,"meleeSkill":6,"speed":4,"hp":14},{"name":"Crusader","Cost":5,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":5,"speed":5,"hp":25},{"name":"Bastion","Cost":3,"equipAbilities":5,"gunnerySkill":6,"meleeSkill":4,"speed":3,"hp":28}]');class V{constructor(e){try{this.data=Q.filter((t=>t.name===e))[0],this.data.maxHp=this.data.hp,this.name=this.data.name,this.equipment=[]}catch{this.data={},console.error(`Could not locate template for ${e}.`)}this.effectModifiers={},this.effects=[]}EquipItem(e){}UpdateEffects(){for(let e in this.effects){let t=this.effects[e];t.ttl&&t.ttl--,t.ttl<=0&&this.RemoveEffectModifier(t)}this.effects=this.effects.filter((e=>e.ttl>0))}AddEffect(e){e.ttl&&this.effects.push(e),void 0!==e.attribute&&this.AddEffectModifier(e.attribute,e.amount)}RemoveEffectModifier(e){void 0!==e.attribute&&this.AddEffect(e.attribute,-1*e.amount)}AddEffectModifier(e,t){void 0===this.effectModifiers[e]&&(this.effectModifiers[e]=0),this.effectModifiers[e]+=t}EffectModifier(e){return void 0!==this.effectModifiers[e]?this.effectModifiers[e]:0}Name(){return this.data.name}Cost(){return this.data.Cost+this.EffectModifier("cost")}EquipmentAndAbilities(e){return void 0!==e&&(this.data.equipAbilities=e),this.data.equipAbilities+this.EffectModifier("equipAbilities")}GunnerySkill(){return this.data.gunnerySkill+this.EffectModifier("gunnerySkill")}MeleeSkill(){return this.data.meleeSkill+this.EffectModifier("meleeSkill")}Speed(){return this.data.speed+this.EffectModifier("speed")}Hp(){return this.data.hp+this.EffectModifier("hp")}MaxHp(){return this.data.maxHp+this.EffectModifier("maxHp")}}const Z=JSON.parse('[{"name":"Phaser Pistol","attacks":4,"damage":1,"range":10,"reload":true,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Slug Revolver","attacks":2,"damage":2,"range":6,"reload":true,"cost":1,"characters":["Crusader","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Phaser Rifle","attacks":4,"damage":2,"range":20,"reload":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Slugger","attacks":2,"damage":5,"range":10,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Beam Rifle","attacks":3,"damage":3,"range":24,"reload":true,"cost":2,"characters":["Overseer","Artillerist","Recon","Technician","Crusader","Bastion"],"effects":[]},{"name":"Solumide Burner","attacks":2,"damage":3,"range":6,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Technician","Herald","Crusader"],"effects":[]},{"name":"Phaser Cannon","attacks":1,"damage":6,"range":20,"reload":true,"cost":2,"characters":["Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Heavy Rotary Rifle","attacks":10,"damage":1,"range":20,"reload":true,"cost":3,"characters":["Artillerist","Bastion"],"effects":[]},{"name":"Heavy Slug Cannon","attacks":2,"damage":6,"range":14,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Incendiary Cannon","attacks":4,"damage":2,"range":24,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Long-Range Phaser Rifle","attacks":1,"damage":8,"range":36,"reload":true,"cost":3,"characters":["Trooper","Artillerist","Recon"],"effects":[]},{"name":"Force Grenade","attacks":1,"damage":8,"range":12,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Flash Grenade","attacks":1,"damage":0,"range":12,"diameter":12,"thrown":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[{"disadvantage":true,"target":"targets","ttl":"next-siege-phase"}]},{"name":"Saw Sword","attacks":2,"damage":2,"range":0,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Force Hammer","attacks":1,"damage":4,"range":0,"cost":2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Righteous Ax","attacks":2,"damage":3,"range":0,"cost":2,"characters":["Overseer","Trooper","Herald","Crusader","Bastion"],"effects":[]},{"name":"Assassin\'s Knife","attacks":3,"damage":1,"range":0,"cost":1,"characters":["Recon"],"effects":[{"damage":1,"target":"enemy","ttl":"next-2-siege-phase"}]},{"name":"Dueling Blades","attacks":3,"damage":2,"range":0,"cost":2,"characters":["Overseer","Recon","Herald","Crusader"],"effects":[]},{"name":"Powered Titanium Fists","attacks":4,"damage":2,"range":0,"cost":3,"characters":["Overseer","Trooper","Crusader","Bastion"],"effects":[]},{"name":"Warding Staff","attacks":2,"damage":2,"range":0,"cost":3,"characters":["Overseer","Herald"],"effects":[{"advantage":true,"target":"abilities","ttl":0}]},{"name":"Powered Titanium Armor","cost":3,"speed":-2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Powered Titanium Boots","cost":2,"speed":2,"characters":["Overseer","Recon","Crusader","Bastion"],"effects":[]},{"name":"Laser Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Thermal Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Suture Kit","cost":3,"characters":["Overseer","Medic"],"effects":[]},{"name":"Cauterizing Torch","attacks":3,"damage":2,"range":4,"cost":5,"characters":["Medic"],"effects":[]}]'),ee=JSON.parse('[{"id":"Main","Style":{"Color":"#c1c1c1ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Start","onSelect":"menu_GameSetup","width":"90%"},{"text":"Settings","onSelect":"menu_Settings","width":"90%"},{"text":"Credits","onSelect":"menu_Credits","width":"90%"}]},{"id":"GameSetup","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Overseer (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Trooper (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Artillerist (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Recon (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Technician (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Medic (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Herald (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Crusader (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Bastion (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"}]},{"id":"SetupEquipment","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Columns":2,"Options":[{"text":"Next","onSelect":"callback_StartGame","width":160,"column":0}]},{"id":"Settings","onLoad":"callback_StartSettings","Options":[{"text":"Input Type","width":"90%"}]}]');var te=[],ae=16;let ne=ee.filter((e=>"GameSetup"===e.id))[0];function re(e){let t=new V(e);ae-t.Cost()>=0&&(te.push(t),ae-=t.Cost())}function ie(e){let t=new V(e),a=te.findIndex((t=>t.name===e));a>-1&&(ae+=t.Cost(),te=te.filter(((e,t)=>t!==a)))}function le(e){let t={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},a={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")},n={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-button-grey"),imageDown:l("ui-button-grey-down"),imageHover:l("ui-button-grey")},r={type:"Element",color:"#cacacaff",highlight:"#cacacaff",bgcolor:"#00000000"},i=e.Element({id:"frameMenu",rect:{x:5,y:28,w:128,h:160},...t,anim:{curve:"bezier",duration:100,params:{y:-128},onComplete:e=>{}}}),o=e.Element({id:"frameStats",rect:{x:135,y:28,w:128,h:110},...t,anim:{curve:"bezier",duration:100,params:{x:260},onComplete:e=>{}}}),c=e.Element({id:"frameButtons",rect:{x:135,y:156,w:128,h:32},...t,anim:{curve:"bezier",duration:100,params:{y:190},onComplete:e=>{}}}),s=0===te.length?"Hire your squad and click next\nto continue.":`Squad Size: ${te.length}`+(0===ae?"\nNo stars remaining.\nClick 'Next'.":"");if(!i.anim){e.Element({id:"lblMenuStars",text:`${ae}`,rect:{x:98,y:10,w:64,h:11},...r},i),e.Element({id:"imgStars",type:"Image",x:108,y:8,image:l("star-icon")},i);let t=19;for(let a in ne.Options){let l=ne.Options[a].text,o=l.split(" ")[0],c=Q.filter((e=>e.name===o))[0];l=l.replace("{0}",te.filter((e=>e.name===o)).length);let m=e.Element({id:"lblMenu"+a,text:l,rect:{x:16,y:t+2,w:76,h:14},...r},i),u=e.Element({id:"lblMenuAdd"+a,text:"+",rect:{x:94,y:t,w:14,h:14},...n},i);u.Clicked()&&re(o);let f=e.Element({id:"lblMenuRem"+a,text:"-",rect:{x:109,y:t,w:14,h:14},...n},i);f.Clicked()&&ie(o),(m.Hover()||u.Hover()||f.Hover())&&(s=[`${o}`,`Cost: ${c.Cost}`,`Melee Skill: ${c.meleeSkill}`,`Gunnery Skill: ${c.gunnerySkill}`,`Speed: ${c.speed}`,`HP: ${c.speed}`,"Equipment/Abilities",`Points: ${c.equipAbilities}`].join("\n")),t+=15}}if(!c.anim){let t=e.Element({id:"btnNext",text:"Next",rect:{x:72,y:8,w:50,h:16},...a},c);t.Hover()&&(s="Accept squad and move\non to outfitting equipment\nand abilities."),t.Clicked()&&function(e,t,a){let n={...e.Rect()};n.x=-130,e.Animate(190,{...e.Rect()},n);let r={...t.Rect()};r.x=320,t.Animate(190,{...t.Rect()},r);let i=a.Rect();i.y=200,a.Animate(200,{...a.Rect()},i,(()=>be("SetupEquipment")))}(i,o,c)}!o.anim&&s.length&&e.Element({id:"lblTooltip",text:s,rect:{x:8,y:8,w:110,h:100},...r},o)}let oe=-1,ce=[],se=null;function me(e){let t={bgcolor:"#122020ff",color:"#cacacaff",bgcolorSelected:"#122020ff",colorSelected:"#f1f1f1ff",highlight:"#f1f1f1ff",scrollbarWidth:9,scrollAreaImage:{image:l("ui-button-scroll-area"),hover:l("ui-button-scroll-area"),pressed:l("ui-button-scroll-area"),innerRect:{x:3,y:4,w:7,h:40}},caratImage:{image:l("ui-button-carat"),hover:l("ui-button-carat-hover"),pressed:l("ui-button-carat-pressed")},upImage:{image:l("ui-button-scroll-up"),hover:l("ui-button-scroll-up-hover"),pressed:l("ui-button-scroll-up-pressed")},downImage:{image:l("ui-button-scroll-down"),hover:l("ui-button-scroll-down-hover"),pressed:l("ui-button-scroll-down-pressed")}},a={...t,multiSelect:!0,checkboxImage:{image:l("ui-checkbox"),hover:l("ui-checkbox-hover"),pressed:l("ui-checkbox-pressed")}};t.bgcolorSelected="#5daf8dff",t.colorSelected="#122020ff";let n={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},r={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")},i={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-button-grey"),imageDown:l("ui-button-grey-down"),imageHover:l("ui-button-grey")},o=e.Element({id:"frameMenuSquad",rect:{x:5,y:8,w:72,h:110},...n,anim:{curve:"bezier",duration:100,params:{x:-100},onComplete:e=>{}}});if(!o.anim){let l=e.Element({id:"eqabMenu",rect:{x:79,y:8,w:235,h:110},...n,anim:{curve:"bezier",duration:100,params:{y:-140},onComplete:e=>{}}});if(!l.anim){let f=e.Element({id:"charList",type:"ListImage",list:te.map((e=>e.name)),rect:{x:8,y:9,w:55,h:90},...t},o);if(null!==f.currentItem&&f.currentItem!==oe&&((s=f.currentItem)<0||s>te.length-1||(oe=s,se=te[oe],m=te[oe].name,ce=Z.filter((e=>e.characters.filter((e=>e===m)).length))),c&&(c.selectedList=[])),oe>-1){e.Element({id:"charEquip",text:"Equipment:",rect:{x:8,y:8,w:64,h:9}},l);var c=e.Element({id:"charEquipList",type:"ListImage",list:ce.map((e=>e.name)),rect:{x:8,y:19,w:128,h:80},...a},l);let t=ce[c.hoverItem];if(t){let a=[];t.speed&&a.push(`Speed ${t.speed}`),t.range>0?(a.push(`Gunnery ${t.damage}`),a.push(`Range ${t.range}`)):a.push(`Melee ${t.damage}`),a.push(`Cost ${t.cost}`),e.Element({id:"charEquipDescription",text:a.join("\n"),rect:{x:140,y:18,w:64,h:9}},l)}}let d=e.Element({id:"frameButtons",rect:{x:165,y:160,w:128,h:32},...n,anim:{curve:"bezier",duration:100,params:{y:190},onComplete:e=>{}}});d.anim||(e.Element({id:"btnNext",text:"Next",rect:{x:72,y:8,w:50,h:16},...r},d).Clicked()&&(ce=[],u(0,0,d,(()=>{Me(te,function(){var e=[],t=[],a=[];for(let n=0;n<S;n++)for(let r=0;r<v;r++)e.push([r,n]),O(0,parseInt(S/2)-parseInt(I/2),A,parseInt(S/2),0,parseInt(S/2)+parseInt(I/2),r,n)&&t.push([r,n]),O(v,parseInt(S/2)-parseInt(I/2),v-A,parseInt(S/2),v,parseInt(S/2)+parseInt(I/2),r,n)&&a.push([r,n]);return(x={tiles:e,teamA:t,teamB:a,allTiles:e}).hasTile=(e,t)=>x.tiles.filter((a=>a[0]===e&&a[1]===t)).length>0,x.hasTeamATile=(e,t)=>x.teamA.filter((a=>a[0]===e&&a[1]===t)).length>0,x.hasTeamBTile=(e,t)=>x.teamB.filter((a=>a[0]===e&&a[1]===t)).length>0,x.tiles=x.tiles.filter((e=>!x.teamA.filter((t=>t[0]===e[0]&&t[1]===e[1])).length&&!x.teamB.filter((t=>e[0]===t[0]&&e[1]===t[1])).length)),console.log("map =",x),x}())}))),e.Element({id:"btnPrev",text:"Back",rect:{x:8,y:8,w:50,h:16},...i},d).Clicked()&&(ce=[],u(0,0,d,(()=>be("GameSetup")))))}}var s,m;function u(e,t,a,n){let r=a.Rect();r.y=200,a.Animate(200,{...a.Rect()},r,n)}}let ue=null,fe=null;var de=m("background",0,0,"idle"),ge=[],he={},pe="Main",ye="Start";function be(e){pe=e,ue.RemoveElements(),"GameSetup"===e&&(ue.onUpdate=le),"SetupEquipment"===e&&(ue.onUpdate=me)}var we=Date.now(),xe=Date.now(),ve=16,Se="mainMenu",ke={x:0,y:0},Ce=null;function Ae(){return{...ke,cellX:()=>parseInt(ke.x/q().x),cellY:()=>parseInt(ke.y/q().y)}}function Ie(e){ve=parseInt(1e3/e)}function Re(){let e=(we=Date.now())-xe;e>=ve&&(function(e){"mainMenu"===Se?function(e){fe||(fe=i()),de.draw(0,0),de.update(e),function(e){if(!ue){ue=new imui.ImUI(fe.canvas),ue.font=font;let e={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},t={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")};ue.onUpdate=a=>{let n=a.Element({id:"frameMenu",rect:{x:38,y:28,w:97,h:96},...e,anim:{curve:"bezier",duration:100,params:{w:12,h:12},onComplete:e=>{}}});n.anim||a.Element({id:"lblMenu",text:"Start",rect:{x:6,y:10,w:86,h:19},...t},n).Clicked()&&n.Animate(100,n.Rect(),{x:-116,y:28,w:12,h:12},(()=>be("GameSetup")))}}ue.Draw()}()}(e):"main"===Se&&function(e){$||($=i()),$.clearRect(0,0,320,200),function(e){let t=i();t.save(),o("mars-scape",0,0);let a=t.globalAlpha;t.globalAlpha=C;let n=x.tiles;for(let e in n)o("grid-white",n[e][0]*q().x,n[e][1]*q().y);for(let e in x.teamA)o("grid-yellow",x.teamA[e][0]*q().x,x.teamA[e][1]*q().y);for(let e in x.teamB)o("grid-yellow",x.teamB[e][0]*q().x,x.teamB[e][1]*q().y);t.globalAlpha=a,R&&(R.x=parseInt(ke.x/q().x)*q().x-12,R.y=parseInt(ke.y/q().y)*q().y-20,R.update(e),R.draw(),bfontjs.DrawText(i(),R.x+8,R.y+40,"Unit Name","#f1f1f1ff",font)),t.restore()}(e),_||(_=new imui.ImUI($.canvas),_.font=font,_.onUpdate=e=>{if("positioning"===w()){let t=Ae().cellX()+T().cellX(),a=Ae().cellY()+T().cellY(),n=e.Element({id:"lblBg",text:"",rect:{x:0,y:0,w:320,h:200},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#00000000"});n.Hover()&&null!==R&&(N=Ce.hasTeamATile(t,a)?"Place unit.":`Invalid location (${t},${a}), place inside the yellow area.`),n.Clicked()&&(H(null),N=`Placed at ${t}, ${a}.`)}let t=w().slice(0,1).toUpperCase()+w().slice(1);e.Element({id:"lblPhase",text:`${t}: ${b().name}`,rect:{x:10,y:3,w:300,h:9},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#000000cc"}),e.Element({id:"lblTooltip",text:N,rect:{x:0,y:190,w:240,h:10},color:"#f1f1f1ff",highlight:"#f1f1f1ff",bgcolor:"#000000cc"})}),_.Draw()}(e)}(e),xe=we),window.requestAnimationFrame(Re)}async function Ee(){await function(){let e=[];for(let t in a){let n=a[t];e.push(new Promise(((e,t)=>{return(r=n.filename,new Promise(((e,t)=>{let n=new Image;n.onload=t=>{e(n)},n.onerror=e=>{console.error(`Failed to load file ${r}:`,e),t(null)},a.filter((e=>e.filename===r)).length>0?n.src=r:(console.error(`Image definition matching filename ${r} not found.`),t(null))}))).then((t=>{n.image=t,e(t)})).catch((e=>console.error("Failed to load",n.filename,e)));var r})))}return Promise.allSettled(e)}();let e=document.getElementById("maincanvas"),t=e.width/e.height;e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px",window.addEventListener("resize",(()=>{e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px"})),e.addEventListener("mousemove",(t=>{ke.x=parseInt((t.clientX-e.offsetLeft)*(e.width/parseInt(e.style.width)))-2,ke.y=parseInt((t.clientY-e.offsetTop)*(e.height/parseInt(e.style.height)))})),e.addEventListener("contextmenu",(e=>(e.preventDefault(),!1))),Ie(60),r(e.getContext("2d")),K.listen(),K.released("moveDown",(()=>{GetMenu(pe),ge=GetMenuItems(pe),he=ge.filter((e=>e.text===ye))[0];let e=ge.findIndex((e=>e.text===ye));e++,e>=ge.length&&(e=0),ye=ge[e].text})),K.released("moveUp",(()=>{GetMenu(pe),ge=GetMenuItems(pe),he=ge.filter((e=>e.text===ye))[0];let e=ge.findIndex((e=>e.text===ye));e--,e<0&&(e=ge.length-1),ye=ge[e].text})),K.released("attack",(()=>{GetMenu(pe),ge=GetMenuItems(pe);try{(he=ge.filter((e=>e.text===ye))[0]).onSelect&&((e=he.onSelect).includes("callback_")?menuMethods[e]?menuMethods[e]:()=>{}:(e.includes("menu_")&&be(e.split("_")[1]),()=>{}))(he.text)}catch{}var e})),window.requestAnimationFrame(Re)}async function Me(e,t){Ce=t,K.unlisten();let a=document.getElementById("maincanvas");Se="main",p("Team Alpha","2d10"),p("Team Bravo","1d1");for(let t in e)B("Team Alpha",e[t]);Ie(60),r(a.getContext("2d")),G(),window.requestAnimationFrame(Re)}return t})()));
//# sourceMappingURL=tactics.js.map