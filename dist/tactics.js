!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tactics=t():e.tactics=t()}(self,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Start:()=>ke,StartMainMenu:()=>be,pointer:()=>Se});const a=JSON.parse('[{"name":"grid-white","image":null,"filename":"./images/GridWhite.png"},{"name":"grid-yellow","image":null,"filename":"./images/GridYellow.png"},{"name":"player-walk","image":null,"filename":"./images/anims/PlayerWalk 48x48.png"},{"name":"player-death","image":null,"filename":"./images/anims/Player Death 64x64.png"},{"name":"player-hurt","image":null,"filename":"./images/anims/Player Hurt 48x48.png"},{"name":"player-idle","image":null,"filename":"./images/anims/Character Idle 48x48.png"},{"name":"mars-scape","image":null,"filename":"./images/Mars-Scape.png"},{"name":"mars-lookout","image":null,"filename":"./images/mars-lookout.png"},{"name":"ui-frame-teal","image":null,"filename":"./images/ui-frame-teal.png"},{"name":"ui-button-teal","image":null,"filename":"./images/ui-button-teal.png"},{"name":"ui-button-teal-down","image":null,"filename":"./images/ui-button-teal-down.png"}]');var r=null;function n(e){r=e}function i(){return r}function l(e){let t=a.filter((t=>t.name===e));return t.length>0?t[0].image:null}function o(e,t,n,i){let l=a.filter((t=>t.name===e));l.length>0&&(i?r.drawImage(l[0].image,i.x,i.y,i.w,i.h,t,n,i.w,i.h):r.drawImage(l[0].image,t,n))}const c=JSON.parse('{"background":{"default":"idle","idle":{"repeat":true,"imageName":"mars-lookout","frameDelay":500,"frames":[{"x":0,"y":0,"w":320,"h":200}]}},"player":{"default":"idle","idle":{"repeat":true,"imageName":"player-idle","frameDelay":500,"frames":[{"x":0,"y":0,"w":48,"h":48},{"x":48,"y":0,"w":48,"h":48},{"x":96,"y":0,"w":48,"h":48},{"x":144,"y":0,"w":48,"h":48},{"x":192,"y":0,"w":48,"h":48},{"x":240,"y":0,"w":48,"h":48},{"x":288,"y":0,"w":48,"h":48},{"x":336,"y":0,"w":48,"h":48},{"x":384,"y":0,"w":48,"h":48},{"x":432,"y":0,"w":48,"h":48}]}}}');function s(e){return e-new Date(e).setHours(0,0,0,0)}function m(e,t,r,n,i){if(!c[e])throw new Error(`Can't build sprite, missing animation definition '${e}'.`);let l={name:e,x:t,y:r,frames:[],pose:n,framesImage:null,currentFrame:0,updateDelta:0,play:!0,SetAnimation:(e,t,r)=>{l.animStartTime=s(new Date);let n=c[e];if(r&&(l.onComplete=r),n){let r=n.default?n.default:null;if(r=n[t]?n[t]:r,r){if(!(a.filter((e=>e.name===r.imageName)).length>0))throw new Error(`Can't find pose ${t} in ${e}.`);if(l.frames=r.frames,l.currentFrame=0,l.animation=e,l.pose=t,l.framesImage=r.imageName,r.sfx){let e=getSfx(r.sfx);e&&e.play()}}else l.frames=[],l.currentFrame=0,l.animation="",l.pose="";l.play=!0}},draw:(e,t)=>{e=e||0,t=t||0,o(l.framesImage,l.x+e,l.y+t,l.frames[l.currentFrame])},moveTo:async(e,t,a)=>new Promise((async(r,n)=>{let i=l,o=i.x,c=i.y,s=a,m=0;var d,f;await(d=e,f=t,new Promise(((a,r)=>{let n=()=>{if(m+=s,m>=1)i.x=e,i.y=t,a();else{let e={x:(1-(u=m))*(r={x:o,y:c}).x+u*(l={x:d,y:f}).x,y:(1-u)*r.y+u*l.y};i.x=e.x,i.y=e.y,setTimeout(n,16)}var r,l,u};setTimeout(n,16)}))),r()}))};return l.onComplete=i||(e=>{}),l.update=e=>{let t=c[l.animation][l.pose];t&&l.play&&(l.updateDelta>t.frameDelay?(l.currentFrame++,l.currentFrame>l.frames.length-1&&(t.repeat?(l.currentFrame=0,l.animDuration=s(new Date)-l.animStartTime,l.onComplete(l)):(l.animDuration=s(new Date)-l.animStartTime,l.currentFrame--,l.play=!1,l.onComplete(l)),t.onComplete&&t.onComplete(l)),l.updateDelta=0):l.updateDelta+=e)},l.SetAnimation(e,n),l}function d(e){if((e=e.toLowerCase()).includes("d")){let r=e.split("d"),n=0;for(let e=0;e<r[0];e++)n+=(t=1,a=r[1],Math.floor(Math.random()*(a-t+1)+t));return n}var t,a;throw new Error("At least one term must specify the number of dice.")}var f=[],u=0,h=["positioning","movement","active","siege","upkeep"],p=0;function g(e,t){let a={name:e,color:"#ccccccff",order:d(t)};return f.push(a),f.sort(((e,t)=>t.order-e.order)),a}function y(e){let t=f.filter((t=>t.name===e));return t.length>0?t[0]:null}function S(){return f[u]}function w(){return h[p]}var x=null,b=24,k=.3,C=null,v=[],A={x:24,y:8.5*T,w:320/T,h:200/T,targetX:0,targetY:8.5*T};function R(e,t,a,r,n,i,l,o){let c=(a-e)*(i-t)-(r-t)*(n-e);return c*((a-e)*(o-t)-(r-t)*(l-e))>=0&&c*((n-a)*(o-r)-(i-r)*(l-a))>=0&&c*((e-n)*(o-i)-(t-i)*(l-n))>=0}function E(e,t){let a=new q({team:y(e),name:t.name,character:t,spriteName:"player",x:0,y:0});return v.push(a),a}function O(e){return console.log(e,v),e?v.filter((t=>t.team.name===e)):v}function T(){return{x:T,y:T}}const q=class{constructor(e){this.team=e.team,this.name=e.name,this.character=e.character,this.sprite=m(e.spriteName,e.x?e.x:0,e.y?e.y:0,"idle")}Position(){return{x:this.sprite.x,y:this.sprite.y}}MapCoords(){return{x:parseInt(this.sprite.x/T().x),y:parseInt(this.sprite.y/T().y)}}Draw(e){this.sprite.draw(e)}};let M=null,H=null,I="";function _(){if("positioning"===w()){let t=O(S().name);console.log(S()),t.length>0&&(e=t[0].sprite,C=e)}var e}const D=JSON.parse('{"d":{"moveUp":"ArrowUp","moveDown":"ArrowDown","moveLeft":"ArrowLeft","moveRight":"ArrowRight","attack":" ","select":"Shift","cancel":"Escape"},"v":{"moveUp":"button12","moveDown":"button13","moveLeft":"button14","moveRight":"button15","attack":"button0","select":"button7","cancel":"button1"}}');var B=!1;function P(e){L(e,!1),F[e]&&F[e](e)}var $={},F={},N=["keyboard","gamepad"];function L(e,t){$[e]=t}function j(e){if(!B)return;let t=Object.keys(D.d);for(let a in t)e.key===D.d[t[a]]&&L(t[a],!0)}function U(e){if(!B)return;let t=Object.keys(D.d);for(let a in t)e.key===D.d[t[a]]&&P(t[a])}$={},F={},N.includes("keyboard")&&(window.removeEventListener("keydown",j),window.removeEventListener("keyup",U),window.addEventListener("keydown",j),window.addEventListener("keyup",U)),N.includes("gamepad")&&gameControl.on("connect",(function(e){let t=Object.keys(D.v);for(let a in t)e.on(D.v[t[a]],(()=>{})).after(D.v[t[a]],(()=>{P(t[a])}))})),B=!1;const G={listen:()=>{B=!0},unlisten:()=>{B=!1},released:(e,t)=>{F[e]=t}},J=JSON.parse('[{"name":"Overseer","Cost":4,"equipAbilities":6,"gunnerySkill":5,"meleeSkill":5,"speed":4,"hp":22},{"name":"Trooper","Cost":1,"equipAbilities":4,"gunnerySkill":5,"meleeSkill":6,"speed":4,"hp":16},{"name":"Artillerist","Cost":3,"equipAbilities":5,"gunnerySkill":4,"meleeSkill":7,"speed":3,"hp":18},{"name":"Recon","Cost":2,"equipAbilities":5,"gunnerySkill":8,"meleeSkill":4,"speed":6,"hp":16},{"name":"Technician","Cost":2,"equipAbilities":7,"gunnerySkill":7,"meleeSkill":8,"speed":3,"hp":14},{"name":"Medic","Cost":4,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":7,"speed":4,"hp":20},{"name":"Herald","Cost":3,"equipAbilities":8,"gunnerySkill":8,"meleeSkill":6,"speed":4,"hp":14},{"name":"Crusader","Cost":5,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":5,"speed":5,"hp":25},{"name":"Bastion","Cost":3,"equipAbilities":5,"gunnerySkill":6,"meleeSkill":4,"speed":3,"hp":28}]');class z{constructor(e){try{this.data=J.filter((t=>t.name===e))[0],this.data.maxHp=this.data.hp,this.name=this.data.name,this.equipment=[]}catch{this.data={},console.error(`Could not locate template for ${e}.`)}this.effectModifiers={},this.effects=[]}UpdateEffects(){for(let e in this.effects){let t=this.effects[e];t.ttl&&t.ttl--,t.ttl<=0&&this.RemoveEffectModifier(t)}this.effects=this.effects.filter((e=>e.ttl>0))}AddEffect(e){e.ttl&&this.effects.push(e),void 0!==e.attribute&&this.AddEffectModifier(e.attribute,e.amount)}RemoveEffectModifier(e){void 0!==e.attribute&&this.AddEffect(e.attribute,-1*e.amount)}AddEffectModifier(e,t){void 0===this.effectModifiers[e]&&(this.effectModifiers[e]=0),this.effectModifiers[e]+=t}EffectModifier(e){return void 0!==this.effectModifiers[e]?this.effectModifiers[e]:0}Name(){return this.data.name}Cost(){return this.data.Cost+this.EffectModifier("cost")}EquipmentAndAbilities(e){return void 0!==e&&(this.data.equipAbilities=e),this.data.equipAbilities+this.EffectModifier("equipAbilities")}GunnerySkill(){return this.data.gunnerySkill+this.EffectModifier("gunnerySkill")}MeleeSkill(){return this.data.meleeSkill+this.EffectModifier("meleeSkill")}Speed(){return this.data.speed+this.EffectModifier("speed")}Hp(){return this.data.hp+this.EffectModifier("hp")}MaxHp(){return this.data.maxHp+this.EffectModifier("maxHp")}}const W=JSON.parse('[{"id":"Main","Style":{"Color":"#c1c1c1ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Start","onSelect":"menu_GameSetup","width":"90%"},{"text":"Settings","onSelect":"menu_Settings","width":"90%"},{"text":"Credits","onSelect":"menu_Credits","width":"90%"}]},{"id":"GameSetup","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Hire Squad ({0} hired)","onRender":"callback_OnRenderHireSquad","width":"90%"},{"text":"Stars: {0}","onRender":"callback_OnRenderStars","width":"90%"},{"text":"Overseer (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Trooper (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Artillerist (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Recon (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Technician (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Medic (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Herald (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Crusader (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Bastion (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Next","onSelect":"callback_SetupEquipment","width":"90%","column":0}]},{"id":"SetupEquipment","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Columns":2,"Options":[{"text":"Next","onSelect":"callback_StartGame","width":160,"column":0}]},{"id":"Settings","onLoad":"callback_StartSettings","Options":[{"text":"Input Type","width":"90%"}]}]'),Y=JSON.parse('[{"name":"Phaser Pistol","attacks":4,"damage":1,"range":10,"reload":true,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Slug Revolver","attacks":2,"damage":2,"range":6,"reload":true,"cost":1,"characters":["Crusader","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Phaser Rifle","attacks":4,"damage":2,"range":20,"reload":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Slugger","attacks":2,"damage":5,"range":10,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Beam Rifle","attacks":3,"damage":3,"range":24,"reload":true,"cost":2,"characters":["Overseer","Artillerist","Recon","Technician","Crusader","Bastion"],"effects":[]},{"name":"Solumide Burner","attacks":2,"damage":3,"range":6,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Technician","Herald","Crusader"],"effects":[]},{"name":"Phaser Cannon","attacks":1,"damage":6,"range":20,"reload":true,"cost":2,"characters":["Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Heavy Rotary Rifle","attacks":10,"damage":1,"range":20,"reload":true,"cost":3,"characters":["Artillerist","Bastion"],"effects":[]},{"name":"Heavy Slug Cannon","attacks":2,"damage":6,"range":14,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Incendiary Cannon","attacks":4,"damage":2,"range":24,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Long-Range Phaser Rifle","attacks":1,"damage":8,"range":36,"reload":true,"cost":3,"characters":["Trooper","Artillerist","Recon"],"effects":[]},{"name":"Force Grenade","attacks":1,"damage":8,"range":12,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Flash Grenade","attacks":1,"damage":0,"range":12,"diameter":12,"thrown":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[{"disadvantage":true,"target":"targets","ttl":"next-siege-phase"}]},{"name":"Saw Sword","attacks":2,"damage":2,"range":0,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Force Hammer","attacks":1,"damage":4,"range":0,"cost":2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Righteous Ax","attacks":2,"damage":3,"range":0,"cost":2,"characters":["Overseer","Trooper","Herald","Crusader","Bastion"],"effects":[]},{"name":"Assassin\'s Knife","attacks":3,"damage":1,"range":0,"cost":1,"characters":["Recon"],"effects":[{"damage":1,"target":"enemy","ttl":"next-2-siege-phase"}]},{"name":"Dueling Blades","attacks":3,"damage":2,"range":0,"cost":2,"characters":["Overseer","Recon","Herald","Crusader"],"effects":[]},{"name":"Powered Titanium Fists","attacks":4,"damage":2,"range":0,"cost":3,"characters":["Overseer","Trooper","Crusader","Bastion"],"effects":[]},{"name":"Warding Staff","attacks":2,"damage":2,"range":0,"cost":3,"characters":["Overseer","Herald"],"effects":[{"advantage":true,"target":"abilities","ttl":0}]},{"name":"Powered Titanium Armor","cost":3,"characters":["Crusader","Bastion"],"effects":[{"attribute":"speed","target":"self","amount":-2,"ttl":0}]},{"name":"Powered Titanium Boots","cost":2,"characters":["Overseer","Recon","Crusader","Bastion"],"effects":[{"attribute":"speed","target":"self","amount":2,"ttl":0}]},{"name":"Laser Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Thermal Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Suture Kit","cost":3,"characters":["Overseer","Medic"],"effects":[]},{"name":"Cauterizing Torch","attacks":3,"damage":2,"range":4,"cost":5,"characters":["Medic"],"effects":[]}]');let K=null,X=null;var Q=16,V=[],Z=m("background",0,0,"idle"),ee=[],te={},ae="Main",re="Start",ne=0,ie=null,le={callback_OnRenderStars:(e,t)=>[Q.toString()],callback_OnRenderHireSquad:(e,t)=>[V.length],callback_OnRenderCharacter:(e,t)=>{let a=e.split(" ")[0].replace(">","");return[V.filter((e=>e.name===a)).length]},callback_HireCharacter:e=>{let t=e.split(" ")[0].replace(">",""),a=new z(t);Q-a.Cost()>=0&&(V.push(a),Q-=a.Cost())},callback_StartGame:()=>{!function(){var e=[],t=[],a=[];for(let r=0;r<b;r++)for(let n=0;n<36;n++)e.push([n,r]),R(0,parseInt(12)-parseInt(12),10,parseInt(12),0,parseInt(12)+parseInt(12),n,r)&&t.push([n,r]),R(36,parseInt(12)-parseInt(12),26,parseInt(12),36,parseInt(12)+parseInt(12),n,r)&&a.push([n,r]);(x={tiles:e,teamA:t,teamB:a,allTiles:e}).tiles=x.tiles.filter((e=>!x.teamA.filter((t=>t[0]===e[0]&&t[1]===e[1])).length&&!x.teamB.filter((t=>e[0]===t[0]&&e[1]===t[1])).length))}(),ke(V)},callback_SelectCharacterEquip:e=>{ie=e},callback_SetupEquipment:e=>{me("SetupEquipment");let t=W.filter((e=>"SetupEquipment"===e.id))[0],a=t.Options.findIndex((e=>"Next"===e.text));t.Options=[...V.map(((e,t)=>({text:`${t+1}. ${e.name}`,onSelect:"callback_SelectCharacterEquip",width:160,column:0}))),t.Options[a]]}};let oe=39,ce=42;function se(e){return e.includes("callback_")?le[e]?le[e]:()=>{}:(e.includes("menu_")&&me(e.split("_")[1]),()=>{})}function me(e){G.unlisten(),ne=0,ae=e;let t=de(e);G.listen(),te=t.filter((e=>e.text===re))[0]}function de(e){let t=fe(e).Options.filter((e=>e.onSelect&&(void 0===e.column||e.column===ne)));return t.length>0&&""===re&&(re=t[0].text),t}function fe(e){try{return W.filter((t=>t.id===e))[0]}catch{return null}}function ue(e,t){let a=e.split(/{[0-9]}/),r=[];for(let e in a)r.push(`{${e}}`);let n=se(t)(e,a);for(let t in n)e=e.replace(r[t],n[t]);return e}var he=Date.now(),pe=Date.now(),ge=16,ye="mainMenu",Se={x:0,y:0};function we(e){ge=parseInt(1e3/e)}function xe(){let e=(he=Date.now())-pe;e>=ge&&(function(e){"mainMenu"===ye?function(e){X||(X=i()),Z.draw(0,0),Z.update(e),function(e){if(!K){K=new imui.ImUI(X.canvas),K.font=font;let e={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-frame-teal"),imageDown:l("ui-frame-teal"),imageHover:l("ui-frame-teal")},t={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:l("ui-button-teal"),imageDown:l("ui-button-teal-down"),imageHover:l("ui-button-teal")};K.onUpdate=a=>{a.Element({id:"frameMenu",rect:{x:38,y:28,w:97,h:96},...e});let r=fe(ae),n=r.Options.sort(((e,t)=>void 0!==t.column?t.column:0-e.column!==void 0?e.column:0)),i=ce;for(let e in n){let l=n[e].text,o=n[e],c=(l===re?r.Style.SelectColor:o.onSelect?r.Style.SelectableColor:r.Style.Color,`${re===l?">":" "}${l}${re===l?"<":" "}`);c.includes("{")&&c.includes("}")&&o.onRender&&(c=ue(c,o.onRender));let s=a.Element({id:"lblMenu"+ae+l+e,text:c,rect:{x:oe+5,y:i,w:86,h:19},...t});s.Hover()&&o.onSelect&&(re=l),s.Clicked()&&o.onSelect&&(re=c,se(o.onSelect)(o.text)),i+=22}if("SetupEquipment"===ae&&a.Element({id:"lblEquipMenu",text:"Squad Equipment",rect:{x:oe,y:ce+15,w:128,h:8},color:r.Style.Color,highlight:r.Style.Color,bgcolor:"#cccccc00"}),ie&&"SetupEquipment"===ae){let e="";i=ce+42;let t=80,n=ie.split(".")[1].trim(),l=parseInt(ie.split("."))-1,o=V[l].EquipmentAndAbilities(),c=(a.Element({id:"lblSelEquip",text:`${n}: Equip & Ability Points: ${o}`,rect:{x:t,y:ce+30,w:128,h:8},color:r.Style.Color,highlight:r.Style.Color,bgcolor:"#cccccc00"}),Y.filter((e=>e.characters.includes(n))));for(let n in c){let s=c[n],m=V[l].equipment.filter((e=>s.name===e.name)),d=r.Style.SelectableColor;m.length>0&&(d=r.Style.Disabled);let f=a.Element({id:"lblEquip"+ae+s.name+n,text:s.name,rect:{x:t,y:i,w:128,h:8},color:d,highlight:d,bgcolor:"#cccccc00"});if(f.Hover()){let t=[`Attacks: ${s.attacks}`,`Damage: ${s.damage}`,`Range: ${s.range}`,`Cost: ${s.cost}`];s.reload&&t.push("Requires Reload"),e=t.join("\n")}f.Clicked()&&(m.length>0?(V[l].equipment=V[l].equipment.filter((e=>e.name!==s.name)),V[l].EquipmentAndAbilities(o+s.cost)):o-s.cost>=0&&(V[l].equipment.push(s),V[l].EquipmentAndAbilities(o-s.cost))),i+=12,i>180&&(i=ce+42,t+=90)}e&&(a.RemoveElement("lblTooltip"),a.Element({id:"lblTooltip",text:e,x:Se.x,y:Se.y+8,autosize:!0,color:r.Style.SelectableColor,highlight:r.Style.SelectColor,bgcolor:"#000000dd"}))}}}K.Draw()}()}(e):"main"===ye&&function(e){H||(H=i()),H.clearRect(0,0,320,200),function(e){let t=i();t.save(),t.translate(-A.x,-A.y),o("mars-scape",0,0);let a=t.globalAlpha;t.globalAlpha=k;let r=x.tiles;for(let e in r)o("grid-white",r[e][0]*T,r[e][1]*T);for(let e in x.teamA)o("grid-yellow",x.teamA[e][0]*T,x.teamA[e][1]*T);for(let e in x.teamB)o("grid-yellow",x.teamB[e][0]*T,x.teamB[e][1]*T);t.globalAlpha=a,C&&(console.log("placingSprite",C),C.x=Se.x,C.y=Se.y,C.draw(e)),t.restore()}(e),M||(M=new imui.ImUI(H.canvas),M.font=font,M.onUpdate=e=>{let t=w().slice(0,1).toUpperCase()+w().slice(1);e.Element({id:"lblPhase",text:`${t}: ${S().name}`,rect:{x:10,y:3,w:300,h:9},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#000000cc"}),e.Element({id:"lblTooltip",text:I,rect:{x:0,y:0,w:240,h:10},color:"#f1f1f1ff",highlight:"#f1f1f1ff",bgcolor:"#cccccc00"})}),M.Draw()}(e)}(e),pe=he),window.requestAnimationFrame(xe)}async function be(){await function(){let e=[];for(let t in a){let r=a[t];e.push(new Promise(((e,t)=>{return(n=r.filename,new Promise(((e,t)=>{let r=new Image;r.onload=t=>{e(r)},r.onerror=e=>{console.error(`Failed to load file ${n}:`,e),t(null)},a.filter((e=>e.filename===n)).length>0?r.src=n:(console.error(`Image definition matching filename ${n} not found.`),t(null))}))).then((t=>{r.image=t,e(t)})).catch((e=>console.error("Failed to load",r.filename,e)));var n})))}return Promise.allSettled(e)}();let e=document.getElementById("maincanvas"),t=e.width/e.height;e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px",window.addEventListener("resize",(()=>{e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px"})),e.addEventListener("mousemove",(t=>{Se.x=parseInt((t.clientX-e.offsetLeft)*(e.width/parseInt(e.style.width)))-2,Se.y=parseInt((t.clientY-e.offsetTop)*(e.height/parseInt(e.style.height)))})),e.addEventListener("contextmenu",(e=>(e.preventDefault(),!1))),we(60),n(e.getContext("2d")),G.listen(),G.released("moveDown",(()=>{fe(ae),ee=de(ae),te=ee.filter((e=>e.text===re))[0];let e=ee.findIndex((e=>e.text===re));e++,e>=ee.length&&(e=0),re=ee[e].text})),G.released("moveUp",(()=>{fe(ae),ee=de(ae),te=ee.filter((e=>e.text===re))[0];let e=ee.findIndex((e=>e.text===re));e--,e<0&&(e=ee.length-1),re=ee[e].text})),G.released("attack",(()=>{fe(ae),ee=de(ae);try{(te=ee.filter((e=>e.text===re))[0]).onSelect&&se(te.onSelect)(te.text)}catch{}})),window.requestAnimationFrame(xe)}async function ke(e){G.unlisten();let t=document.getElementById("maincanvas");ye="main",g("Team Alpha","2d10"),g("Team Bravo","1d1");for(let t in e)E("Team Alpha",e[t]);we(60),n(t.getContext("2d")),_(),window.requestAnimationFrame(xe)}return t})()));
//# sourceMappingURL=tactics.js.map