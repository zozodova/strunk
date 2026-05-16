export const weapons = [
  {
    name: "Sword",
    tier: 1,
      ATK: 50,
      CRT: 30,
      CRD: 50,
      ACC: 200,
    mods: {
      BLE: 20
    },
    SLT: 1,
    CST: 100
  },
  {
    name: "Axe",
    tier: 1,
      ATK: 60,
      CRT: 10,
      CRD: 70,
      ACC: 150,
    mods: {
      BLE: 10
    },
    SLT: 1,
    CST: 100
  },
  {
    name: "Mace",
    tier: 1,
      ATK: 60,
      CRT: 10,
      CRD: 50,
      ACC: 150,
    mods: {
      STN: 10
    },
    SLT: 1,
    
    CST: 100
  },
  {
    name: "Dagger",
    tier: 1,
      ATK: 40,
      CRT: 40,
      CRD: 80,
      ACC: 250,
    mods: {
      BLE: 100
    },
    SLT: 1,
    
    CST: 100
  },
  {
    name: "Bow",
    tier: 1,
      ATK: 60,
      CRT: 30,
      CRD: 50,
      ACC: 100,
    mods: {
      BLE: 40
    },
    SLT: 1,
    
    CST: 100
  },
  // tier 2
{
  name: "Fire Sword",
  tier: 2,
  ATK: 40,
  CRT: 10,
  CRD: 50,
  ACC: 200,
  mods: {
    BLE: 10,
    conFIR: 50,
    magFIR: 20
  },
  SLT: 2,
  CST: 200
},
{
  name: "Ice Dagger",
  tier: 2,
  ATK: 35,
  CRT: 50,
  CRD: 90,
  ACC: 260,
  mods: {
    conICE: 60,
    magICE: 20
  },
  SLT: 2,
  CST: 200
},
{
  name: "Thunder Mace",
  tier: 2,
  ATK: 60,
  CRT: 10,
  CRD: 50,
  ACC: 150,
  mods: {
    STN: 20,
    conLTN: 50,
    magLTN: 20
  },
  SLT: 2,
  CST: 200
},

// tier 3
{
  name: "Infernal Axe",
  tier: 3,
  ATK: 90,
  CRT: 10,
  CRD: 120,
  ACC: 130,
  mods: {
    conFIR: 80,
    magFIR: 40,
    BLE: 30
  },
  SLT: 2,
  CST: 350
},
{
  name: "Frozen Spear",
  tier: 3,
  ATK: 70,
  CRT: 20,
  CRD: 70,
  ACC: 220,
  mods: {
    conICE: 80,
    magICE: 40
  },
  SLT: 2,
  CST: 350
},
{
  name: "Storm Bow",
  tier: 3,
  ATK: 75,
  CRT: 30,
  CRD: 70,
  ACC: 180,
  mods: {
    conLTN: 70,
    magLTN: 35,
    STN: 30
  },
  SLT: 2,
  CST: 350
},

// tier 4
{
  name: "Volcanic Blade",
  tier: 4,
  ATK: 110,
  CRT: 20,
  CRD: 130,
  ACC: 170,
  mods: {
    conFIR: 100,
    magFIR: 60,
    BLE: 50
  },
  SLT: 3,
  CST: 500
},
{
  name: "Crystal Knife",
  tier: 4,
  ATK: 75,
  CRT: 70,
  CRD: 140,
  ACC: 320,
  mods: {
    conICE: 100,
    magCRT: 20,
    magICE: 50
  },
  SLT: 3,
  CST: 500
},

// tier 5
{
  name: "Tempest Edge",
  tier: 5,
  ATK: 130,
  CRT: 30,
  CRD: 140,
  ACC: 220,
  mods: {
    conLTN: 120,
    magLTN: 70,
    STN: 50
  },
  SLT: 3,
  CST: 700
},
{
  name: "Venom Reaper",
  tier: 5,
  ATK: 120,
  CRT: 40,
  CRD: 130,
  ACC: 240,
  mods: {
    conACD: 120,
    magACD: 70,
    BLE: 80
  },
  SLT: 3,
  CST: 700
},

// tier 6
{
  name: "Cataclysm Hammer",
  tier: 6,
  ATK: 180,
  CRT: 10,
  CRD: 180,
  ACC: 160,
  mods: {
    STN: 80,
    magCRD: 60
  },
  SLT: 4,
  CST: 1000
},
{
  name: "Absolute Zero",
  tier: 6,
  ATK: 130,
  CRT: 50,
  CRD: 160,
  ACC: 300,
  mods: {
    conICE: 150,
    magICE: 90
  },
  SLT: 4,
  CST: 1000
},

// tier 7
{
  name: "Inferno Fang",
  tier: 7,
  ATK: 210,
  CRT: 25,
  CRD: 220,
  ACC: 180,
  mods: {
    conFIR: 180,
    magFIR: 120,
    BLE: 120
  },
  SLT: 4,
  CST: 1400
},
{
  name: "Astral Bow",
  tier: 7,
  ATK: 170,
  CRT: 60,
  CRD: 180,
  ACC: 360,
  mods: {
    magCRT: 40,
    magCRD: 50,
    conLTN: 100
  },
  SLT: 4,
  CST: 1400
},

// tier 8
{
  name: "Voidbringer",
  tier: 8,
  ATK: 260,
  CRT: 40,
  CRD: 260,
  ACC: 220,
  mods: {
    conACD: 220,
    magACD: 150,
    BLE: 180
  },
  SLT: 5,
  CST: 2000
},
{
  name: "Heaven Splitter",
  tier: 8,
  ATK: 300,
  CRT: 20,
  CRD: 300,
  ACC: 170,
  mods: {
    magATK: 40,
    STN: 100
  },
  SLT: 5,
  CST: 2000
},

// tier 9
{
  name: "Eclipse",
  tier: 9,
  ATK: 340,
  CRT: 70,
  CRD: 350,
  ACC: 400,
  mods: {
    conFIR: 150,
    conICE: 150,
    conLTN: 150,
    conACD: 150,
    magCRT: 80
  },
  SLT: 5,
  CST: 3000
},
{
  name: "World Ender",
  tier: 9,
  ATK: 420,
  CRT: 20,
  CRD: 420,
  ACC: 180,
  mods: {
    magATK: 70,
    magCRD: 100,
    BLE: 250
  },
  SLT: 5,
  CST: 3000
},

// tier 10
{
  name: "Catastrophe",
  tier: 10,
  ATK: 600,
  CRT: 50,
  CRD: 600,
  ACC: 250,
  mods: {
    conFIR: 250,
    conICE: 250,
    conLTN: 250,
    conACD: 250,
    magATK: 100,
    magCRT: 100,
    magCRD: 150
  },
  SLT: 6,
  CST: 5000
},
{
  name: "Origin",
  tier: 10,
  ATK: 500,
  CRT: 100,
  CRD: 500,
  ACC: 500,
  mods: {
    magATK: 120,
    magACC: 120,
    magCRT: 120,
    magCRD: 120
  },
  SLT: 6,
  CST: 5000
},
];
