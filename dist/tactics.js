!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tactics=t():e.tactics=t()}(self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Start:()=>ge,StartMainMenu:()=>pe,pointer:()=>ue});const n=JSON.parse('[{"name":"grid-white","image":null,"filename":"./images/GridWhite.png"},{"name":"grid-yellow","image":null,"filename":"./images/GridYellow.png"},{"name":"player-walk","image":null,"filename":"./images/anims/PlayerWalk 48x48.png"},{"name":"player-death","image":null,"filename":"./images/anims/Player Death 64x64.png"},{"name":"player-hurt","image":null,"filename":"./images/anims/Player Hurt 48x48.png"},{"name":"player-idle","image":null,"filename":"./images/anims/Character Idle 48x48.png"},{"name":"mars-scape","image":null,"filename":"./images/Mars-Scape.png"},{"name":"mars-lookout","image":null,"filename":"./images/mars-lookout.png"},{"name":"star-icon","image":null,"filename":"./images/star.png"},{"name":"ui-frame-teal","image":null,"filename":"./images/ui-frame-teal.png"},{"name":"ui-button-teal","image":null,"filename":"./images/ui-button-teal.png"},{"name":"ui-button-teal-down","image":null,"filename":"./images/ui-button-teal-down.png"},{"name":"ui-button-grey","image":null,"filename":"./images/ui-button-grey.png"},{"name":"ui-button-grey-down","image":null,"filename":"./images/ui-button-grey-down.png"}]');var i=null;function a(e){i=e}function l(){return i}function r(e){let t=n.filter((t=>t.name===e));return t.length>0?t[0].image:null}function o(e,t,a,l){let r=n.filter((t=>t.name===e));r.length>0&&(l?i.drawImage(r[0].image,l.x,l.y,l.w,l.h,t,a,l.w,l.h):i.drawImage(r[0].image,t,a))}const c=JSON.parse('{"background":{"default":"idle","idle":{"repeat":true,"imageName":"mars-lookout","frameDelay":500,"frames":[{"x":0,"y":0,"w":320,"h":200}]}},"player":{"default":"idle","idle":{"repeat":true,"imageName":"player-idle","frameDelay":500,"frames":[{"x":0,"y":0,"w":48,"h":48},{"x":48,"y":0,"w":48,"h":48},{"x":96,"y":0,"w":48,"h":48},{"x":144,"y":0,"w":48,"h":48},{"x":192,"y":0,"w":48,"h":48},{"x":240,"y":0,"w":48,"h":48},{"x":288,"y":0,"w":48,"h":48},{"x":336,"y":0,"w":48,"h":48},{"x":384,"y":0,"w":48,"h":48},{"x":432,"y":0,"w":48,"h":48}]}}}');function m(e){return e-new Date(e).setHours(0,0,0,0)}function f(e,t,i,a,l){if(!c[e])throw new Error(`Can't build sprite, missing animation definition '${e}'.`);let r={name:e,x:t,y:i,frames:[],pose:a,framesImage:null,currentFrame:0,updateDelta:0,play:!0,SetAnimation:(e,t,i)=>{r.animStartTime=m(new Date);let a=c[e];if(i&&(r.onComplete=i),a){let i=a.default?a.default:null;if(i=a[t]?a[t]:i,i){if(!(n.filter((e=>e.name===i.imageName)).length>0))throw new Error(`Can't find pose ${t} in ${e}.`);if(r.frames=i.frames,r.currentFrame=0,r.animation=e,r.pose=t,r.framesImage=i.imageName,i.sfx){let e=getSfx(i.sfx);e&&e.play()}}else r.frames=[],r.currentFrame=0,r.animation="",r.pose="";r.play=!0}},draw:(e,t)=>{e=e||0,t=t||0,o(r.framesImage,r.x+e,r.y+t,r.frames[r.currentFrame])},moveTo:async(e,t,n)=>new Promise((async(i,a)=>{let l=r,o=l.x,c=l.y,m=n,f=0;var s,u;await(s=e,u=t,new Promise(((n,i)=>{let a=()=>{if(f+=m,f>=1)l.x=e,l.y=t,n();else{let e={x:(1-(d=f))*(i={x:o,y:c}).x+d*(r={x:s,y:u}).x,y:(1-d)*i.y+d*r.y};l.x=e.x,l.y=e.y,setTimeout(a,16)}var i,r,d};setTimeout(a,16)}))),i()}))};return r.onComplete=l||(e=>{}),r.update=e=>{let t=c[r.animation][r.pose];t&&r.play&&(r.updateDelta>t.frameDelay?(r.currentFrame++,r.currentFrame>r.frames.length-1&&(t.repeat?(r.currentFrame=0,r.animDuration=m(new Date)-r.animStartTime,r.onComplete(r)):(r.animDuration=m(new Date)-r.animStartTime,r.currentFrame--,r.play=!1,r.onComplete(r)),t.onComplete&&t.onComplete(r)),r.updateDelta=0):r.updateDelta+=e)},r.SetAnimation(e,a),r}function s(e){if((e=e.toLowerCase()).includes("d")){let i=e.split("d"),a=0;for(let e=0;e<i[0];e++)a+=(t=1,n=i[1],Math.floor(Math.random()*(n-t+1)+t));return a}var t,n;throw new Error("At least one term must specify the number of dice.")}var u=[],d=0,h=["positioning","movement","active","siege","upkeep"],p=0;function g(e,t){let n={name:e,color:"#ccccccff",order:s(t)};return u.push(n),u.sort(((e,t)=>t.order-e.order)),n}function y(e){let t=u.filter((t=>t.name===e));return t.length>0?t[0]:null}function w(){return u[d]}function x(){return h[p]}var b=null,S=.3,k=null,v=[],C={x:24,y:8.5*A,w:320/A,h:200/A,targetX:0,targetY:8.5*A};function E(e,t){let n=new I({team:y(e),name:t.name,character:t,spriteName:"player",x:0,y:0});return v.push(n),n}function M(e){return console.log(e,v),e?v.filter((t=>t.team.name===e)):v}function A(){return{x:A,y:A}}const I=class{constructor(e){this.team=e.team,this.name=e.name,this.character=e.character,this.sprite=f(e.spriteName,e.x?e.x:0,e.y?e.y:0,"idle")}Position(){return{x:this.sprite.x,y:this.sprite.y}}MapCoords(){return{x:parseInt(this.sprite.x/A().x),y:parseInt(this.sprite.y/A().y)}}Draw(e){this.sprite.draw(e)}};let D=null,H=null,R="";function O(){if("positioning"===x()){let t=M(w().name);console.log(w()),t.length>0&&(e=t[0].sprite,k=e)}var e}const _=JSON.parse('{"d":{"moveUp":"ArrowUp","moveDown":"ArrowDown","moveLeft":"ArrowLeft","moveRight":"ArrowRight","attack":" ","select":"Shift","cancel":"Escape"},"v":{"moveUp":"button12","moveDown":"button13","moveLeft":"button14","moveRight":"button15","attack":"button0","select":"button7","cancel":"button1"}}');var q=!1;function T(e){P(e,!1),$[e]&&$[e](e)}var N={},$={},G=["keyboard","gamepad"];function P(e,t){N[e]=t}function B(e){if(!q)return;let t=Object.keys(_.d);for(let n in t)e.key===_.d[t[n]]&&P(t[n],!0)}function F(e){if(!q)return;let t=Object.keys(_.d);for(let n in t)e.key===_.d[t[n]]&&T(t[n])}N={},$={},G.includes("keyboard")&&(window.removeEventListener("keydown",B),window.removeEventListener("keyup",F),window.addEventListener("keydown",B),window.addEventListener("keyup",F)),G.includes("gamepad")&&gameControl.on("connect",(function(e){let t=Object.keys(_.v);for(let n in t)e.on(_.v[t[n]],(()=>{})).after(_.v[t[n]],(()=>{T(t[n])}))})),q=!1;const L={listen:()=>{q=!0},unlisten:()=>{q=!1},released:(e,t)=>{$[e]=t}},U=JSON.parse('[{"name":"Overseer","Cost":4,"equipAbilities":6,"gunnerySkill":5,"meleeSkill":5,"speed":4,"hp":22},{"name":"Trooper","Cost":1,"equipAbilities":4,"gunnerySkill":5,"meleeSkill":6,"speed":4,"hp":16},{"name":"Artillerist","Cost":3,"equipAbilities":5,"gunnerySkill":4,"meleeSkill":7,"speed":3,"hp":18},{"name":"Recon","Cost":2,"equipAbilities":5,"gunnerySkill":8,"meleeSkill":4,"speed":6,"hp":16},{"name":"Technician","Cost":2,"equipAbilities":7,"gunnerySkill":7,"meleeSkill":8,"speed":3,"hp":14},{"name":"Medic","Cost":4,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":7,"speed":4,"hp":20},{"name":"Herald","Cost":3,"equipAbilities":8,"gunnerySkill":8,"meleeSkill":6,"speed":4,"hp":14},{"name":"Crusader","Cost":5,"equipAbilities":7,"gunnerySkill":6,"meleeSkill":5,"speed":5,"hp":25},{"name":"Bastion","Cost":3,"equipAbilities":5,"gunnerySkill":6,"meleeSkill":4,"speed":3,"hp":28}]');class j{constructor(e){try{this.data=U.filter((t=>t.name===e))[0],this.data.maxHp=this.data.hp,this.name=this.data.name,this.equipment=[]}catch{this.data={},console.error(`Could not locate template for ${e}.`)}this.effectModifiers={},this.effects=[]}UpdateEffects(){for(let e in this.effects){let t=this.effects[e];t.ttl&&t.ttl--,t.ttl<=0&&this.RemoveEffectModifier(t)}this.effects=this.effects.filter((e=>e.ttl>0))}AddEffect(e){e.ttl&&this.effects.push(e),void 0!==e.attribute&&this.AddEffectModifier(e.attribute,e.amount)}RemoveEffectModifier(e){void 0!==e.attribute&&this.AddEffect(e.attribute,-1*e.amount)}AddEffectModifier(e,t){void 0===this.effectModifiers[e]&&(this.effectModifiers[e]=0),this.effectModifiers[e]+=t}EffectModifier(e){return void 0!==this.effectModifiers[e]?this.effectModifiers[e]:0}Name(){return this.data.name}Cost(){return this.data.Cost+this.EffectModifier("cost")}EquipmentAndAbilities(e){return void 0!==e&&(this.data.equipAbilities=e),this.data.equipAbilities+this.EffectModifier("equipAbilities")}GunnerySkill(){return this.data.gunnerySkill+this.EffectModifier("gunnerySkill")}MeleeSkill(){return this.data.meleeSkill+this.EffectModifier("meleeSkill")}Speed(){return this.data.speed+this.EffectModifier("speed")}Hp(){return this.data.hp+this.EffectModifier("hp")}MaxHp(){return this.data.maxHp+this.EffectModifier("maxHp")}}const z=JSON.parse('[{"id":"Main","Style":{"Color":"#c1c1c1ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Start","onSelect":"menu_GameSetup","width":"90%"},{"text":"Settings","onSelect":"menu_Settings","width":"90%"},{"text":"Credits","onSelect":"menu_Credits","width":"90%"}]},{"id":"GameSetup","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Options":[{"text":"Overseer (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Trooper (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Artillerist (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Recon (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Technician (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Medic (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Herald (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Crusader (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"},{"text":"Bastion (x{0})","onRender":"callback_OnRenderCharacter","onSelect":"callback_HireCharacter","width":"90%"}]},{"id":"SetupEquipment","Style":{"Color":"#a0a0a0ff","SelectColor":"#f1f1f1ff","SelectableColor":"#ccccccff","Disabled":"#4a4a4aff"},"Columns":2,"Options":[{"text":"Next","onSelect":"callback_StartGame","width":160,"column":0}]},{"id":"Settings","onLoad":"callback_StartSettings","Options":[{"text":"Input Type","width":"90%"}]}]');var J=[],Y=16;let W=z.filter((e=>"GameSetup"===e.id))[0];function X(e){let t=new j(e);Y-t.Cost()>=0&&(J.push(t),Y-=t.Cost())}function K(e){let t=new j(e),n=J.findIndex((t=>t.name===e));n>-1&&(Y+=t.Cost(),J=J.filter(((e,t)=>t!==n)))}function Q(e){let t={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:r("ui-frame-teal"),imageDown:r("ui-frame-teal"),imageHover:r("ui-frame-teal")},n={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:r("ui-button-teal"),imageDown:r("ui-button-teal-down"),imageHover:r("ui-button-teal")},i={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:r("ui-button-grey"),imageDown:r("ui-button-grey-down"),imageHover:r("ui-button-grey")},a={type:"Element",color:"#cacacaff",highlight:"#cacacaff",bgcolor:"#00000000"},l=e.Element({id:"frameMenu",rect:{x:5,y:28,w:128,h:160},...t,anim:{curve:"bezier",duration:100,params:{y:-64},onComplete:e=>{}}}),o=e.Element({id:"frameStats",rect:{x:135,y:28,w:128,h:110},...t,anim:{curve:"bezier",duration:100,params:{x:260},onComplete:e=>{}}}),c=e.Element({id:"frameButtons",rect:{x:135,y:156,w:128,h:32},...t,anim:{curve:"bezier",duration:100,params:{y:190},onComplete:e=>{}}}),m=0===J.length?"Hire your squad and click next\nto continue.":`Squad Size: ${J.length}`+(0===Y?"\nNo stars remaining.\nClick 'Next'.":"");if(!l.anim){e.Element({id:"lblMenuStars",text:`${Y}`,rect:{x:98,y:10,w:64,h:11},...a},l),e.Element({id:"imgStars",type:"Image",x:108,y:8,image:r("star-icon")},l);let t=19;for(let n in W.Options){let r=W.Options[n].text,o=r.split(" ")[0],c=U.filter((e=>e.name===o))[0];r=r.replace("{0}",J.filter((e=>e.name===o)).length);let f=e.Element({id:"lblMenu"+n,text:r,rect:{x:16,y:t+2,w:76,h:14},...a},l),s=e.Element({id:"lblMenuAdd"+n,text:"+",rect:{x:94,y:t,w:14,h:14},...i},l);s.Clicked()&&X(o);let u=e.Element({id:"lblMenuRem"+n,text:"-",rect:{x:109,y:t,w:14,h:14},...i},l);u.Clicked()&&K(o),(f.Hover()||s.Hover()||u.Hover())&&(m=[`${o}`,`Cost: ${c.Cost}`,`Melee Skill: ${c.meleeSkill}`,`Gunnery Skill: ${c.gunnerySkill}`,`Speed: ${c.speed}`,`HP: ${c.speed}`,"Equipment/Abilities",`Points: ${c.equipAbilities}`].join("\n")),t+=15}}if(!c.anim){let t=e.Element({id:"btnNext",text:"Next",rect:{x:72,y:8,w:50,h:16},...n},c);t.Hover()&&(m="Accept squad and move\non to outfitting equipment\nand abilities."),t.Clicked()&&oe("SetupEquipment")}!o.anim&&m.length&&e.Element({id:"lblTooltip",text:m,rect:{x:8,y:8,w:110,h:100},...a},o)}let V=-1;function Z(e){let t={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:r("ui-frame-teal"),imageDown:r("ui-frame-teal"),imageHover:r("ui-frame-teal")},n=(r("ui-button-teal"),r("ui-button-teal-down"),r("ui-button-teal"),r("ui-button-grey"),r("ui-button-grey-down"),r("ui-button-grey"),{type:"Element",color:"#cacacaff",highlight:"#cacacaff",bgcolor:"#00000000"}),i=e.Element({id:"frameMenuSquad",rect:{x:5,y:28,w:128,h:160},...t,anim:{curve:"bezier",duration:100,params:{x:-100},onComplete:e=>{}}});if(!i.anim){let t=9;for(let a in J){let l={...n};l.bgcolor=V===a?"#328464ff":"#00000000",l.color=V===a?"#f1f1f1ff":"#cacacaff",l.highlight=l.color,e.Element({id:"lblCharacter"+a,text:J[a].name,rect:{x:8,y:t+2,w:76,h:9},...l},i).Clicked()&&(V=a),t+=10}}}let ee=null,te=null;var ne=f("background",0,0,"idle"),ie=[],ae={},le="Main",re="Start";function oe(e){le=e,ee.RemoveElements(),"GameSetup"===e&&(ee.onUpdate=Q),"SetupEquipment"===e&&(ee.onUpdate=Z)}var ce=Date.now(),me=Date.now(),fe=16,se="mainMenu",ue={x:0,y:0};function de(e){fe=parseInt(1e3/e)}function he(){let e=(ce=Date.now())-me;e>=fe&&(function(e){"mainMenu"===se?function(e){te||(te=l()),ne.draw(0,0),ne.update(e),function(e){if(!ee){ee=new imui.ImUI(te.canvas),ee.font=font;let e={innerRect:{x:6,y:8,w:53,h:47},type:"ButtonImage",color:"#122020ff",highlight:"#122020ff",bgcolor:"#000000cc",image:r("ui-frame-teal"),imageDown:r("ui-frame-teal"),imageHover:r("ui-frame-teal")},t={innerRect:{x:5,y:4,w:9,h:2},type:"ButtonImage",color:"#122020ff",highlight:"#fa6a0aff",bgcolor:"#000000cc",image:r("ui-button-teal"),imageDown:r("ui-button-teal-down"),imageHover:r("ui-button-teal")};ee.onUpdate=n=>{let i=n.Element({id:"frameMenu",rect:{x:38,y:28,w:97,h:96},...e,anim:{curve:"bezier",duration:100,params:{w:12,h:12},onComplete:e=>{}}});i.anim||n.Element({id:"lblMenu",text:"Start",rect:{x:6,y:10,w:86,h:19},...t},i).Clicked()&&oe("GameSetup")}}ee.Draw()}()}(e):"main"===se&&function(e){H||(H=l()),H.clearRect(0,0,320,200),function(e){let t=l();t.save(),t.translate(-C.x,-C.y),o("mars-scape",0,0);let n=t.globalAlpha;t.globalAlpha=S;let i=b.tiles;for(let e in i)o("grid-white",i[e][0]*A,i[e][1]*A);for(let e in b.teamA)o("grid-yellow",b.teamA[e][0]*A,b.teamA[e][1]*A);for(let e in b.teamB)o("grid-yellow",b.teamB[e][0]*A,b.teamB[e][1]*A);t.globalAlpha=n,k&&(console.log("placingSprite",k),k.x=ue.x,k.y=ue.y,k.draw(e)),t.restore()}(e),D||(D=new imui.ImUI(H.canvas),D.font=font,D.onUpdate=e=>{let t=x().slice(0,1).toUpperCase()+x().slice(1);e.Element({id:"lblPhase",text:`${t}: ${w().name}`,rect:{x:10,y:3,w:300,h:9},color:"#f1f100ff",color:"#f1f100ff",bgcolor:"#000000cc"}),e.Element({id:"lblTooltip",text:R,rect:{x:0,y:0,w:240,h:10},color:"#f1f1f1ff",highlight:"#f1f1f1ff",bgcolor:"#cccccc00"})}),D.Draw()}(e)}(e),me=ce),window.requestAnimationFrame(he)}async function pe(){await function(){let e=[];for(let t in n){let i=n[t];e.push(new Promise(((e,t)=>{return(a=i.filename,new Promise(((e,t)=>{let i=new Image;i.onload=t=>{e(i)},i.onerror=e=>{console.error(`Failed to load file ${a}:`,e),t(null)},n.filter((e=>e.filename===a)).length>0?i.src=a:(console.error(`Image definition matching filename ${a} not found.`),t(null))}))).then((t=>{i.image=t,e(t)})).catch((e=>console.error("Failed to load",i.filename,e)));var a})))}return Promise.allSettled(e)}();let e=document.getElementById("maincanvas"),t=e.width/e.height;e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px",window.addEventListener("resize",(()=>{e.style.height=window.innerHeight+"px",e.style.width=window.innerHeight*t+"px"})),e.addEventListener("mousemove",(t=>{ue.x=parseInt((t.clientX-e.offsetLeft)*(e.width/parseInt(e.style.width)))-2,ue.y=parseInt((t.clientY-e.offsetTop)*(e.height/parseInt(e.style.height)))})),e.addEventListener("contextmenu",(e=>(e.preventDefault(),!1))),de(60),a(e.getContext("2d")),L.listen(),L.released("moveDown",(()=>{GetMenu(le),ie=GetMenuItems(le),ae=ie.filter((e=>e.text===re))[0];let e=ie.findIndex((e=>e.text===re));e++,e>=ie.length&&(e=0),re=ie[e].text})),L.released("moveUp",(()=>{GetMenu(le),ie=GetMenuItems(le),ae=ie.filter((e=>e.text===re))[0];let e=ie.findIndex((e=>e.text===re));e--,e<0&&(e=ie.length-1),re=ie[e].text})),L.released("attack",(()=>{GetMenu(le),ie=GetMenuItems(le);try{(ae=ie.filter((e=>e.text===re))[0]).onSelect&&((e=ae.onSelect).includes("callback_")?menuMethods[e]?menuMethods[e]:()=>{}:(e.includes("menu_")&&oe(e.split("_")[1]),()=>{}))(ae.text)}catch{}var e})),window.requestAnimationFrame(he)}async function ge(e){L.unlisten();let t=document.getElementById("maincanvas");se="main",g("Team Alpha","2d10"),g("Team Bravo","1d1");for(let t in e)E("Team Alpha",e[t]);de(60),a(t.getContext("2d")),O(),window.requestAnimationFrame(he)}return t})()));
//# sourceMappingURL=tactics.js.map