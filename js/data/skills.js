export const skills = [
  {
    Tier: 1,
    name: "Attack",
    description: "deal 100% weapon damage.",
    effects:[
    {type:"attack", mag: 100},
    ],
  
    AP: 1,
    CST: 50,
    PROB: 30
  },
  {
    Tier: 2,
    name: "Heavy Attack",
    description: "deal 200% weapon damage.",
    effects:[
    {type:"attack", mag: 200},
    ],
    AP: 2,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 5,
    name: "Massive Attack",
    description: "deal 300% weapon damage.",
    effects:[
    {type:"attack", mag: 300},
    ],
    AP: 3,
    CST: 400,
    PROB: 5
  },
  {
    Tier: 9,
    name: "Catastrophe",
    description: "deal 400% weapon damage.",
    effects:[
    {type:"attack", mag: 400},
    ],
    AP: 4,
    CST: 1000,
    PROB: 1
  },

  {
    Tier: 1,
    name: "Block",
    description: "gain 100% armor block.",
    effects:[
    {type:"block", mag: 100},
    ],
    AP: 1,
    CST: 50,
    PROB: 30
  },
  {
    Tier: 3,
    name: "Solid Block",
    description: "gain 200% armor block.",
    effects:[
    {type:"block", mag: 200},
    ],
    AP: 2,
    CST: 200,
    PROB: 30
  },
  {
    Tier: 7,
    name: "Absolute Block",
    description: "gain 300% armor block.",
    effects:[
    {type:"block", mag: 300},
    ],
    AP: 3,
    CST: 700,
    PROB: 3
  },

  {
    Tier: 2,
    effects:[
    {type:"block", mag: 60},
    {type:"buff", name: "Mana", value:1, TRN: 2}
    ],
    name: "Brace",
    description: "Gain 60% armor block. Gain 1 AP next turn.",
    AP: 1,
    CST: 100,
    PROB: 30
  },
  
  {
    Tier: 1,
    effects:[
    {type:"attack", mag: 60, CHN: 2,},
    ],
    name: "Dual Attack",
    description: "deal 50% weapon damage. \n attack twice.",
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"draw", value: 2},
    ],
    name: "Rush",
    description: "Draw 2 cards",
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"attack", mag: 80},
    {type:"debuff", name: "Vulnerable",value: 30, TRN: 3}
    ],
    name: "Shatter",
    description: "Deal 80% weapon damage. Enemy DEF -30% for 2 turns.",
    AP: 1,
    CST: 200,
    PROB: 30
  },
  {
    Tier: 3,
    effects:[
    {type:"buff", name: "FocusCharge",value: 100, TRN: Infinity}
    ],
    name: "Deadly Eyes",
    description: "Gain Focus +100% charge.",
    AP: 1,
    CST: 200,
    PROB: 30
  },

  {
    Tier: 1,
    effects:[
    {type:"buff", name: "Ignite",value: 50, TRN: 1}
    ],
    name: "Ignite",
    description: `FIR +50%`,
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"buff", name: "FlameImbue",value: 50, TRN: 2}
    ],
    name: "Flame Imbue",
    description: `50% ATK convert to FIR`,
    AP: 1,
    CST: 200,
    PROB: 30
  },
  {
    Tier: 1,
    effects:[
    {type:"buff", name: "Glaciate",value: 50, TRN: 1}
    ],
    name: "Glaciate",
    description: `ICE +50%`,
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"buff", name: "FrostImbue",value: 50, TRN: 2}
    ],
    name: "Frost Imbue",
    description: `50% ATK convert to ICE`,
    AP: 1,
    CST: 200,
    PROB: 30
  },
  {
    Tier: 1,
    effects:[
    {type:"buff", name: "Overload",value: 50, TRN: 1}
    ],
    name: "Overload",
    description: `LTN +50%`,
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"buff", name: "StormImbue",value: 50, TRN: 2}
    ],
    name: "Storm  Imbue",
    description: `50% ATK convert to LTN`,
    AP: 1,
    CST: 200,
    PROB: 30
  },
   {
    Tier: 1,
    effects:[
    {type:"buff", name: "Corrode",value: 50, TRN: 1}
    ],
    name: "Corrode",
    description: `ACD +50%`,
    AP: 1,
    CST: 100,
    PROB: 30
  },
  {
    Tier: 2,
    effects:[
    {type:"buff", name: "PoisonImbue",value: 50, TRN: 2}
    ],
    name: "Poison  Imbue",
    description: `50% ATK convert to ACD`,
    AP: 1,
    CST: 200,
    PROB: 30
  },
  {
    Tier: 2,
    name: "Bulwark Attack",
    description: "Deal 70% weapon damage. \n Gain 60% armor block.",
    effects:[
    {type:"attack", mag: 70},
    {type:"block", mag: 60},
    ],
    AP: 1,
    CST: 200,
    PROB: 20
  },
  {
    Tier: 3,
    name: "Glint",
    description: "Deal 20% weapon damage.",
    effects:[
    {type:"attack", mag: 50},
    ],
    AP: 0,
    CST: 200,
    PROB: 15
  },
  {
    Tier: 3,
    name: "Iron Stance",
    description: "ATK, DEF + 30%. \n 2 Turn",
    effects:[
    {type:"buff", name: "Strength",value: 30, TRN: 2},
    {type:"buff", name: "Fortify",value: 30, TRN: 2}
    ],
    AP: 1,
    CST: 200,
    PROB: 15
  },
];
