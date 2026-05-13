
import { monsters } from "./data/monsters.js";
import { weapons } from "./data/weapons.js";
import { armors } from "./data/armors.js";
import { skills } from "./data/skills.js";
import { areas } from "./data/areas.js";
import { glyphs } from "./data/glyphs.js";
import { prefixes, suffixes } from "./data/fix.js";
import { enemyPrefixes } from "./data/enemyFix.js";
import { events } from "./data/events.js";
import { states } from "./data/states.js";

import { normalDistribution, random, wait, mergeMods, clamp } from "./utils.js";

let maxHP = 1000
let playerHP;
let maxAP = 5;
let playerAP = maxAP;
let playerBlock = 0;
let gainedBlock = 0;
let DRW = 6;
let isCombat = false;
let coin = 990;

let enemies = {};
let randomEvents = {};
let undiscoveredEvents = {};
for (const area of areas){
  enemies[area.id] = [];
  randomEvents[area.id] = [];
  undiscoveredEvents[area.id] = [];
}

let rewardList = [];
let NPCList = [];

let stateList = [];

let combatEnemy;
let cEnemy = [];
let activeEnemy;

let speakingNPC;

const ctx = new AudioContext();

let sounds = {};
const files = {
  attack: "attack.wav",
  attack2:  "attack2.wav",
  block:  "block.wav",
  block1:  "block1.wav",
  block_break:  "block_break.wav",
  buff:  "buff.wav",
  debuff:  "debuff.wav",
  debuffDamage:  "debuffDamage.wav",
  move:  "move.wav",
  error:  "error.wav",
  critical:  "critical.wav",
  click:  "click.wav",
  draw:  "draw.wav",
  dispose:  "dispose.wav",
  open:  "treasureBox1.wav",
  equip: "equip2.wav",
  coin: "coin.wav",
  blip: "blip.wav",
  turn: "turn.wav",
  turnEnd: "turnEnd.wav",
  damage: "damage.wav",
  enchant: "enchant.wav",
  enter: "enter.wav",
  map: "map.wav",
}

async function loadAll(){
  const entries = await Promise.all(
    Object.entries(files).map(async ([key, url]) => {
      return [key, await loadSound(`sounds/${url}`)];
    })
  );

  return Object.fromEntries(entries);
}

async function loadSound(url){
  const res = await fetch(url);

  const buf = await res.arrayBuffer();
  return await ctx.decodeAudioData(buf);
}

function play(buffer){
  const src = ctx.createBufferSource();
  //src.buffer = sounds.open;
  src.buffer = buffer;
  src.connect(ctx.destination);
  src.start(0);
}

let position = {x:0, y:0};
let deck = [];
let weaponSkills = [];
let drawPile = [];
let disposePile = [];
let hand = [];

let maxCard= 20;


let cReward;


let cell = [];
let spawnableCell = [];

let cWeapon = [{...weapons[0]}];
weaponSkills = [...weapons[0].skills];
let cArmor = {...armors[0]};
let cGlyphs = [];
let weaponPSC = 0;
let weaponFIR = 0;
let weaponICE = 0;
let weaponLTN = 0;
let weaponACD = 0;
let conFIR = 0;
let conICE = 0;
let conLTN = 0;
let conACD = 0;
let magPSC = 0;
let magFIR = 0;
let magICE = 0;
let magLTN = 0;
let magACD = 0;
let PSC_flat = 0;
let FIR_flat = 0;
let ICE_flat = 0;
let LTN_flat = 0;
let ACD_flat = 0;
let PSC = 0;
let FIR = 0;
let ICE = 0;
let LTN = 0;
let ACD = 0;
let stats = [];
let finalStats = {};
let area;
let turn;
let attackCount;

let Ritsu;
let Moh;

let usedSkill;
for (let i = 0; i < 20; i++){
  deck.push(random(skills, 1));
}

const buttons = document.querySelectorAll(".directionButton");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir;
    switch (dir) {
      case "north": goStraight(); break;
      case "west":  goLeft();     break;
      case "east":  goRight();    break;
      case "south": goDown();     break;
    }
  });
  btn.addEventListener("mouseover", () => {buttonMouseOver(btn);});
  btn.addEventListener("mouseout", () => {buttonMouseOut(btn);});
});

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {gameStart();});

const rewardBox = document.getElementById("rewardBox");
rewardBox.addEventListener("click", () => {showReward();});

const NPC = document.getElementById("NPC");
NPC.addEventListener("click", () => {speakNPC();});

const endTurnButton = document.getElementById("endTurnButton");
endTurnButton.addEventListener("click", () => {turnEnd();});

const _drawPile = document.getElementById("drawPile");
_drawPile.addEventListener("click", () => {showDrawPile();});

const cardUICloseButton = document.getElementById("cardUICloseButton");
cardUICloseButton.addEventListener("click", () => {closeDrawPile();});

async function gameStart(){
  await ctx.resume();
  sounds = await loadAll();
  const gamePlay = document.getElementById("gamePlay");
  gamePlay.style.display = "block";
  const startScreen = document.getElementById("startScreen");
  startScreen.style.display = "none";

  drawPile = [...weaponSkills, ...deck];

  const positionText = document.getElementById("position");
  positionText.addEventListener("mouseover", function(){
    positionText.classList.add("glow");
  })
  positionText.addEventListener("mouseout", function(){
    positionText.classList.remove("glow");
  })
  positionText.addEventListener("click", function(){
    mapMemo();
  })

  
  const fade = document.getElementById("fadeScreen");
  fade.style.opacity = "1";
  setTimeout(() => {
    fade.style.opacity = "0";
  }, 1000);
  await wait(600);
  
  areaSetting(areas[0]);
  weaponUpdate();
  characterUpdate();
  armorUpdate();
  update();
}

function areaSetting(_area){
  const from = area;
  area = _area;
  bigText(area.name, 1500);
  play(sounds.enter);
  

  document.documentElement.style.setProperty("--main-bg", area.bColor);
  document.documentElement.style.setProperty("--main-text", area.mColor);
  document.documentElement.style.setProperty("--sub-text", area.sColor);
  document.getElementById("drawPile").textContent = drawPile.length;
  
  playerHP = maxHP;
  drawPile = [...weaponSkills, ...deck];

  document.getElementById("areaName").textContent = area.name;
  



  cell = [];
  spawnableCell = [];
  for(const rec of area.shape){
    for(let i = rec[2]; i <= rec[0]; i++){
      for(let j = rec[3]; j <= rec[1]; j++){
        cell.push([i, j]);
        if(rec[4] == 1){
          spawnableCell.push([i, j]);
        }
      }
    }
  }
  if(randomEvents[area.id].length == 0){
  spawnUniqueEvent();

  for (let i = 0; i <Math.floor(spawnableCell.length * 0.2); i++) {
    spawnEnemy();
  }
  spawnRandomEvent();
  }
  position = from ? {...randomEvents[area.id].find(e => {return(e.type === "Portal" && e.id === from.id)}).position} : {x: 0, y: 0};
  move();

}


function update() {

  if(playerHP > finalStats.HP){
    playerHP = finalStats.HP;
  }
  
  document.getElementById("playerInfo").innerText =
    `${playerHP} / ${finalStats.HP}`;  
  document.getElementById("playerInfo2").innerText =
    `Coin: ${coin}`;

  
  let percent1 = (playerHP / finalStats.HP) * 100;
  document.getElementById("playerHPBar").style.width = percent1 + "%";
  let block = cArmor.DEF;

  document.getElementById("actionPoint").innerText =
    "▮".repeat(playerAP) + "▯".repeat(finalStats.AP - playerAP);

    if(playerAP == 0){
      document.getElementById("endTurnButton").classList.add("glow");
    }
    else{
      document.getElementById("endTurnButton").classList.remove("glow");
    }
    
  
  if(gainedBlock > 0){
    if(isCombat) document.getElementById("playerBlockValue").innerText =`${gainedBlock}`;
    const border = document.getElementById("playerHPBarBorder");
    border.classList.add("guard");
    border.style.setProperty("--guard-width",`${Math.min(50, gainedBlock / maxHP * 50) + 20}%`);
  }
  else {
    if(isCombat) document.getElementById("playerBlockValue").innerText =``;
    document.getElementById("playerHPBarBorder").classList.remove("guard");
  }
    
  const buffList = document.getElementById("buffList");
  buffList.innerHTML = "";
  const debuffList = document.getElementById("debuffList");
  debuffList.innerHTML = "";

  for(let state of stateList){
    const stateUIChild = document.createElement("div");
    stateUIChild.innerHTML = `${state.value??""}${state.sign}<sup>${state.TRN != Infinity ? state.TRN : ""}</sup>`;
    stateUIChild.classList.add("statusInfo");
    stateUIChild.addEventListener("mouseover", function(event){
      showTooltip(
        `${state.name}
        ${colorizeText(state.description)}`,
        event
      );
    })
    stateUIChild.addEventListener("mousemove", function(event){
      moveTooltip(event);
    })
    stateUIChild.addEventListener("mouseout", function(){
      hideTooltip();
    })
    if(
  state.type == "buff" || state.type == "chargeBuff"){buffList.appendChild(stateUIChild);}
    else{debuffList.appendChild(stateUIChild);}

  }
  if(cEnemy.content)
  for(let i = 0; i < cEnemy.content.length; i++){
    const enemy = cEnemy.content[i];

    document.getElementsByClassName("enemyInfo")[i].innerHTML = `${enemy.cHP} / ${enemy.HP}`;
    if(enemy.block != 0){
      document.getElementsByClassName("enemyBlockValue")[i].innerText =`${enemy.block}`;
      const border = document.getElementsByClassName("enemyHPBarBorder")[i];
      border.classList.add("guard");
      border.style.setProperty("--guard-width",`${Math.min(50, enemy.block / enemy.HP * 50)+20}%`);
    }
    else{
      document.getElementsByClassName("enemyBlockValue")[i].innerText =``;
      document.getElementsByClassName("enemyHPBarBorder")[i].classList.remove("guard");
    }
    if(activeEnemy === enemy){
      document.getElementsByClassName("enemyName")[i].classList.add("targeted");
    }
    else{
      document.getElementsByClassName("enemyName")[i].classList.remove("targeted");
    }
    let percent2 = (enemy.cHP / enemy.HP) * 100;
    document.getElementsByClassName("enemyHPBar")[i].style.width = percent2 + "%";

    

    const enemyState = document.getElementsByClassName("enemyState")[i];
    enemyState.innerHTML = "";
    
    enemy.stats = mergeMods(...enemy.stateList.map(state => state.mods), enemy.mods);
    enemy.finalStats = {
      ATK: Math.floor(enemy.ATK * (100 + getEnemyStats(enemy, "magATK"))/ 100),
      DEF: Math.floor(enemy.DEF * (100 + getEnemyStats(enemy, "magDEF"))/ 100),
      SPD: Math.floor(enemy.SPD * (100 + getEnemyStats(enemy, "magSPD"))/ 100),
      ACC: Math.floor(enemy.ACC * (100 + getEnemyStats(enemy, "magACC"))/ 100),

      ELE: getEnemyStats(enemy, "ELE"),
    }
    for(let state of enemy.stateList){
      const debuffUI = document.createElement("div");
      debuffUI.innerHTML = `${state.value??""}${state.sign}<sup>${state.TRN != Infinity ? state.TRN : ""}</sup>`;
      debuffUI.classList.add("statusInfo");
      enemyState.appendChild(debuffUI);
      debuffUI.addEventListener("mouseover", function(event){
        showTooltip(
          `${state.name}
          ${colorizeText(state.description)}`,
          event
        );
      })
      debuffUI.addEventListener("mousemove", function(event){
        moveTooltip(event);
      })
      debuffUI.addEventListener("mouseout", function(){
        hideTooltip();
      })
    }
  }
}

function showTooltip(text, event) {
  const tip = document.getElementById("tooltip");

  tip.innerHTML = text;
  tip.style.display = "block";
  let left = event.clientX;
  let top  = event.clientY;

  requestAnimationFrame(() => {
    let left = event.clientX;
    let top = event.clientY;
    const margin = 10;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    if (top + h > window.innerHeight - margin) {
      top = window.innerHeight - h - margin;
    }
    if (left + w > window.innerWidth - margin) {
      left = window.innerWidth - w - margin;
    }
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  });
}
function moveTooltip(event){
  const tip = document.getElementById("tooltip");
  let left = event.clientX;
  let top  = event.clientY;

  requestAnimationFrame(() => {
    let left = event.clientX;
    let top = event.clientY;
    const margin = 10;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    if (top + h > window.innerHeight - margin) {
      top = window.innerHeight - h - margin;
    }
    if (left + w > window.innerWidth - margin) {
      left = window.innerWidth - w - margin;
    }
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  });
}
function hideTooltip(){
  document.getElementById("tooltip").style.display = "none";
}

function log(text) {
  const logElement = document.getElementById("log");
  logElement.innerText = text + "\n" + logElement.innerText;
}

function goStraight(){
  log("Moved north");
  position.y += 1;
  move();
}
function goLeft(){
  log("Moved west");
  position.x -= 1;
  move();
}
function goRight(){
  log("Moved east");
  position.x += 1;
  move();
}
function goDown(){
  log("Moved south");
  position.y -= 1;
  move();
}
function move(){
  play(sounds.move);
  document.getElementById("position").innerHTML = `(${position.x},${position.y})`;
  const rewBox = document.getElementById("rewardBox");
  rewBox.style.display = "none";
  if(cReward){
  cReward.style.display = "none";
  cReward = null;
  }
  if(speakingNPC){
  speakingNPC.style.display = "none";
  speakingNPC = null;
  }
  const EventUI = document.getElementsByClassName("eventUI");
  for(let eventUI of EventUI){
    eventUI.style.display = "none";
    eventUI.remove();
  }
  hideTooltip();
  const NPC = document.getElementById("NPC");
  NPC.style.display = "none";
  const reward_ = rewardList.find(r => {return (r.position.x == position.x && r.position.y == position.y)})
  if (reward_){
    showTreasureBox(reward_);
  }
  if(isOccupiedEnemy(position.x,position.y)){
    const enemy = enemies[area.id].find(e => {return (e.position.x == position.x && e.position.y == position.y)});
    battle(enemy.kind);
    combatEnemy = enemies[area.id].indexOf(enemy);
  }
  else if(isOccupiedEvent(position.x,position.y)){
    const event = randomEvents[area.id].find(e => {return (e.position.x == position.x && e.position.y == position.y)});
    encounterEvent(event);
  }

  const up = document.getElementsByClassName("direction")[0];
  const right = document.getElementsByClassName("direction")[1];
  const down = document.getElementsByClassName("direction")[2];
  const left = document.getElementsByClassName("direction")[3];

  const upButton = document.getElementsByClassName("directionButton")[0];
  const rightButton = document.getElementsByClassName("directionButton")[1];
  const downButton = document.getElementsByClassName("directionButton")[2];
  const leftButton = document.getElementsByClassName("directionButton")[3];

  upButton.style.display = canMove(position.x, position.y + 1) ? "block" : "none";
  rightButton.style.display = canMove(position.x + 1, position.y) ? "block" : "none";
  downButton.style.display = canMove(position.x, position.y - 1) ? "block" : "none";
  leftButton.style.display = canMove(position.x - 1, position.y) ? "block" : "none";

  if(isOccupiedEnemy(position.x,position.y + 1)){
    up.textContent = "!";
    up.classList.add("glow");
  }
  else if(isOccupiedEvent(position.x,position.y + 1)){
    up.textContent = "?";
    up.classList.add("glow");
  }
  else{
    up.textContent = "";
    up.classList.remove("glow");
  }
  if(isOccupiedEnemy(position.x - 1,position.y)){
    left.textContent = "!";
    left.classList.add("glow");
  }
  else if(isOccupiedEvent(position.x - 1,position.y)){
    left.textContent = "?";
    left.classList.add("glow");
  }
  else{
    left.textContent = "";
    left.classList.remove("glow");
  }
  if(isOccupiedEnemy(position.x + 1,position.y)){
    right.textContent = "!";
    right.classList.add("glow");
  }
  else if(isOccupiedEvent(position.x + 1,position.y)){
    right.textContent = "?";
    right.classList.add("glow");
  }
  else{
    right.textContent = "";
    right.classList.remove("glow");
  }
  if(isOccupiedEnemy(position.x, position.y - 1)){
  down.textContent = "!";
  down.classList.add("glow");
  }
  else if(isOccupiedEvent(position.x,position.y - 1)){
  down.textContent = "?";
  down.classList.add("glow");
  }
  else{
  down.textContent = "";
  down.classList.remove("glow");
  }
}

function canMove(x, y){
  return cell.some(a => a[0] === x && a[1] === y);
}


function spawnUniqueEvent(){
  for(const portal of area.connection){
    const p = {
      type: "Portal",
      id: portal.id,
      position: portal.position !== "random" ? portal.position : getRandomSpawnPosition(),
      mapPROB: portal.mapPROB,
    };
    randomEvents[area.id].push(p);
    undiscoveredEvents[area.id].push(p);
  }
  for(const boss of area.boss){
    const b = {
      type: "Boss",
      id: boss.id,
      position: boss.position !== "random" ? boss.position : getRandomSpawnPosition(),
      mapPROB: boss.mapPROB,
    };
    randomEvents[area.id].push(b);
    undiscoveredEvents[area.id].push(b);
  }
}
function spawnEnemy(){
  const enemy = {
    kind: random(monsters[area.id]),
    position: getRandomSpawnPosition(),
  };
  enemies[area.id].push(enemy);
}

function spawnRandomEvent(){
  for (let i = 0; i < events.length; i++){
    const event = events[i];
    const n = Math.floor(spawnableCell.length * event.density / 100);
    if(n < event.min) n = event.min;
    if(n > event.max) n = event.max;
    for (let j = 0; j < n; j++){
      const randomEvent = {
        type: event.type,
        name: event.name,
        position: getRandomSpawnPosition(),
        mapPROB: event.mapPROB,
      }
      randomEvents[area.id].push(randomEvent);
      undiscoveredEvents[area.id].push(randomEvent);
    }
  }
}
function getRandomSpawnPosition(){
  let x,y;
  do{
    const i = Math.floor(Math.random() * spawnableCell.length)
    x = spawnableCell[i][0];
    y = spawnableCell[i][1];
  }while((x === 0 && y === 0) || isOccupiedEnemy(x, y) || isOccupiedEvent(x, y));
  return({x: x, y: y});
}

function isOccupiedEnemy(x, y){
  return enemies[area.id].some(e => e.position.x === x && e.position.y === y) 
}
function isOccupiedEvent(x, y){
  return randomEvents[area.id].some(e => e.position.x === x && e.position.y === y) 
}

function battle(kind) {
  isCombat = true;
  turn = 0;
  attackCount = 0;
  drawPile = [...weaponSkills, ...deck];
  cEnemy = {Tier: kind.Tier, content:[], COIN: kind.COIN, REW: kind.REW};

  const enemyContent = kind.content;
  for (let enemy of enemyContent){
    const enemyData = structuredClone(enemy);
    enemyData.block = 0;
    enemyData.mods = {};
    enemyData.stateList = [];
    enemyData.stats = {};
    enemyData.finalStats = {};
    cEnemy.content.push(enemyData);
  }
  
  document.getElementById("positionUI").style.display = "none";
  const enemyArea = document.getElementById("enemyArea");
  for(let enemy of cEnemy.content){
    const pre = random([...enemyPrefixes[0], ...(enemyPrefixes[area.id] ?? [])], );
    enemy.name = `${pre.name} ${enemy.name}`;
    enemy.mods = mergeMods(pre.mods);
    enemy.stats = enemy.mods;
    enemy.finalStats = {
      ATK: Math.floor(enemy.ATK * (100 + getEnemyStats(enemy, "magATK"))/ 100),
      DEF: Math.floor(enemy.DEF * (100 + getEnemyStats(enemy, "magDEF"))/ 100),
      SPD: Math.floor(enemy.SPD * (100 + getEnemyStats(enemy, "magSPD"))/ 100),
      ACC: Math.floor(enemy.ACC * (100 + getEnemyStats(enemy, "maACC"))/ 100),
      HP: Math.floor(enemy.HP * (100 + getEnemyStats(enemy, "magHP"))/ 100),
      FIR: getEnemyStats(enemy, "FIR"),
      ICE: getEnemyStats(enemy, "ICE"),
      LTN: getEnemyStats(enemy, "LTN"),
      ACD: getEnemyStats(enemy, "ACD")
    }
    enemy.ATK = enemy.finalStats.ATK;
    enemy.DEF = enemy.finalStats.DEF;
    enemy.SPD = enemy.finalStats.SPD;
    enemy.HP = enemy.finalStats.HP;
    enemy.cHP = enemy.HP;
    enemy.finalStats.FIR && enemy.pattern.forEach(p => {if(p.some(e => e.type == "Attack")) p.push({type:"Debuff", name:"Burn", TRN:1, value:enemy.finalStats.FIR});})
    enemy.finalStats.ICE && enemy.pattern.forEach(p => {if(p.some(e => e.type == "Attack")) p.push({type:"Debuff", name:"Chill", TRN:3, value:enemy.finalStats.ICE});})
    enemy.finalStats.LTN && enemy.pattern.forEach(p => {if(p.some(e => e.type == "Attack")) p.push({type:"Debuff", name:"Electrify", TRN:Infinity, value:enemy.finalStats.LTN});})
    enemy.finalStats.ACD && enemy.pattern.forEach(p => {if(p.some(e => e.type == "Attack")) p.push({type:"Debuff", name:"Poison", TRN:3, value:enemy.finalStats.ACD});})
    cEnemy.REW[0] = cEnemy.REW[0] * (100 + getEnemyStats(enemy, "magCOIN"))/ 100;

    const enemyStatus = document.createElement("div");
    enemyStatus.className = "enemyStatus";
    const enemyHPBarBorder = document.createElement("div");
    enemyHPBarBorder.className = "enemyHPBarBorder";
    const enemyBlockValue = document.createElement("div");
    enemyBlockValue.className = "enemyBlockValue";
    const enemyHPBar = document.createElement("div");
    enemyHPBar.className = "enemyHPBar";
    const enemyName = document.createElement("div");
    enemyName.className = "enemyName";
    const enemyInfo = document.createElement("div");
    enemyInfo.className = "enemyInfo";
    const enemyAction = document.createElement("div");
    enemyAction.className = "enemyAction";
    const enemyState = document.createElement("div");
    enemyState.className = "enemyState";
    enemyHPBarBorder.appendChild(enemyHPBar);
    enemyHPBarBorder.appendChild(enemyBlockValue);
    enemyStatus.appendChild(enemyName);
    enemyStatus.appendChild(enemyInfo);
    enemyStatus.appendChild(enemyHPBarBorder);
    enemyStatus.appendChild(enemyAction);
    enemyStatus.appendChild(enemyState);
    enemyArea.appendChild(enemyStatus);
    enemyName.innerHTML = `${enemy.name}`;

    enemyName.addEventListener("click", function(){
      activeEnemy = enemy;
      update();
      characterReInfo();
    })
    enemyName.addEventListener("mouseover", function(event){
      enemyName.classList.add("glow");
      const enemyInfo = 
      `${enemy.name}
      ATK: ${enemy.finalStats.ATK}
      DEF: ${enemy.finalStats.DEF}
      SPD: ${enemy.finalStats.SPD}`;
      showTooltip(enemyInfo,event);
    })
    enemyName.addEventListener("mousemove", function(event){
      moveTooltip(event);
    })
    enemyName.addEventListener("mouseout", function(){
      enemyName.classList.remove("glow");
      hideTooltip();
    })
    enemyStatus.style.maxWidth = enemy.HP + "px";
    if(enemy.HP <= enemyStatus.offsetWidth){
      enemyStatus.style.width = enemy.HP + "px";;
    }

  }
  activeEnemy = cEnemy.content[0];
  // if(cEnemy.HP <= 700){
  // document.getElementById("enemyHPBarBorder").style.width = `${cEnemy.HP}px`;
  // }
  // else{
  //   document.getElementById("enemyHPBarBorder").style.width = `700px`;
  // }

  const battleUi = document.getElementsByClassName("battleUI");
  for(let i = 0; i < battleUi.length; i++){
    battleUi[i].style.display = "block";
  }
  const notBattleUi = document.getElementsByClassName("notBattleUI");
  for(let i = 0; i < notBattleUi.length; i++){
    notBattleUi[i].style.display = "none";
  }
  playerTurn();
  update();

  characterReInfo();
}

function createCard(skill){
  const card = document.createElement("div");
    const cardName = document.createElement("div");
    const cardDescription = document.createElement("div");
    const cardCost = document.createElement("div");
    card.className = "card";
    cardName.className = "cardName";
    cardDescription.className = "cardDescription";
    cardCost.className = "cardCost";
    skill.PROB ? card.classList.add("cardDeco1") : card.classList.add("cardDeco2");

    cardName.textContent = `${skill.name}`;
    cardDescription.innerHTML = `${colorizeText(skill.description)}`;
    cardCost.textContent = `${skill.AP}`;

    card.appendChild(cardDescription);
    card.appendChild(cardName);
    card.appendChild(cardCost);
    return(card);
}
function drawCards(n){
  if(!isCombat) return;
  hand = [];
  document.getElementById("drawPile").textContent = drawPile.length;
  const board = document.getElementById("cardWrap");
  for (let i = 0; i < n; i++){
    
    if(drawPile.length == 0){
      drawPile = [...weaponSkills, ...deck];
    }
    const x = Math.floor(Math.random() * drawPile.length);

    hand.push(drawPile[x]);
    drawPile.splice(x, 1);

  }
  for (let i = 0; i < n; i++){
    const skill = hand[i];
    const card = createCard(skill);
    card.style.pointerEvents = "none";
    card.style.animationDelay = `${i * 0.15}s`;
    board.appendChild(card);
    card.classList.add("draw");
    
    const drawPileCardNum = document.getElementById("drawPile");

    card.addEventListener("animationstart", (e)=>{
      if (e.animationName === "draw"){
        if(Number(drawPileCardNum.textContent) != 0){
          drawPileCardNum.textContent = Number(drawPileCardNum.textContent) - 1;
        }
        else{
          drawPileCardNum.textContent = deck.length - 1;
        }

      }
    });
    card.addEventListener("animationstart", (e)=>{
      if (e.animationName === "draw"){
        play(sounds.draw);
      }
      if (e.animationName === "dispose"){
        play(sounds.dispose);
      }
    });
    card.addEventListener("animationend", (e)=>{
      if (e.animationName === "draw"){
        card.classList.remove("draw");
        card.style.animationDelay = "0s";
        card.style.pointerEvents = "auto";
      }
      else if(e.animationName === "dispose" || e.animationName === "fly"){
        card.remove();
      }
    });
    card.addEventListener("click", function (){
      if(isCombat){
        usedSkill = skill;
        useSkill(card);
        play(sounds.click);
      }
    }) 
    card.addEventListener("mouseover", function (event) {
    skillTooltip(skill, event);
    if(isCombat){
    card.classList.add("mouseOver");
    if(playerAP >= skill.AP){
      const normal = "▮".repeat(playerAP - skill.AP);
      const glow   = "▮".repeat(skill.AP);
      const empty  = "▯".repeat(finalStats.AP - playerAP);
      document.getElementById("actionPoint").innerHTML =
      normal +
      `<span class="glow">${glow}</span>` +
      empty;
      }
    }
    });
    card.addEventListener("mousemove", function (event){
      moveTooltip(event);
    });
    card.addEventListener("mouseout", function (event){
      hideTooltip();
      card.classList.remove("mouseOver");
      if(isCombat){
      document.getElementById("actionPoint").innerHTML =  "▮".repeat(playerAP) + "▯".repeat(finalStats.AP - playerAP);
      }
    })
  }
}


function showDrawPile(){
  const cardsUI = document.getElementById("cardsUI");
  const cardsUIName = document.getElementById("cardsUIName");
  const cardsUIContent = document.getElementById("cardsUIContent");
  cardsUI.style.display = "flex";
  cardsUIName.textContent = "Draw Pile";
  for (let skill of [...drawPile]){
    const card = createCard(skill);
    card.style.marginRight = "0";
    cardsUIContent.appendChild(card);
  }
}

function closeDrawPile(){
  const cardsUI = document.getElementById("cardsUI");
  const cardsUIContent = document.getElementById("cardsUIContent");
  cardsUIContent.innerHTML = ``;
  cardsUI.style.display = "none";
  play(sounds.blip);
}

function showDeck(rew, newSkill, btn){
  const cardsUI = document.getElementById("cardsUI");
  const cardsUIName = document.getElementById("cardsUIName");
  const cardsUIContent = document.getElementById("cardsUIContent");
  cardsUI.style.display = "flex";
  cardsUIName.textContent = "Chose a Card to replace";
  for (let skill of deck){
    const card = createCard(skill);
    card.style.marginRight = "0";
    cardsUIContent.appendChild(card);

    card.addEventListener("click", function(){
      deck.splice(deck.indexOf(skill),1);
      pickUpSkill(rew, newSkill, btn);
      dropSkill(rew,skill);
      closeDeck();
    })

    card.addEventListener("mouseover", function (event){
      card.classList.add("mouseOver2");
      card.classList.add("active")
    })
    card.addEventListener("mouseout", function (event){
      card.classList.remove("mouseOver2");
      card.classList.remove("active");
  })
   
  }
}

function closeDeck(){
  const cardsUI = document.getElementById("cardsUI");
  const cardsUIContent = document.getElementById("cardsUIContent");
  cardsUIContent.innerHTML = ``;
  cardsUI.style.display = "none";
  play(sounds.blip);
}

function checkCardCost(){
  const cardCosts = document.getElementsByClassName("cardCost");
  for (let cardCost of cardCosts){
    if(Number(cardCost.textContent) <= playerAP){
      cardCost.classList.add("active");
      cardCost.parentElement.classList.add("active");
    }
    else{
      cardCost.classList.remove("active");
      cardCost.parentElement.classList.remove("active");
    }
  }
}


function getStats(key){
  return stats[key] || 0;
}
function getEnemyStats(enemy, key){
  return enemy.stats[key] || 0;
}
function calcDamage(ATK){
  let damage = 0;
  let sum_con = getStats("conFIR") + getStats("conICE") + getStats("conLTN") + getStats("conACD");
  if(sum_con < 100){
    sum_con = 100;
  }
  FIR_flat = ATK * (getStats("conFIR") / sum_con);
  ICE_flat = ATK * (getStats("conICE") / sum_con);
  LTN_flat = ATK * (getStats("conLTN") / sum_con);
  ACD_flat = ATK * (getStats("conACD") / sum_con);
  PSC_flat = ATK - (FIR_flat + ICE_flat + LTN_flat + ACD_flat);

  magPSC = 100 + getStats("magPSC");
  magFIR = 100 + getStats("magFIR");
  magICE = 100 + getStats("magICE");
  magLTN = 100 + getStats("magLTN");
  magACD = 100 + getStats("magACD");

  PSC = Math.floor(PSC_flat * magPSC / 100)
  FIR = Math.floor(FIR_flat * magFIR / 100)
  ICE = Math.floor(ICE_flat * magICE / 100)
  LTN = Math.floor(LTN_flat * magLTN / 100)
  ACD = Math.floor(ACD_flat * magACD / 100)
  damage = PSC + FIR + ICE + LTN + ACD;

  return (damage);
}




function useSkill(card) {
  if (playerAP < usedSkill.AP) {
    log("Not enough AP");
    play(sounds.error);
    return;
  }
  playerAP -= usedSkill.AP;
  checkCardCost()

  

  playCardAnimation(card);
  

  for(let effect of usedSkill.effects){
    const type = effect.type;
    setTimeout(() => {
    if(!isCombat) return;
    switch(type){
      case("attack"):
        if(effect.target == "all"){
          const defActiveEnemy = activeEnemy;
          for(let enemy of cEnemy.content)
            {
              activeEnemy = enemy;
              attack(effect, card);
            }
            activeEnemy = defActiveEnemy;
        }
        else{
          attack(effect, card)
        }

      break;
      case("block"):
        block(effect, card);
      break;
      case("buff"):
        buff(effect);
      break;
      case("debuff"):
        debuff(effect);
      break;
      case("draw"):
        draw(effect, card);
      break;
    }
    }, 400);
  }
    
}
async function attack(effect, card) {
  for (let i = 1; i <= (effect.CHN || 1) ; i++)
  { 
    attackCount ++;
    if((attackCount + 1) % 3 == 0 && Ritsu){
      finalStats.CRT = 100;
      characterReInfo()
    }
    
    const p = clamp(finalStats.ACC / (finalStats.ACC + activeEnemy.finalStats.SPD), 0.15, 0.95);

    if(Math.random() <= p){
      
    let modATK = (cWeapon[0].ATK * (100 + getStats("magATK")) / 100 * normalDistribution(10));
    modATK = modATK * (100 + activeEnemy.finalStats.ELE) / 100 * effect.mag / 100;
    activeEnemy.stateList = activeEnemy.stateList.filter(s => {return (s.type != "chargeDebuff" || s.trigger != "hit");});
    stateList = stateList.filter(s => {return (s.type != "chargeBuff" || s.trigger != "attack" );});
    if(Math.random() <= (finalStats.CRT / 100))
    {
      modATK = (modATK * (100 + finalStats.CRD) / 100);
      play(sounds.click);
    }
    if(Math.random() <= (finalStats.STN / 100))
    {
      addState("Stun",1,1,activeEnemy.stateList);
    }
    let damage = calcDamage(modATK);

    if(Math.random() <= (finalStats.BLE / 100))
    {
      addState("Bleeding",modATK,3,activeEnemy.stateList);
    }
    if(FIR != 0){
      addState("Burn",FIR,1,activeEnemy.stateList);
    }
    if(ICE != 0){
      addState("Chill",ICE,3,activeEnemy.stateList);
    }
    if(LTN != 0){
      addState("Electrify",LTN,Infinity,activeEnemy.stateList);
    }
    if(ACD != 0){
      addState("Poison",ACD,3,activeEnemy.stateList);
    }

    if(activeEnemy.block >= damage){
    activeEnemy.block -= damage;
    play(sounds.block1);
    log("You dealt 0 damage");
    }
    else{
    activeEnemy.cHP -= (damage - activeEnemy.block);
    play(sounds.damage);
    if(activeEnemy.block != 0) play(sounds.block_break);
    log("You dealt " + (damage - activeEnemy.block) + " damage");
    activeEnemy.block = 0;
    }
    
    shake();
    play(sounds.attack);
    }
    else{
    log("Your attack missed");
    play(sounds.attack2);
    }
  await wait(200);
    update();
    characterUpdate();
  }
  checkGame();
  
}

function block(effect, card) {
  gainedBlock += playerBlock * effect.mag/100;
  play(sounds.block);
  update();
}

function buff(effect) {
  addState(effect.name, effect.value, effect.TRN, stateList)
  play(sounds.buff);
  weaponUpdate();
  characterUpdate();
  update();
}

function debuff(effect) {
  addState(effect.name, effect.value, effect.TRN, activeEnemy.stateList)
  play(sounds.debuff);
  characterUpdate();
  update();
}

function draw(effect, card){
  drawCards(effect.value);
  checkCardCost();
  update();
}





function playCardAnimation(card){
  const center = document.getElementById("center-area");
  const cardPlay = document.getElementById("cardPlay");
  card.style.animationDelay = `0s`;

  const rect = card.getBoundingClientRect();
  const wrapper = document.createElement("div");
  wrapper.className = "cardWrapperForTransition";

  wrapper.style.left = rect.left + "px";
  wrapper.style.top  = rect.top  + "px";
  wrapper.style.width  = rect.width + "px";
  wrapper.style.height = rect.height + "px";

  card.parentNode.insertBefore(wrapper, card);
  wrapper.appendChild(card);
  document.body.appendChild(wrapper);

  requestAnimationFrame(()=>{

    const target = cardPlay.getBoundingClientRect();

    const dx = target.left + target.width/2  - (rect.left + rect.width/2);
    const dy = target.top  + target.height/2 - (rect.top  + rect.height/2);

    wrapper.style.transform = `translate(${dx}px, ${dy}px)`;

  });

  // --- 6. 完了後に戻す
  wrapper.addEventListener("transitionend", ()=>{

    cardPlay.appendChild(card);
    wrapper.remove();

  }, { once:true });
  card.classList.add("play");
  card.style.pointerEvents = "none";

  setTimeout(() => {
    card.classList.remove("play");
    card.classList.add("dispose");
    card.addEventListener("animationend", (e)=>{
      if(e.animationName === "dispose" || e.animationName === "fly"){
        card.remove();
      }
    });
    }, 400);
}

async function turnEnd(){
  document.getElementById("endTurnButton").classList.add("pressed");
  const cards = document.getElementById("cardWrap").children;
  play(sounds.turnEnd);
  let i = 0
  for (let card of cards){
    card.style.animationDelay = `${i * 0.15}s`;
    card.classList.add("dispose");
    i++;
  }

  await wait(400);
  
  for (let state of stateList){
    if(state.type === "damage"){
      
      play(sounds.debuffDamage);
      shake2();
      if(gainedBlock >= damage){
        gainedBlock -= damage;
        play(sounds.block1);
      }
      else{
        playerHP -= (damage - gainedBlock);
        play(sounds.damage);
        log("got "+ (damage - gainedBlock) + " damage");
        if(gainedBlock != 0) play(sounds.block_break);
        gainedBlock = 0;
      }
    }
    if(state.type === "trueDamage"){
      let damage = state.value;
      play(sounds.debuffDamage);
        playerHP -= damage 
        play(sounds.damage);
    }
    await wait(500);
  }
  stateList.forEach(state => state.TRN --);
  stateList = stateList.filter(state => state.TRN > 0);
  update();
  characterUpdate();

  await wait(1000);
  play(sounds.turn);
  bigText("Enemy's Turn", 800);
  for (let enemy of cEnemy.content){
    await wait(1300);
    enemyTurn(enemy);
    update();
    checkGame();
  }
  await wait(500);
  if(cEnemy.content.length > 0){
    cEnemy.content.forEach(enemy => {enemyTurnEnd(enemy);});    
  }
  await wait(1000);
  playerTurn();
}
function enemyTurn(enemy) {
  if (enemy.cHP <= 0) return;

  enemy.stats = mergeMods(...enemy.stateList.map(state => state.mods));

  let stun = false;
  for (let state of enemy.stateList){
    if(state.type === "stun"){
      stun = true;
    }
  }

  if(!stun){
    const acts = enemy.pattern[enemy.step];

    acts.forEach(act=>{
      actions[act.type](enemy, act);
    });

    enemy.step++;
    if(enemy.step >= enemy.pattern.length){
      enemy.step = 0;
    }
  }
  update();
  characterUpdate();

}

function enemyTurnEnd(enemy){
  for (let debuff of enemy.stateList){
    if(debuff.type === "damage"){
      let damage = debuff.value;
      play(sounds.debuffDamage);

      if(enemy.block >= damage){
        enemy.block -= damage;
        play(sounds.block1);
      }
      else{
        enemy.cHP -= (damage - enemy.block);
        if(enemy.block != 0) play(sounds.block_break);
        play(sounds.damage);
        enemy.block = 0;
      }
    }
    if(debuff.type === "trueDamage"){
      let damage = debuff.value;
      play(sounds.debuffDamage);
        enemy.cHP -= damage 
        play(sounds.damage);
    }
    
  }
  enemy.stateList.forEach(buff => buff.TRN --);
    enemy.stateList = enemy.stateList.filter(buff => buff.TRN > 0);
    checkGame();
    update();
}
const actions = {
  Attack(enemy, data){
    data.value = Math.floor(normalDistribution(data.sd) * (enemy.finalStats.ATK * data.rate) * (100 + finalStats.ELE) / 100);
    console.log( (100 + finalStats.ELE) / 100);
    enemyAttack(enemy, data.value);
  },
  Block(enemy, data, set){
    data.value =  Math.floor(normalDistribution(data.sd) * (enemy.finalStats.DEF * data.rate));
    enemyGuard(enemy, data.value);
    play(sounds.block);
  },
  Debuff(enemy, data, set){
    enemyDebuff(enemy, data);
    play(sounds.debuff);
  },
  None(enemy, data, set){}
};

function enemyAttack(enemy, value){
  const p = clamp(enemy.finalStats.ACC / (enemy.finalStats.ACC + finalStats.SPD), 0.15, 0.95);
  if(Math.random() <= p){
    shake();
    play(sounds.attack);
    if(gainedBlock >= value){
    gainedBlock -= value;
    play(sounds.block1);
    log(enemy.name + " dealt 0 damage");
    }
    else{
    playerHP -= (value - gainedBlock);
    if(gainedBlock != 0) play(sounds.block_break);
    play(sounds.damage);
    log(enemy.name + " dealt "+ (value - gainedBlock) + " damage");
    gainedBlock = 0;
    }
    stateList = stateList.filter(s => {return(s.type != "chargeDebuff" || s.trigger != "hit");})
    enemy.stateList = enemy.stateList.filter(s => {return(s.type != "chargeBuff" || s.trigger != "attack");})
  }
  else{
    log(`${enemy.name}'s attack missed`);
    play(sounds.attack2);
  }
}
function enemyGuard(enemy, value){
  enemy.block = value;
}
function enemyDebuff(enemy, data){
  addState(data.name,data.value,data.TRN,stateList);
}


function addState(name, power, turn, List){ 
  
  const base = states[name];

  const modPower = power * (List === stateList ? (base.element ?((100 - finalStats[`res${base.element}`]) / 100) : 1): 1);

  const index = List.findIndex(s => s.name == name)
  if(index === -1){
    List.push(buildState(base, name, modPower, turn));
  }
  else{
    switch(base.merge){
      case "max":
        List[index] = buildState(base, name, Math.max(List[index].power, modPower), turn);
        break;
      case "stack":
        List[index] = buildState(base, name, List[index].power + modPower, turn);
        break;
    }
    
  }
}
function buildState(base, name, power, turn){
  const extra = base.create(power);
  return {
    name,
    sign: base.sign,
    type: base.type,
    element: base.element,
    merge: base.merge,
    power,
    trigger: base.trigger,
    TRN: turn,
    description: base.description(extra),
    ...extra
  };
}



async function playerTurn(){
  if(!isCombat) return;
  bigText("Your Turn", 800);
  play(sounds.turn);
  await wait(1000);
  turn ++;
  drawCards(finalStats.DRW);
  document.getElementById("endTurnButton").classList.remove("pressed");

  for(let i = 0; i < cEnemy.content.length ;i++){
    document.getElementsByClassName("enemyAction")[i].innerText = '';
    const enemy = cEnemy.content[i];
    const acts = enemy.pattern[enemy.step];
    const actionText = document.getElementsByClassName("enemyAction")[i]
    actionText.innerHTML = `=> `;
    acts.forEach(act=>{
      actionText.innerHTML +=
      `${act.name ?? act.type} <br>`;
    });
  }
  

  gainedBlock = 0;
  

  characterUpdate();
  playerAP = finalStats.AP;

  checkCardCost()
  update();
}

function checkGame() {
  for(let i = 0; i < cEnemy.content.length; i++){
    if(cEnemy.content[i].cHP <= 0){
    document.getElementsByClassName("enemyStatus")[i].remove();
    if(activeEnemy === cEnemy.content[i]){
      activeEnemy = cEnemy.content.filter(e => e.cHP > 0)[0] ?? null;
    }
    }
  }
  cEnemy.content = cEnemy.content.filter(enemy => enemy.cHP > 0);
  if (playerHP <= 0) {
    log("You lose")

    gameOver();
  } else if (cEnemy.content.length == 0) {
    log("You win");
    isCombat = false;
    gainedBlock = 0;
    drawPile = [...weaponSkills, ...deck];
    enemies[area.id].splice(combatEnemy,1);
    stateList = [];
    const battleUi = document.getElementsByClassName("battleUI");
    for(let i = 0; i < battleUi.length; i++){
      battleUi[i].style.display = "none";
    }
    const notBattleUi = document.getElementsByClassName("notBattleUI");
    for(let i = 0; i < notBattleUi.length; i++){
      notBattleUi[i].style.display = "block";
    }
    document.getElementById("enemyArea").innerHTML = "";
    document.getElementById("positionUI").style.display = "flex";
    const cards = document.getElementById("cardWrap").children;
    for (let card of cards){
      card.style.pointerEvents = "none";
      card.classList.add("dispose");
    }
    createTreasureBox("Reward", cEnemy.Tier, ...cEnemy.REW);
    document.getElementById("drawPile").textContent = drawPile.length;
    update();
    characterUpdate();
    showReward()
  }
}

function weaponUpdate() {
  
  const weaponUI = document.getElementsByClassName("itemUI")[0];
  weaponUI.textContent = ""
  cWeapon.forEach(e => {weaponUI.innerHTML += `${e.name}&nbsp;`});
  weaponUI.addEventListener("mouseover", function (event) {
    weaponTooltip(cWeapon, event);
  });
  weaponUI.addEventListener("mousemove", function (event){
    moveTooltip(event);
  });
  weaponUI.addEventListener("mouseout", function (event){
    hideTooltip();
  });
}

function characterUpdate() {
  stats = mergeMods(...cWeapon.map(e => e.mods), cArmor.mods, ...stateList.map(state => state.mods));
  calcDamage(cWeapon[0].ATK * (100 + getStats("magATK")) / 100);
  finalStats = {
    HP: Math.floor(maxHP * (100 + getStats("magHP")) / 100),
    AP: Math.floor(maxAP + getStats("addAP")),
    DRW: Math.floor(DRW + getStats("addDRW")),
    PSC: Math.floor(PSC_flat * (100 + getStats("magPSC")) / 100),
    FIR: Math.floor(FIR_flat * (100 + getStats("magFIR")) / 100),
    ICE: Math.floor(ICE_flat * (100 + getStats("magICE")) / 100),
    LTN: Math.floor(LTN_flat * (100 + getStats("magLTN")) / 100),
    ACD: Math.floor(ACD_flat * (100 + getStats("magACD")) / 100),
    CRT: Math.floor(cWeapon[0].CRT * (100 + getStats("magCRT")) / 100),
    CRD: Math.floor(cWeapon[0].CRD * (100 + getStats("magCRD")) / 100),
    ACC: Math.floor(cWeapon[0].ACC * (100 + getStats("magACC")) / 100),
    DEF: Math.floor(cArmor.DEF * (100 + getStats("magDEF")) / 100),
    SPD: Math.floor(cArmor.SPD * (100 + getStats("magSPD")) / 100),
    resFIR: getStats("resFIR"),
    resICE: getStats("resICE"),
    resLTN: getStats("resLTN"),
    resACD: getStats("resACD"),
    BLE: Math.floor(getStats("BLE") * (100 + getStats("magBLE")) / 100),
    STN: Math.floor(getStats("STN")* (100 + getStats("magSTN")) / 100),

    ELE: getStats("ELE"),
  }
  
  cWeapon.some(g => g.name === "律")? Ritsu = true: false;
  cWeapon.some(g => g.name === "猛")? Moh = true: false;

  characterReInfo();
}

function characterReInfo(){
  let total = calcDamage(cWeapon[0].ATK * (100 + getStats("magATK")) / 100);
  const character = document.getElementById("characterStatus");

  let nameLines = [];
  for(let i = 0; i < (cWeapon[0].SLT + 1); i++){
    let name;
    if(cWeapon[i]){name = `<span class = "name"> ${cWeapon[i].name} </span>`}
    else{name = ` [　]`;}
    nameLines.push(name);
  }
  nameLines = nameLines.join(" ");

  const characterInfo = 
  `<span class = "num">Player</span>
  HP: ${finalStats.HP} AP: ${finalStats.AP}

  ${nameLines}
  ATK: ${Math.floor(cWeapon[0].ATK)} × ${Math.floor(100 + getStats("magATK")) / 100} = ${Math.floor(cWeapon[0].ATK * (100 + getStats("magATK")) / 100)}
  &nbsp;&nbsp;PSC: ${Math.floor(PSC_flat)} × ${Math.floor(100 + getStats("magPSC")) / 100} = ${Math.floor(finalStats.PSC)}
  &nbsp;&nbsp;FIR: ${Math.floor(FIR_flat)} × ${Math.floor(100 + getStats("magFIR")) / 100} = ${Math.floor(finalStats.FIR)}
  &nbsp;&nbsp;ICE: ${Math.floor(ICE_flat)} × ${Math.floor(100 + getStats("magICE")) / 100} = ${Math.floor(finalStats.ICE)}
  &nbsp;&nbsp;LTN: ${Math.floor(LTN_flat)} × ${Math.floor(100 + getStats("magLTN")) / 100} = ${Math.floor(finalStats.LTN)}
  &nbsp;&nbsp;ACD: ${Math.floor(ACD_flat)} × ${Math.floor(100 + getStats("magACD")) / 100} = ${Math.floor(finalStats.ACD)}
  &nbsp;&nbsp;SUM: ${Math.floor(total)}
  CRT: ${Math.floor(cWeapon[0].CRT)} × ${Math.floor(100 + getStats("magCRT")) / 100} = ${Math.floor(finalStats.CRT)}(%)
  CRD: ${Math.floor(cWeapon[0].CRD)} × ${Math.floor(100 + getStats("magCRD")) / 100} = ${Math.floor(finalStats.CRD)}(%)
  ACC: ${Math.floor(cWeapon[0].ACC)} × ${Math.floor(100 + getStats("magACC")) / 100} = ${Math.floor(finalStats.ACC)}
  Chance to Hit: ${isCombat ? (clamp(Math.floor(finalStats.ACC / (finalStats.ACC + activeEnemy.finalStats.SPD) * 100), 15, 95) + "%") : ""}

  <span class = "num">${cArmor.name}</span>
  DEF: ${Math.floor(cArmor.DEF)} × ${Math.floor(100 + getStats("magDEF")) / 100} = ${Math.floor(finalStats.DEF)}
  SPD: ${Math.floor(cArmor.SPD)} × ${Math.floor(100 + getStats("magSPD")) / 100} = ${Math.floor(finalStats.SPD)}
  Chance to Evade: ${isCombat ? (100 - clamp((Math.floor(activeEnemy.finalStats.ACC / (activeEnemy.finalStats.ACC + finalStats.SPD) * 100)), 15, 95) + "%") : ""}
  Resistance:
  &nbsp;&nbsp;FIR: ${finalStats.resFIR}%
  &nbsp;&nbsp;ICE: ${finalStats.resICE}%
  &nbsp;&nbsp;LTN: ${finalStats.resLTN}%
  &nbsp;&nbsp;ACD: ${finalStats.resACD}%
  `
  character.innerHTML = (colorizeText(characterInfo));
}

function armorUpdate() {
  playerBlock = cArmor.DEF;
  const armorUI = document.getElementsByClassName("itemUI")[1];
  armorUI.textContent = cArmor.name;
  armorUI.addEventListener("mouseover", function (event) {
    armorTooltip(cArmor, event);
  });
  armorUI.addEventListener("mousemove", function (event){
    moveTooltip(event);
  });
  armorUI.addEventListener("mouseout", function (event){
    hideTooltip();
  });
}

function weaponTooltip(weapon, event) {
  const mods = weapon[0].mods || {};
  let nameLines = [];
  for(let i = 0; i < (weapon[0].SLT + 1); i++){
    let name;
    if(weapon[i]){name = `<span class = "name"> ${weapon[i].name} </span>`}
    else{name = ` [　]`;}
    nameLines.push(name);
  }
  nameLines = nameLines.join(" ");

  const modLines = [
    mods.magATK && `ATK +${mods.magATK}%`,

    mods.conFIR && `${mods.conFIR}% ATK converted to FIR`,
    mods.magFIR && `FIR +${mods.magFIR}%`,

    mods.conICE && `${mods.conICE}% ATK converted to ICE`,
    mods.magICE && `ICE +${mods.magICE}%`,

    mods.conLTN && `${mods.conLTN}% ATK converted to LTN`,
    mods.magLTN && `LTN +${mods.magLTN}%`,

    mods.conACD && `${mods.conACD}% ATK converted to ACD`,
    mods.magACD && `ACD +${mods.magACD}%`,

    mods.magCRT && `CRT +${mods.magCRT}%`,
    mods.magCRD && `CRD +${mods.magCRD}%`,
    mods.magACC && `ACC +${mods.magACC}%`,

    mods.magDEF && `DEF +${mods.magDEF}%`,
    mods.resFIR && `Resistance for FIR +${mods.resFIR}%`,
    mods.resICE && `Resistance for ICE +${mods.resICE}%`,
    mods.resLTN && `Resistance for LTN +${mods.resLTN}%`,
    mods.resACD && `Resistance for ACD +${mods.resACD}%`,
    mods.magHP && `HP +${mods.magHP}%`,
    mods.addAP && `AP +${mods.addAP}`
  ].filter(Boolean);

  const skillLines = [];
  for(let skill of weapon[0].skills){
    skillLines.push(`　${skill.name} <br> 　AP: ${skill.AP} <br> 　${skill.description}`);
  }
  const lines = [
    nameLines,
    `ATK: ${weapon[0].ATK}`,
    `CRT: ${weapon[0].CRT}% CRD: ${weapon[0].CRD}%`,
    `ACC: ${weapon[0].ACC}`,
    ...modLines,
    `<br> Granted Skill`,
    ...skillLines
  ];

  for(let i = 1; i < weapon.length; i++){
    const glyphLines = `<span class = "name"> ${weapon[i].name} </span>: ${weapon[i].description}`
    lines.push(glyphLines);
  }
  showTooltip(colorizeText(lines.join(" <br> ")), event);
}
function armorTooltip(armor, event){
  const mods = armor.mods || {};

  const modLines = [
    mods.magATK && `ATK +${mods.magATK}%`,

    mods.conFIR && `${mods.conFIR}% ATK converted to FIR`,
    mods.magFIR && `FIR +${mods.magFIR}%`,

    mods.conICE && `${mods.conICE}% ATK converted to ICE`,
    mods.magICE && `ICE +${mods.magICE}%`,

    mods.conLTN && `${mods.conLTN}% ATK converted to LTN`,
    mods.magLTN && `LTN +${mods.magLTN}%`,

    mods.conACD && `${mods.conACD}% ATK converted to ACD`,
    mods.magACD && `ACD +${mods.magACD}%`,

    mods.magCRT && `CRT +${mods.magCRT}%`,
    mods.magCRD && `CRD +${mods.magCRD}%`,
    mods.magACC && `ACC +${mods.magACC}%`,

    mods.magDEF && `DEF +${mods.magDEF}%`,
    mods.resFIR && `Resistance for FIR +${mods.resFIR}%`,
    mods.resICE && `Resistance for ICE +${mods.resICE}%`,
    mods.resLTN && `Resistance for LTN +${mods.resLTN}%`,
    mods.resACD && `Resistance for ACD +${mods.resACD}%`,
    mods.magHP && `HP +${mods.magHP}%`,
    mods.addAP && `AP +${mods.addAP}`
  ].filter(Boolean);

  const lines = [
    `<span class = "name"> ${armor.name} </span>`,
    `DEF: ${armor.DEF}`,
    `SPD: ${armor.SPD}`,
    ...modLines
  ];

  showTooltip(colorizeText(lines.join(" <br> ")), event);
}
function skillTooltip(skill, event){
  showTooltip(
      `<span class = "name"> ${skill.name} </span>
      ${colorizeText(skill.description)}`,
      event
    );
}

function randomWeapon(tier) {
  const newWeapon = random(weapons, tier);
  const pre = random([...prefixes["common"], ...prefixes["weapon"]], tier);
  const suf = random([...suffixes["common"], ...suffixes["weapon"]], tier);
  newWeapon.name = `${pre.name} ${newWeapon.name} ${suf.name}`;
  const _newWeapon = modsDist(newWeapon);
  _newWeapon.mods = (modsDist(mergeMods(newWeapon.mods, pre.mods, suf.mods)));
  _newWeapon.CST += pre.CST + suf.CST;
  return([_newWeapon]);
  
}
function randomArmor(tier) {
  const newArmor = random(armors, tier);
  const pre = random([...prefixes["common"], ...prefixes["armor"]], tier);
  const suf = random([...suffixes["common"], ...suffixes["armor"]], tier);
  newArmor.name = `${pre.name} ${newArmor.name} ${suf.name}`;
  const _newArmor = modsDist(newArmor);
  _newArmor.mods = (modsDist(mergeMods(newArmor.mods, pre.mods, suf.mods)));
  _newArmor.CST += pre.CST + suf.CST;
  return(_newArmor);
}

function modsDist(mods){
  let newMods = structuredClone(mods);
  for (let [key, value] of Object.entries(newMods)) {
    if (key !== "addAP" && !isNaN(value)) {
      newMods[key] = Math.floor(value * normalDistribution(10));
    }
  }
  return(newMods);
}

function randomSkill(tier) {
  const newSkill = random(skills, tier);
  return(newSkill);
}




function dropWeapon(rew, weapon, num){
  const goods = document.createElement("div");
  goods.className = "goods2";
  const button = document.createElement("button");
  const buttonWrap = document.createElement("div");
  
  button.textContent = weapon.map(w => w.name).join(" ");
  buttonWrap.classList.add("buttonWrap");
  button.classList.add("weaponButton");

  buttonWrap.appendChild(button);
  goods.appendChild(buttonWrap);
  rew.insertBefore(goods, rew.children[num]);

  button.addEventListener("click", function () {
    pickUpWeapon(rew, weapon, goods);
  });
  button.addEventListener("mouseover", function (event) {
    weaponTooltip(weapon, event);
  });
  button.addEventListener("mousemove", function (event){
    moveTooltip(event);
  });
  button.addEventListener("mouseout", function (event){
    hideTooltip();
  });
}
function pickUpWeapon(rew, newWeapon, goods) {
  const index = Array.from(goods.parentElement.children).indexOf(goods);
  dropWeapon(rew, cWeapon, index);
  cWeapon = newWeapon;
  weaponSkills = newWeapon[0].skills;
  drawPile = [...weaponSkills, ...deck];
  log(`You equipped ${cWeapon[0].name}`);
  play(sounds.equip);
  weaponUpdate();
  characterUpdate();
  update();
  goods.remove();
}

function dropArmor(rew, armor, num){
  const goods = document.createElement("div");
  goods.className = "goods2";
  const button = document.createElement("button");
  const buttonWrap = document.createElement("div");
  
  button.textContent = armor.name;
  buttonWrap.classList.add("buttonWrap");
  button.classList.add("armorButton");

  buttonWrap.appendChild(button);
  goods.appendChild(buttonWrap);
  rew.insertBefore(goods, rew.children[num]);

  button.addEventListener("click", function () {
  pickUpArmor(rew, armor, goods);
  });
  button.addEventListener("mouseover", function (event) {
    armorTooltip(armor, event);
    
  });
  button.addEventListener("mousemove", function (event){
    moveTooltip(event);
  });
  button.addEventListener("mouseout", function (event){
    hideTooltip();
  });
}
function pickUpArmor(rew, newArmor, goods) {
  
  const index = Array.from(goods.parentElement.children).indexOf(goods);
  dropArmor(rew, cArmor, index);
  cArmor = newArmor;
  log(`You equipped ${cArmor.name}`);
  play(sounds.equip);
  armorUpdate();
  characterUpdate();
  update();
  goods.remove();
}

function dropSkill(rew, skill){
  const goods = document.createElement("div");
  goods.className = "goods";
  const card = createCard(skill);
  goods.appendChild(card);
  rew.appendChild(goods);
  card.style.marginRight = "0";
  card.classList.add("active");

  card.addEventListener("click", function () {
    pickUpSkill(rew, skill, card);
  });
  card.addEventListener("mouseover", function (event) {
    card.classList.add("mouseOver2");
    skillTooltip(skill, event);
  });
  card.addEventListener("mousemove", function (event){
    moveTooltip(event);
  });
  card.addEventListener("mouseout", function (event){
    card.classList.remove("mouseOver2");
    hideTooltip();
  })
}
function pickUpSkill(rew, newSkill, card) {
  if(deck.length >= maxCard){
  showDeck(rew, newSkill, card);
  }
  else{
    deck.push(newSkill);
    play(sounds.draw);
    drawPile = [...weaponSkills, ...deck];

    const goods = card.parentElement;
    playCardAnimation(card)
    document.getElementById("drawPile").textContent = drawPile.length;
    goods.remove();
  }
}

function dropCoin(rew, n){
  const goods = document.createElement("div");
  goods.className = "goods2";
  const button = document.createElement("button");
  const buttonWrap = document.createElement("div");
  
  button.textContent = `${n} Coins`;
  buttonWrap.classList.add("buttonWrap");
  button.classList.add("coinButton");

  buttonWrap.appendChild(button);
  goods.appendChild(buttonWrap);
  rew.appendChild(goods);

  button.onclick = function () {
    collectCoins(n, goods);
  };

}


function randomMap(){
  let totalWeight = 0;
  undiscoveredEvents[area.id].forEach(map => totalWeight += map.mapPROB);
  if(undiscoveredEvents[area.id].length == 0) return;
  let r = Math.floor(Math.random() * totalWeight);
   for (let i = 0; i < undiscoveredEvents[area.id].length; i++) {
    if (r < undiscoveredEvents[area.id][i].mapPROB) {
      const map = undiscoveredEvents[area.id][i];
      undiscoveredEvents[area.id].splice(i, 1);
      return(map)
      
    }
    r -= undiscoveredEvents[area.id][i].mapPROB;
  }

}
function dropMap(rew, map){
    if(map){
    const goods = document.createElement("div");
    goods.className = "goods2";
    const button = document.createElement("button");
    const buttonWrap = document.createElement("div");
    
    button.textContent = `${map.name} map`;
    buttonWrap.classList.add("buttonWrap");
    button.classList.add("mapButton");

    buttonWrap.appendChild(button);
    goods.appendChild(buttonWrap);
    rew.appendChild(goods);

    button.onclick = function () {
      collectMap(goods, map);
    };
}

}

function collectMap(btn, map){
  const _map = document.createElement("div");
  _map.textContent = `${map.name} (${map.position.x}, ${map.position.y})`;
  const positionUI = document.getElementById("positionUI");
  positionUI.appendChild(_map);
  play(sounds.map);
  _map.addEventListener("click", function(){
    _map.remove();
  })
  btn.remove();
  log(`You got ${map.name} map`);
  update();
}




function showReward(){
  play(sounds.open);
  const rewBox = document.getElementById("rewardBox");
  rewBox.classList.remove("glow");
  const reward = rewardList.find(r => {return (r.position.x === position.x && r.position.y === position.y)});
  const rew = document.querySelector(`[data-id="${reward.id}"`);
  cReward = rew;
  rew.style.display="flex";
}
function closeReward(rew){
  rew.style.display = "none";
  play(sounds.blip);
  hideTooltip();
  if(rew.getElementsByClassName("rewardContent")[0].childElementCount == 0){
    rewardList.splice(rewardList.indexOf(rewardList.find(r => {return (r.id === rew.dataset.id)})),1)
    rew.remove();
    const rewBox = document.getElementById("rewardBox");
    rewBox.style.display = "none";
  }
}

function createTreasureBox(name, tier, coin, p1, p2, p3, t){
  const rewBox = document.getElementById("rewardBox");
  rewBox.style.display = "block";
  rewBox.textContent = name;
  rewBox.classList.add("glow");
  const rew = document.createElement("div");
  const rewContent = document.createElement("div");
  const rewName = document.createElement("div");
  const close = document.createElement("button");
  close.textContent = "×";
  rewName.innerHTML = `${name}`;
  close.addEventListener("click", function (){
    closeReward(rew);
  })
  close.classList.add("closeButton");
  rewBox.parentElement.appendChild(rew);

  rew.classList.add("reward");
  rew.classList.add("decoration");
  rewName.classList.add("rewardName");
  rewContent.classList.add("rewardContent");
  rew.style.display = "none";


  rew.appendChild(close);
  rew.appendChild(rewName);
  rew.appendChild(rewContent);

  dropCoin(rewContent, coin);
  rew.dataset.id = `rew${rewardList.length}`;
  for(let i = 0; i < t; i++){
    const p = p1 + p2 + p3;
    if (Math.random() < p/100) {
      if(Math.random() < p1/p){
        Math.random() < 0.5 ? dropWeapon(rewContent, randomWeapon(tier)) : dropArmor(rewContent, randomArmor(tier));
      }      
      if (Math.random() < p2/p) {
      dropSkill(rewContent, randomSkill(tier));
      }
      if (Math.random() < p3/p){
        dropMap(rewContent, randomMap());
      }
    }
    
  }
  const reward = {
    id: `${rew.dataset.id}`,
    name: name,
    position: {x: position.x, y: position.y}
  }
  rewardList.push(reward);
  
}

function showTreasureBox(rew){
  const rewBox = document.getElementById("rewardBox");
  rewBox.style.display = "block";
  rewBox.textContent = rew.name;
}

function encounterEvent(_event){
  undiscoveredEvents[area.id] = undiscoveredEvents[area.id].filter(e => (e.position.x !== position.x || e.position.y !== position.y));
  switch (_event.type){
    case "TreasureBox":
    const reward_ = rewardList.find(r => {return (r.position.x === position.x && r.position.y === position.y)});
    if (reward_){
    showTreasureBox(reward_);
    }
    else{
    createTreasureBox(_event.name, 1, 10, 30, 0, 10, 5);
    } 
    break;

    case "NPC":
    const NPC_ = NPCList.find(r => {return (r.position.x === position.x && r.position.y === position.y)});
    if (NPC_){
    const spk = document.querySelector(`[data-id="${NPC_.id}"`);
    speakingNPC = spk;
    showNPC(NPC_.name);
    }
    else{
    createNPC(_event.name);
    } 
    break;

    case "Portal":
      const id = _event.id;
      showPortal(id);
    break;
  }
}

function createNPC(name){
  const NPC = document.getElementById("NPC");
  NPC.style.display = "block";
  NPC.textContent = "Speak to " + name;
  NPC.classList.add("glow");
  const spk = document.createElement("div");
  const content = document.createElement("div");
  const NPCName = document.createElement("div");
  const close = document.createElement("button");
  close.textContent = "×";
  close.addEventListener("click", function (){
    closeSpkUI(spk);
  })
  speakingNPC = spk;
  close.classList.add("closeButton");
  NPC.parentElement.appendChild(spk);
  
  spk.classList.add("spkUI");
  spk.classList.add("decoration");
  content.className = "spkUIContent";

  NPCName.classList.add("spkUIName");
  NPCName.innerHTML = `────&nbsp;&nbsp;&nbsp;&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;────`;
  spk.style.display = "none";
  spk.dataset.id = `NPC${NPCList.length}`;
  const thisNPC = {
    id: `${spk.dataset.id}`,
    name: name,
    position: {x: position.x, y: position.y}
  }
  NPCList.push(thisNPC);
  spk.appendChild(close);
  spk.appendChild(content);
  spk.appendChild(NPCName);
  if(thisNPC.name == "Smith"){
    for(let i = 0; i < 3; i++){ 
    const button = document.createElement("button");
    const goods = document.createElement("div");
    goods.className = "goods";
    const goodsCost = document.createElement("div");
    goodsCost.className = "goodsCost";
    const glyph = random(glyphs, area.Tier);
    button.classList.add("glyphOnSale");
    button.innerHTML = 
    `<div class="glyphOnSaleTop">Enchant your weapon</div>
    <div class="glyphOnSaleCenter">${glyph.name}<br>[ ${glyph.read} ] </div>`;
    goodsCost.innerHTML = `Coin: ${glyph.CST}`;

    button.addEventListener("click", function () {
    if(coin >= glyph.CST){
      if(!cWeapon.some(_glyph => _glyph.name === glyph.name)){
        if((cWeapon.length - 1) < cWeapon[0].SLT){
          coin -= glyph.CST;
          cWeapon.push(glyph);
          enchant(glyph);
          button.classList.add("sold");
          update();
        }
        else{
          log("You cannot enchant any more");
        }
      }
      else{
        log("You cannot enchant same Glyph");
      }
    }
    else{
      log("Not enough coin");
    }
    });
    button.addEventListener("mouseover", function (event) {
      button.classList.add("mouseOver");
    document.getElementsByClassName("itemUI")[0].innerHTML += `<div class="glow"> ${glyph.name} </div>`;
    showTooltip(
        glyph.description,
        event
      );
    });
    button.addEventListener("mousemove", function (event){
      moveTooltip(event);
    });
    button.addEventListener("mouseout", function (event){
      button.classList.remove("mouseOver");
      hideTooltip();
      const weaponUI = document.getElementsByClassName("itemUI")[0];
      weaponUI.textContent = ""
      cWeapon.forEach(e => {weaponUI.innerHTML += `${e.name}&nbsp;`});
      
    })
    goods.appendChild(button);
    goods.appendChild(goodsCost);
    content.appendChild(goods);
    }
    }
  if(thisNPC.name == "Dealer"){
    content.style.flexDirection = "row";
    for(let i = 0; i < 3; i++){ 
    const goods = document.createElement("div");
    goods.className = "goods";
    const goodsCost = document.createElement("div");
    goodsCost.className = "goodsCost";
    const skill = random(skills, area.Tier);
    const card = createCard(skill);
    goodsCost.innerHTML = `Coin: ${skill.CST}`;
    card.style.marginRight = "0";
    if(coin >= skill.CST){
      card.classList.add("active");
    }
    card.addEventListener("click", function () {
    if(coin >= skill.CST){
        coin -= skill.CST;
        pickUpSkill(content, skill, card)
        update();
    }
    else{
      log("Not enough coin");
    }
    });
    card.addEventListener("mouseover", function (event) {
      card.classList.add("mouseOver2");
      skillTooltip(skill, event);
    });
    card.addEventListener("mousemove", function (event){
      moveTooltip(event);
    });
    card.addEventListener("mouseout", function (event){
      card.classList.remove("mouseOver2");
      hideTooltip();
    })
    goods.appendChild(card);
    goods.appendChild(goodsCost);
    content.appendChild(goods);
    }
  }
  if(thisNPC.name == "Merchant"){
    content.style.flexDirection = "column";
    content.style.padding = "0 150px 0 0 ";
    content.style.justifyContent = "flex-start"
    for(let i = 0; i < 6; i++){ 
    const goods = document.createElement("div");
    goods.className = "goods2";
    const goodsCost = document.createElement("div");
    goodsCost.className = "goodsCost";
    goodsCost.style.bottom = "0";
    goodsCost.style.right = "-100px";
    if(i < 3){
      const weapon = randomWeapon(area.tier);
      goodsCost.innerHTML = `Coin: ${weapon[0].CST}`;

      const button = document.createElement("button");
      const buttonWrap = document.createElement("div");
      button.textContent = weapon.map(w => w.name).join(" ");
      buttonWrap.classList.add("sellingItem");
      buttonWrap.classList.add("buttonWrap");
      button.classList.add("weaponButton");


      button.addEventListener("click", function () {
      if(coin >= weapon[0].CST){
          coin -= weapon[0].CST;
          pickUpWeapon(content, weapon, goods)
          update();
      }
      else{
        log("Not enough coin");
      }
      });
      button.addEventListener("mouseover", function (event) {
        weaponTooltip(weapon, event);
      });
      button.addEventListener("mousemove", function (event){
        moveTooltip(event);
      });
      button.addEventListener("mouseout", function (event){
        hideTooltip();
      });
      buttonWrap.appendChild(button);
      goods.appendChild(buttonWrap);
      goods.appendChild(goodsCost);
      content.appendChild(goods);
      spk.appendChild(content);
    }
    else{
      const armor = randomArmor(area.tier);
      goodsCost.innerHTML = `Coin: ${armor.CST}`;

      const button = document.createElement("button");
      const buttonWrap = document.createElement("div");
      button.textContent = armor.name;
      buttonWrap.classList.add("sellingItem");
      buttonWrap.classList.add("buttonWrap");
      button.classList.add("armorButton");


      button.addEventListener("click", function () {
      if(coin >= armor.CST){
          coin -= armor.CST;
          pickUpArmor(content, armor, goods)
          update();
      }
      else{
        log("Not enough coin");
      }
      });
      button.addEventListener("mouseover", function (event) {
        armorTooltip(armor, event);
      });
      button.addEventListener("mousemove", function (event){
        moveTooltip(event);
      });
      button.addEventListener("mouseout", function (event){
        hideTooltip();
      });
      buttonWrap.appendChild(button);
      goods.appendChild(buttonWrap);
      goods.appendChild(goodsCost);
      content.appendChild(goods);
      spk.appendChild(content);
    }
    }
  }
}

function showNPC(name){
  const NPC = document.getElementById("NPC");
  NPC.style.display = "block";
  NPC.textContent = "Speak to " + name;
}
function speakNPC(){
  speakingNPC.style.display = "flex";
  play(sounds.blip);
  const NPC = document.getElementById("NPC");
  NPC.classList.remove("glow");
}
function closeSpkUI(spk){
  spk.style.display = "none";
  hideTooltip();
}
function collectCoins(n,btn){
  coin += n;
  play(sounds.coin);
  btn.remove();
  log(`You got ${n} coin`);
  update();
}

function enchant(glyph){
  coin -= glyph.CST;
  play(sounds.enchant);
  weaponUpdate();
  characterUpdate();
  update();
}

function buttonMouseOver(btn){
  btn.classList.add("mouseOver");
}
function buttonMouseOut(btn){
  btn.classList.remove("mouseOver");
}

function shake(){
  const center = document.getElementById("center-area");
  center.classList.add("shake");
  center.addEventListener("animationend", function(a){
    if(a.animationName === "screenShake"){
    center.classList.remove("shake");
    }
  })
}
function shake2(){
  const center = document.getElementById("center-area");
  center.classList.add("shake2");
  center.addEventListener("animationend", function(a){
    if(a.animationName === "screenShake2"){
    center.classList.remove("shake2");
    }
  })
}
function gameOver() {

}

function showPortal(id){
  const area = areas.find(a => a.id === id);
  const center = document.getElementById("center-area");
  const portal = document.createElement("div");
  portal.innerText = "Portal";
  portal.style.borderColor = area.mColor;
  portal.style.color = area.mColor;
  portal.className = "portal eventUI";
  portal.addEventListener("click", function(){
    shiftArea(area);
    portal.remove();
  })
  center.appendChild(portal);
}
async function shiftArea(area){

  const fade = document.getElementById("fadeScreen");
  fade.style.opacity = "1";
  setTimeout(() => {
    fade.style.opacity = "0";
  }, 1000);
  await wait(600);
  
  areaSetting(area);
}

function bigText(text, dur){
  const bigText = document.getElementById("bigText");
  bigText.textContent = text;
  bigText.style.opacity = "1";
  setTimeout(() => {
    bigText.style.opacity = "0";
  }, dur);
}

function colorizeText(text) {
  text = text
    .replace(/\b(FIR|ICE|LTN|ACD)\b/g, match => {
      return `<span class="${match.toLowerCase()}">${match}</span>`;
    })
    .replace(/\d+/g, '<span class="num">$&</span>');
  return `<span class="description">${text}</span>`;
}

function mapMemo(){
  const memo = document.createElement("div");
  memo.textContent = `(${position.x}, ${position.y})`
  memo.addEventListener("click", function(){
  const input = document.createElement("input");
  input.type = "text";

  memo.textContent = "";
  memo.appendChild(input);
  input.focus();

  input.addEventListener("blur", function(){
    memo.textContent = `${input.value} (${position.x}, ${position.y})`;
  });

  input.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
      input.blur();
    }
  });
});
  const positionUI = document.getElementById("positionUI");
  positionUI.appendChild(memo);

}


