export const weapons = [
  {
    name: "Sword",
    Tier: 1,
      ATK: 50,
      CRT: 30,
      CRD: 50,
      ACC: 200,
    mods: {
      BLE: 20
    },
    skills: [{
    name: "Strength",
    description: "ATK +20%",
    effects:[
    {type:"buff", name: "Strength",value: 20, TRN: 2}
    ],
    AP: 1,
    }],
    SLT: 1,
    PROB: 30,
    CST: 100
  },
  {
    name: "Axe",
    Tier: 1,
      ATK: 60,
      CRT: 10,
      CRD: 70,
      ACC: 150,
    mods: {
      BLE: 10
    },
    skills: [{
    name: "Savage",
    description: "BLE +20",
    effects:[
    {type:"buff",
      mods:{
      BLE: 20
      },
      TRN: 2
    }
    ],
    AP: 1,
    }],
    SLT: 1,
    PROB: 30,
    CST: 100
  },
  {
    name: "Mace",
    Tier: 1,
      ATK: 60,
      CRT: 10,
      CRD: 50,
      ACC: 150,
    mods: {
      STN: 10
    },
    skills:[{
    name: "Slam",
    description: "Stun +20",
    effects:[
    {type:"buff",
      mods:{
      STN: 20
      },
      TRN: 2
    }
    ],
    AP: 1,
    }],
    SLT: 1,
    PROB: 30,
    CST: 100
  },
  {
    name: "Dagger",
    Tier: 1,
      ATK: 40,
      CRT: 40,
      CRD: 80,
      ACC: 250,
    mods: {
      BLE: 100
    },
    skills: [{
    name: "Lethal",
    description: "CRT +20%",
    effects:[
    {type:"buff",
      mods:{
      magCRT: 20
      },
      TRN: 2
    }
    ],
    AP: 1,
    }],
    SLT: 1,
    PROB: 30,
    CST: 100
  },
  {
    name: "Bow",
    Tier: 1,
      ATK: 60,
      CRT: 30,
      CRD: 50,
      ACC: 100,
    mods: {
      BLE: 40
    },
    skills: [{
    name: "Concentrate",
    description: "ACC +50%",
    effects:[
    {type:"buff",
      mods:{
      magACC: 50
      },
      TRN: 1
    }
    ],
    AP: 1,
    }],
    SLT: 1,
    PROB: 30,
    CST: 100
  },
  {
    name: "Fire Sword",
    Tier: 2,
      ATK: 40,
      CRT: 10,
      CRD: 50,
      ACC: 300,
    mods: {
      BLE: 10,
      conFIR: 50,
      magFIR: 50
    },
    skills: [{
    name: "Incinerate",
    description: "FIR +50%",
    effects:[
    {type:"buff",
      mods:{
      magFIR: 50
      },
      TRN: 1
    }
    ],
    AP: 1,
    }],
    SLT: 2,
    PROB: 20,
    CST: 200
  },
];
