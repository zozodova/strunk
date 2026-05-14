export const monsters = {
  1: [{
    Tier: 1,
    content:[{
      name: "Slime",
      HP: 300,
      ATK: 100,
      DEF: 50,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Block", rate:1, sd:10, value:0}]
      ],
      step: 0,
      SPD: 20,
      ACC: 100,
    }],

    REW: [10, 30, 0, 1, 5]
  },
  {
    Tier: 1,
    content:[{
      name: "Rat",
      HP: 100,
      ATK: 100,
      DEF: 50,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Block", rate:1, sd:10, value:0}]
      ],
      step: 0,
      SPD: 50,
      ACC: 100,
    },
    {
      name: "Rat",
      HP: 100,
      ATK: 100,
      DEF: 50,
      pattern:[
      [{type:"Block", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}]
      ],
      step: 0,
      SPD: 50,
      ACC: 100,
    }
  ],

    COIN: 10,
    REW: [10, 30, 0, 1, 5]
  },
  {
    Tier: 1,
    content:[{
      name: "Goblin",
      HP: 200,
      ATK: 150,
      DEF: 50,
      pattern:[
      [{type:"Block", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", name:"Spier", rate:1.2, sd:10, value:0}],
      ],
      step: 0,
      SPD: 40,
      ACC: 130,
    }],

    COIN: 15,
    REW: [10, 30, 0, 1, 5]
  },
  {
    Tier: 2,
    content:[{
      name: "Wolf",
      HP: 300,
      ATK: 200,
      DEF: 0,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1.5, sd:10, value:0}],
      ],
      step: 0,
      SPD: 50,
      ACC: 180,
    }],

    COIN: 40,
    REW: [20, 30, 0, 2, 5]
  },
  {
    Tier: 4,
    content: [{
      name: "Dragon",
      HP: 1500,
      ATK: 200,
      DEF: 100,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Block", rate:1, sd:10, value:0}],
      [{type:"None", name:"Dragon is inhaling..."}],
      [{type:"Attack", name:"Scorching Breath", rate:3, sd:0, value:0}],
      ],
      step: 0,
      SPD: 30,
      ACC: 150,
    }],

    COIN: 100,
    REW: [100, 30, 30, 10, 10]
  },
  {
    Tier: 1,
    content: [{
      name: "Snake",
      HP: 180,
      ATK: 100,
      DEF: 50,
      pattern:[
      [{type:"Block", rate:1, sd:10, value:0}],
      [
        {type:"Attack", rate:1, sd:10, value:0},
        {type:"Debuff",name:"Poison", TRN: 3, value: 100,}
      ],
      ],
      step: 0,
      SPD: 40,
      ACC: 140,
    }],

    COIN: 20,
    REW: [10, 30, 0, 1, 5]
  },
  ],
  2: [{
    Tier: 2,
    content: [{
      name: "Sand Slime",
      HP: 500,
      ATK: 100,
      DEF: 70,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Attack", rate:1, sd:10, value:0}],
      [{type:"Block", rate:1, sd:10, value:0}]
      ],
      step: 0,
      SPD: 20,
      ACC: 100,
    }],

    COIN: 20,
    REW: [30, 30, 0, 2, 5]
  },
  {
    Tier: 2,
    content: [{
      name: "Mummy",
      HP: 500,
      ATK: 180,
      DEF: 40,
      pattern:[
      [{type:"Attack", rate:1, sd:10, value:0}],
      [
        {type:"Block", rate:1, sd:10, value:0},
        {type:"Debuff", name: "Vulnerable", value:30, TRN:1,}
      ]
      ],
      step: 0,
      SPD: 10,
      ACC: 80,
    }],

    COIN: 40,
    REW: [30, 30, 0, 2, 5]
  },
  {
    Tier: 2,
    content: [{
      name: "Vulture",
      HP: 100,
      ATK: 200,
      DEF: 0,
      pattern:[
      [
        {type:"Attack", rate:1, sd:10, value:0},
        {type:"Debuff", name: "Plundered", value: 1, TRN:1,}
      ],
      ],
      step: 0,
      SPD: 100,
      ACC: 200,
    }],

    COIN: 40,
    REW: [30, 30, 0, 2, 5]
  },
  {
    Tier: 3,
    content: [{
      name: "Scorpion",
      HP: 400,
      ATK: 200,
      DEF: 120,
      pattern:[
      [
        {type:"Attack", rate:1, sd:10, value:0},
        {type:"Debuff", name:"Poison", TRN: 3, value: 150,}
      ],
      [
        {type:"Attack", rate:1, sd:10, value:0},
        {type:"Block", rate:1, sd:10, value: 0}
      ]
      ],
      step: 0,
      SPD: 40,
      ACC: 110,
    }],

    COIN: 70,
    REW: [50, 30, 10, 2, 5]
  },
  {
    Tier: 3,
    content: [{
      name: "Scarab",
      HP: 200,
      ATK: 200,
      DEF: 200,
      pattern:[
      [
        {type:"Block", rate:1, sd:10, value: 0},
        {type:"Attack", rate:1, sd:10, value:0},
      ],
      ],
      step: 0,
      SPD: 40,
      ACC: 130,
    },
    {
      name: "Scarab",
      HP: 200,
      ATK: 200,
      DEF: 200,
      pattern:[
      [
        {type:"Block", rate:1, sd:10, value: 0},
        {type:"Attack", rate:1, sd:10, value:0},
      ],
      ],
      step: 0,
      SPD: 40,
      ACC: 130,
    }],

    COIN: 70,
    REW: [50, 30, 10, 2, 7]
  },
  {
    Tier: 4,
    content: [{
      name: "Golem",
      HP: 1000,
      ATK: 200,
      DEF: 500,
      pattern:[
      [
        {type:"Block", rate:1, sd:10, value: 0}
      ],
      [
        {type:"Attack", rate:1, sd:10, value:0},
        {type:"Block", rate:1, sd:10, value: 0}
      ]
      ],
      step: 0,
      SPD: 20,
      ACC: 80,
    }],

    COIN: 100,
    REW: [100, 30, 10, 20, 8]
  },
  ]
};
