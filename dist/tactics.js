!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tactics=t():e.tactics=t()}(self,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Start:()=>ue,StartMainMenu:()=>me,pointer:()=>se});const a=JSON.parse('[{"name":"background","image":null,"filename":"./images/Background-sheet.png"},{"name":"grid-white","image":null,"filename":"./images/GridWhite.png"},{"name":"grid-yellow","image":null,"filename":"./images/GridYellow.png"}]');var r=null;function n(e){r=e}function i(){return r}function l(e,t,n,i){let l=a.filter((t=>t.name===e));l.length>0&&(i?r.drawImage(l[0].image,i.x,i.y,i.w,i.h,t,n,i.w,i.h):r.drawImage(l[0].image,t,n))}const o=JSON.parse('{"background":{"default":"idle","idle":{"repeat":true,"imageName":"background","frameDelay":500,"frames":[{"x":0,"y":0,"w":320,"h":200},{"x":320,"y":0,"w":320,"h":200},{"x":640,"y":0,"w":320,"h":200},{"x":960,"y":0,"w":320,"h":200},{"x":1280,"y":0,"w":320,"h":200},{"x":1600,"y":0,"w":320,"h":200},{"x":1280,"y":0,"w":320,"h":200},{"x":960,"y":0,"w":320,"h":200},{"x":640,"y":0,"w":320,"h":200},{"x":320,"y":0,"w":320,"h":200}]}}}');function c(e){return e-new Date(e).setHours(0,0,0,0)}var s=null,d=24,f=24,m=.6,u={x:0,y:8.5*f,targetX:0,targetY:8.5*f};function h(e,t,a,r,n,i,l,o){let c=(a-e)*(i-t)-(r-t)*(n-e);return c*((a-e)*(o-t)-(r-t)*(l-e))>=0&&c*((n-a)*(o-r)-(i-r)*(l-a))>=0&&c*((e-n)*(o-i)-(t-i)*(l-n))>=0}function p(e){if((e=e.toLowerCase()).includes("d")){let r=e.split("d"),n=0;for(let e=0;e<r[0];e++)n+=(t=1,a=r[1],Math.floor(Math.random()*(a-t+1)+t));return n}var t,a;throw new Error("At least one term must specify the number of dice.")}var g=[],S=0,w=["positioning","movement","active","siege","upkeep"],y=0;function b(e,t){g.push({name:e,color:"#ccccccff",order:p(t)}),g.sort(((e,t)=>t.order-e.order))}function x(){return g[S]}function k(){return w[y]}let C=null,v=null,A="";const R=JSON.parse('{"d":{"moveUp":"ArrowUp","moveDown":"ArrowDown","moveLeft":"ArrowLeft","moveRight":"ArrowRight","attack":" ","select":"Shift","cancel":"Escape"},"v":{"moveUp":"button12","moveDown":"button13","moveLeft":"button14","moveRight":"button15","attack":"button0","select":"button7","cancel":"button1"}}');var E=!1;function O(e){_(e,!1),q[e]&&q[e](e)}var T={},q={},M=["keyboard","gamepad"];function _(e,t){T[e]=t}function H(e){if(!E)return;let t=Object.keys(R.d);for(let a in t)e.key===R.d[t[a]]&&_(t[a],!0)}function I(e){if(!E)return;let t=Object.keys(R.d);for(let a in t)e.key===R.d[t[a]]&&O(t[a])}T={},q={},M.includes("keyboard")&&(window.removeEventListener("keydown",H),window.removeEventListener("keyup",I),window.addEventListener("keydown",H),window.addEventListener("keyup",I)),M.includes("gamepad")&&gameControl.on("connect",(function(e){let t=Object.keys(R.v);for(let a in t)e.on(R.v[t[a]],(()=>{})).after(R.v[t[a]],(()=>{O(t[a])}))})),E=!1;const B={listen:()=>{E=!0},unlisten:()=>{E=!1},released:(e,t)=>{q[e]=t}},D=JSON.parse('[{"name":"Overseer","Cost":4,"equipAbilities":6,"gunnerySkill":5,"meleeSkill":5,"speed":4,"hp":22},{"name":"Trooper","Cost":1,"equipAbilities":4,"gunnerySkill":5,"meleeSkill":6,"speed":4,"hp":16},{"name":"Artillerist","Cost":3,"equipAbilities":5,"gunnerySkill":4,"meleeSkill":7,"speed":3,"hp":18},{"name":"Recon","Cost":2,"equipAbilities":5,"gunnerySkill":8,"meleeSkill":4,"speed":6,"hp":16},{"name":"Technician","Cost":2,"equipAbilities":7,"gunnerySkill":7,"meleeSkill":8,"speed":3,"hp":14},{"name":"Medic","Cost":4,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":7,"speed":4,"hp":20},{"name":"Herald","Cost":3,"equipAbilities":8,"gunnerySkill":8,"meleeSkill":6,"speed":4,"hp":14},{"name":"Crusader","Cost":5,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":5,"speed":5,"hp":25},{"name":"Bastion","Cost":3,"equipAbilities":5,"gunnerySkill":6,"meleeSkill":4,"speed":3,"hp":28}]');class ${constructor(e){try{this.data=D.filter((t=>t.name===e))[0],this.data.maxHp=this.data.hp,this.name=this.data.name,this.equipment=[]}catch{this.data={},console.error(`Could not locate template for ${e}.`)}this.effectModifiers={},this.effects=[]}UpdateEffects(){for(let e in this.effects){let t=this.effects[e];t.ttl&&t.ttl--,t.ttl<=0&&this.RemoveEffectModifier(t)}this.effects=this.effects.filter((e=>e.ttl>0))}AddEffect(e){e.ttl&&this.effects.push(e),void 0!==e.attribute&&this.AddEffectModifier(e.attribute,e.amount)}RemoveEffectModifier(e){void 0!==e.attribute&&this.AddEffect(e.attribute,-1*e.amount)}AddEffectModifier(e,t){void 0===this.effectModifiers[e]&&(this.effectModifiers[e]=0),this.effectModifiers[e]+=t}EffectModifier(e){return void 0!==this.effectModifiers[e]?this.effectModifiers[e]:0}Name(){return this.data.name}Cost(){return this.data.Cost+this.EffectModifier("cost")}EquipmentAndAbilities(e){return void 0!==e&&(this.data.equipAbilities=e),this.data.equipAbilities+this.EffectModifier("equipAbilities")}GunnerySkill(){return this.data.gunnerySkill+this.EffectModifier("gunnerySkill")}MeleeSkill(){return this.data.meleeSkill+this.EffectModifier("meleeSkill")}Speed(){return this.data.speed+this.EffectModifier("speed")}Hp(){return this.data.hp+this.EffectModifier("hp")}MaxHp(){return this.data.maxHp+this.EffectModifier("maxHp")}}const P=JSON.parse('[{"id":"Main","Style":{"Color":"#c1c1c1ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Start","onSelect":"menu_GameSetup","width":"90%"},{"text":"Settings","onSelect":"menu_Settings","width":"90%"},{"text":"Credits","onSelect":"menu_Credits","width":"90%"}]},{"id":"GameSetup","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Hire Squad ({0} hired)","onRender":"callback_OnRenderHireSquad","width":"90%"},{"text":"Stars: {0}","onRender":"callback_OnRenderStars","width":"90%"},{"text":"Overseer (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Trooper (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Artillerist (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Recon (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Technician (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Medic (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Herald (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Crusader (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Bastion (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Next","onSelect":"callback_SetupEquipment","width":"90%","column":0}]},{"id":"SetupEquipment","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Columns":2,"Options":[{"text":"Next","onSelect":"callback_StartGame","width":160,"column":0}]},{"id":"Settings","onLoad":"callback_StartSettings","Options":[{"text":"Input Type","width":"90%"}]}]'),F=JSON.parse('[{"name":"Phaser Pistol","attacks":4,"damage":1,"range":10,"reload":true,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Slug Revolver","attacks":2,"damage":2,"range":6,"reload":true,"cost":1,"characters":["Crusader","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Phaser Rifle","attacks":4,"damage":2,"range":20,"reload":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Slugger","attacks":2,"damage":5,"range":10,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Beam Rifle","attacks":3,"damage":3,"range":24,"reload":true,"cost":2,"characters":["Overseer","Artillerist","Recon","Technician","Crusader","Bastion"],"effects":[]},{"name":"Solumide Burner","attacks":2,"damage":3,"range":6,"reload":true,"cost":2,"characters":["Trooper","Artillerist","Technician","Herald","Crusader"],"effects":[]},{"name":"Phaser Cannon","attacks":1,"damage":6,"range":20,"reload":true,"cost":2,"characters":["Artillerist","Crusader","Bastion"],"effects":[]},{"name":"Heavy Rotary Rifle","attacks":10,"damage":1,"range":20,"reload":true,"cost":3,"characters":["Artillerist","Bastion"],"effects":[]},{"name":"Heavy Slug Cannon","attacks":2,"damage":6,"range":14,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Incendiary Cannon","attacks":4,"damage":2,"range":24,"reload":true,"cost":3,"characters":["Artillerist","Crusader"],"effects":[]},{"name":"Long-Range Phaser Rifle","attacks":1,"damage":8,"range":36,"reload":true,"cost":3,"characters":["Trooper","Artillerist","Recon"],"effects":[]},{"name":"Force Grenade","attacks":1,"damage":8,"range":12,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Flash Grenade","attacks":1,"damage":0,"range":12,"diameter":12,"thrown":true,"cost":2,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[{"disadvantage":true,"target":"targets","ttl":"next-siege-phase"}]},{"name":"Saw Sword","attacks":2,"damage":2,"range":0,"cost":1,"characters":["Overseer","Trooper","Artillerist","Recon","Technician","Medic","Herald","Crusader","Bastion"],"effects":[]},{"name":"Force Hammer","attacks":1,"damage":4,"range":0,"cost":2,"characters":["Crusader","Bastion"],"effects":[]},{"name":"Righteous Ax","attacks":2,"damage":3,"range":0,"cost":2,"characters":["Overseer","Trooper","Herald","Crusader","Bastion"],"effects":[]},{"name":"Assassin\'s Knife","attacks":3,"damage":1,"range":0,"cost":1,"characters":["Recon"],"effects":[{"damage":1,"target":"enemy","ttl":"next-2-siege-phase"}]},{"name":"Dueling Blades","attacks":3,"damage":2,"range":0,"cost":2,"characters":["Overseer","Recon","Herald","Crusader"],"effects":[]},{"name":"Powered Titanium Fists","attacks":4,"damage":2,"range":0,"cost":3,"characters":["Overseer","Trooper","Crusader","Bastion"],"effects":[]},{"name":"Warding Staff","attacks":2,"damage":2,"range":0,"cost":3,"characters":["Overseer","Herald"],"effects":[{"advantage":true,"target":"abilities","ttl":0}]},{"name":"Powered Titanium Armor","cost":3,"characters":["Crusader","Bastion"],"effects":[{"attribute":"speed","target":"self","amount":-2,"ttl":0}]},{"name":"Powered Titanium Boots","cost":2,"characters":["Overseer","Recon","Crusader","Bastion"],"effects":[{"attribute":"speed","target":"self","amount":2,"ttl":0}]},{"name":"Laser Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Thermal Scope","cost":3,"characters":["Overseer","Trooper","Recon","Technician"],"effects":[]},{"name":"Suture Kit","cost":3,"characters":["Overseer","Medic"],"effects":[]},{"name":"Cauterizing Torch","attacks":3,"damage":2,"range":4,"cost":5,"characters":["Medic"],"effects":[]}]');let L=null,N=null;var j=16,U=[],G=function(e,t,r,n,i){if(!o[e])throw new Error(`Can't build sprite, missing animation definition '${e}'.`);let s={name:e,x:0,y:0,frames:[],pose:n,framesImage:null,currentFrame:0,updateDelta:0,play:!0,SetAnimation:(e,t,r)=>{s.animStartTime=c(new Date);let n=o[e];if(r&&(s.onComplete=r),n){let r=n.default?n.default:null;if(r=n[t]?n[t]:r,r){if(!(a.filter((e=>e.name===r.imageName)).length>0))throw new Error(`Can't find pose ${t} in ${e}.`);if(s.frames=r.frames,s.currentFrame=0,s.animation=e,s.pose=t,s.framesImage=r.imageName,r.sfx){let e=getSfx(r.sfx);e&&e.play()}}else s.frames=[],s.currentFrame=0,s.animation="",s.pose="";s.play=!0}},draw:(e,t)=>{e=e||0,t=t||0,l(s.framesImage,s.x+e,s.y+t,s.frames[s.currentFrame])},moveTo:async(e,t,a)=>new Promise((async(r,n)=>{let i=s,l=i.x,o=i.y,c=a,d=0;var f,m;await(f=e,m=t,new Promise(((a,r)=>{let n=()=>{if(d+=c,d>=1)i.x=e,i.y=t,a();else{let e={x:(1-(u=d))*(r={x:l,y:o}).x+u*(s={x:f,y:m}).x,y:(1-u)*r.y+u*s.y};i.x=e.x,i.y=e.y,setTimeout(n,16)}var r,s,u};setTimeout(n,16)}))),r()})),onComplete:e=>{},update:e=>{let t=o[s.animation][s.pose];t&&s.play&&(s.updateDelta>t.frameDelay?(s.currentFrame++,s.currentFrame>s.frames.length-1&&(t.repeat?(s.currentFrame=0,s.animDuration=c(new Date)-s.animStartTime,s.onComplete(s)):(s.animDuration=c(new Date)-s.animStartTime,s.currentFrame--,s.play=!1,s.onComplete(s)),t.onComplete&&t.onComplete(s)),s.updateDelta=0):s.updateDelta+=e)}};return s.SetAnimation(e,n),s}("background",0,0,"idle"),J=[],z={},Y="Main",K="Start",W=0,X=null,Q={callback_OnRenderStars:(e,t)=>[j.toString()],callback_OnRenderHireSquad:(e,t)=>[U.length],callback_OnRenderCharacter:(e,t)=>{let a=e.split(" ")[0].replace(">","");return[U.filter((e=>e.name===a)).length]},callback_HireCharacter:e=>{let t=e.split(" ")[0].replace(">",""),a=new $(t);j-a.Cost()>=0&&(U.push(a),j-=a.Cost())},callback_StartGame:()=>{!function(){var e=[],t=[],a=[];for(let r=0;r<d;r++)for(let n=0;n<36;n++)e.push([n,r]),h(0,parseInt(12)-parseInt(12),10,parseInt(12),0,parseInt(12)+parseInt(12),n,r)&&t.push([n,r]),h(36,parseInt(12)-parseInt(12),26,parseInt(12),36,parseInt(12)+parseInt(12),n,r)&&a.push([n,r]);s={tiles:e,teamA:t,teamB:a}}(),ue()},callback_SelectCharacterEquip:e=>{X=e},callback_SetupEquipment:e=>{te("SetupEquipment");let t=P.filter((e=>"SetupEquipment"===e.id))[0],a=t.Options.findIndex((e=>"Next"===e.text));t.Options=[...U.map(((e,t)=>({text:`${t+1}. ${e.name}`,onSelect:"callback_SelectCharacterEquip",width:160,column:0}))),t.Options[a]]}};let V=0,Z=0;function ee(e){return e.includes("callback_")?Q[e]?Q[e]:()=>{}:(e.includes("menu_")&&te(e.split("_")[1]),()=>{})}function te(e){B.unlisten(),W=0,Y=e;let t=ae(e);B.listen(),z=t.filter((e=>e.text===K))[0]}function ae(e){let t=re(e).Options.filter((e=>e.onSelect&&(void 0===e.column||e.column===W)));return t.length>0&&""===K&&(K=t[0].text),t}function re(e){try{return P.filter((t=>t.id===e))[0]}catch{return null}}function ne(e,t){let a=e.split(/{[0-9]}/),r=[];for(let e in a)r.push(`{${e}}`);let n=ee(t)(e,a);for(let t in n)e=e.replace(r[t],n[t]);return e}var ie=Date.now(),le=Date.now(),oe=16,ce="mainMenu",se={x:0,y:0};function de(e){oe=parseInt(1e3/e)}function fe(){let e=(ie=Date.now())-le;e>=oe&&(function(e){"mainMenu"===ce?function(e){N||(N=i()),G.draw(0,0),G.update(e),L||(L=new imui.ImUI(N.canvas),L.font=font,L.onUpdate=e=>{let t=re(Y),a=t.Options.sort(((e,t)=>void 0!==t.column?t.column:0-e.column!==void 0?e.column:0)),r=Z+30;for(let n in a){let i=a[n].text,l=a[n],o=i===K?t.Style.SelectColor:l.onSelect?t.Style.SelectableColor:t.Style.Color,c=`${K===i?">":" "}${i}${K===i?"<":" "}`;c.includes("{")&&c.includes("}")&&l.onRender&&(c=ne(c,l.onRender));let s=e.Element({id:"lblMenu"+Y+i+n,text:c,rect:{x:V,y:r,w:64,h:8},color:o,highlight:o,bgcolor:"#cccccc00"});s.Hover()&&l.onSelect&&(K=i),s.Clicked()&&l.onSelect&&(K=c,ee(l.onSelect)(l.text)),r+=12}if("SetupEquipment"===Y&&e.Element({id:"lblEquipMenu",text:"Squad Equipment",rect:{x:V,y:Z+15,w:128,h:8},color:t.Style.Color,highlight:t.Style.Color,bgcolor:"#cccccc00"}),X&&"SetupEquipment"===Y){let a="";r=Z+42;let n=80,i=X.split(".")[1].trim(),l=parseInt(X.split("."))-1,o=U[l].EquipmentAndAbilities(),c=(e.Element({id:"lblSelEquip",text:`${i}: Equip & Ability Points: ${o}`,rect:{x:n,y:Z+30,w:128,h:8},color:t.Style.Color,highlight:t.Style.Color,bgcolor:"#cccccc00"}),F.filter((e=>e.characters.includes(i))));for(let i in c){let s=c[i],d=U[l].equipment.filter((e=>s.name===e.name)),f=t.Style.SelectableColor;d.length>0&&(f=t.Style.Disabled);let m=e.Element({id:"lblEquip"+Y+s.name+i,text:s.name,rect:{x:n,y:r,w:128,h:8},color:f,highlight:f,bgcolor:"#cccccc00"});if(m.Hover()){let e=[`Attacks: ${s.attacks}`,`Damage: ${s.damage}`,`Range: ${s.range}`,`Cost: ${s.cost}`];s.reload&&e.push("Requires Reload"),a=e.join("\n")}m.Clicked()&&(d.length>0?(U[l].equipment=U[l].equipment.filter((e=>e.name!==s.name)),U[l].EquipmentAndAbilities(o+s.cost)):o-s.cost>=0&&(U[l].equipment.push(s),U[l].EquipmentAndAbilities(o-s.cost))),r+=12,r>180&&(r=Z+42,n+=90)}a&&(e.RemoveElement("lblTooltip"),e.Element({id:"lblTooltip",text:a,x:se.x,y:se.y+8,autosize:!0,color:t.Style.SelectableColor,highlight:t.Style.SelectColor,bgcolor:"#000000dd"}))}}),L.Draw()}(e):"main"===ce&&(v||(v=i()),v.clearRect(0,0,320,200),function(e){let t=i();t.save(),t.translate(-u.x,-u.y);let a=t.globalAlpha;t.globalAlpha=m;let r=s.tiles.filter((e=>!s.teamA.filter((t=>t[0]===e[0]&&t[1]===e[1])).length&&!s.teamB.filter((t=>e[0]===t[0]&&e[1]===t[1])).length));for(let e in r)l("grid-white",r[e][0]*f,r[e][1]*f);for(let e in s.teamA)l("grid-yellow",s.teamA[e][0]*f,s.teamA[e][1]*f);for(let e in s.teamB)l("grid-yellow",s.teamB[e][0]*f,s.teamB[e][1]*f);t.globalAlpha=a,t.restore()}(),C||(C=new imui.ImUI(v.canvas),C.font=font,C.onUpdate=e=>{let t=k().slice(0,1).toUpperCase()+k().slice(1);e.Element({id:"lblPhase",text:`${t}: ${x().name}`,rect:{x:10,y:3,w:300,h:9},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#000000cc"}),e.Element({id:"lblTooltip",text:A,rect:{x:0,y:0,w:240,h:10},color:"#f1f1f1ff",highlight:"#f1f1f1ff",bgcolor:"#cccccc00"})}),C.Draw())}(e),le=ie),window.requestAnimationFrame(fe)}async function me(){await function(){let e=[];for(let t in a){let r=a[t];e.push(new Promise(((e,t)=>{return(n=r.filename,new Promise(((e,t)=>{let r=new Image;r.onload=t=>{e(r)},r.onerror=e=>{console.error(`Failed to load file ${n}:`,e),t(null)},a.filter((e=>e.filename===n)).length>0?r.src=n:(console.error(`Image definition matching filename ${n} not found.`),t(null))}))).then((t=>{r.image=t,e(t)})).catch((e=>console.error("Failed to load",r.filename,e)));var n})))}return Promise.allSettled(e)}();let e=document.getElementById("maincanvas"),t=e.width/e.height;e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px",window.addEventListener("resize",(()=>{e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px"})),e.addEventListener("mousemove",(t=>{se.x=parseInt((t.clientX-e.offsetLeft)*(e.width/parseInt(e.style.width)))-2,se.y=parseInt((t.clientY-e.offsetTop)*(e.height/parseInt(e.style.height)))})),e.addEventListener("contextmenu",(e=>(e.preventDefault(),!1))),de(60),n(e.getContext("2d")),B.listen(),B.released("moveDown",(()=>{re(Y),J=ae(Y),z=J.filter((e=>e.text===K))[0];let e=J.findIndex((e=>e.text===K));e++,e>=J.length&&(e=0),K=J[e].text})),B.released("moveUp",(()=>{re(Y),J=ae(Y),z=J.filter((e=>e.text===K))[0];let e=J.findIndex((e=>e.text===K));e--,e<0&&(e=J.length-1),K=J[e].text})),B.released("attack",(()=>{re(Y),J=ae(Y);try{(z=J.filter((e=>e.text===K))[0]).onSelect&&ee(z.onSelect)(z.text)}catch{}})),window.requestAnimationFrame(fe)}async function ue(){B.unlisten();let e=document.getElementById("maincanvas");ce="main",b("Team A","1d10"),b("Team B","1d10"),console.log("teams",x()),de(60),n(e.getContext("2d")),window.requestAnimationFrame(fe)}return t})()));
//# sourceMappingURL=tactics.js.map