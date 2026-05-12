export const areas = [
  {
    id: 1,
    name: "Old Forest",
    bColor: "rgb(14, 20, 15)",
    mColor: "rgb(200, 252, 204)",
    sColor: "rgb(97, 133, 92)",
    tier: 1,
    shape: [
    [10, 10, -10, -10, 1]
    ],
    connection:[
      {id: 2, position: "random", mapPROB: 10},
    ],
    boss:[
    ]
  },
  {
    id: 2,
    name: "Desolate Desert",
    bColor: "rgb(20, 18, 11)",
    mColor: "rgb(245, 225, 182)",
    sColor: "rgb(134, 119, 70)",
    tier: 2,
    shape: [
    [10, 10, -10, -10, 1],
    [1, -12, -1, -14, 0],
    [0, -11, 0, -11, 0]
    ],
    connection:[
      {id: 1, name: "Portal", position: {x: 0, y: -13}, mapPROB: 0},
      {id: 3, name: "Portal", position: "random", mapPROB: 10}
    ],
    boss:[
      {id: 1, name: "Boss", position: "random", mapPROB: 10},
    ],
    item:[
      {type: "NPC", name: "Smith", position: {x: 0, y: -13}, mapPROB: 0,},
    ]
  },
  {
    id: 3,
    name: "Abandoned Mine",
    bColor: "rgb(39, 35, 46)",
    mColor: "rgb(230, 236, 250)",
    sColor: "rgb(125, 128, 139)",
    tier: 3,
    shape: [
    [0, 10, 0, 0, 1],
    [20, 10, 0, 10, 1],
    [18, 20, 18, 10, 1],
    [20, 20, 18, 20, 1],
    [5, 16, 5, 10, 1],
    [5, 16, 2, 16, 1],
    [7, 10, 7, 3, 1],
    [7, 4, 15, 4, 1],
    ],
    connection:[
      {id: 2, name: "Portal", position: {x:0, y:0}, mapPROB: 0},
      {id: 4, name: "Portal", position: {x:20, y:20}, mapPROB: 10}
    ],
    boss:[
      {id: 2, name: "Boss", position: "random", mapPROB: 10},
    ]
  },
  {
    id: 4,
    name: "Molten Ravine",
    bColor: "rgb(7, 3, 1)",
    mColor: "rgb(247, 207, 160)",
    sColor: "rgb(134, 82, 65)",
    tier: 5
  },{
    id: 5,
    name: "Glacial Catacombs",
    bColor: "rgb(3, 39, 49)",
    mColor: "rgb(158, 243, 237)",
    sColor: "rgb(79, 133, 130)",
    tier: 5
  },

  {
    id: 6,
    name: "Voltaic Spire",
    bColor: "rgb(5, 2, 12)",
    mColor: "rgb(255, 219, 247)",
    sColor: "rgb(104, 82, 122)",
    tier: 5
  },
  {
    id: 7,
    name: "Corrosive Mire",
    bColor: "rgb(7, 14, 2)",
    mColor: "rgb(243, 255, 211)",
    sColor: "rgb(121, 136, 78)",
    tier: 5
  },
    {
    id: 3,
    name: "The Forsaken Bridge",
    bColor: "rgb(21, 29, 25)",
    mColor: "rgb(98, 118, 134)",
    sColor: "rgb(197, 238, 238)",
    tier: 6
  },
    {
    id: 9,
    name: "Karveth Penitentiary",
    bColor: "rgb(10, 9, 2)",
    mColor: "rgb(90, 85, 64)",
    sColor: "rgb(236, 222, 197)",
    tier: 7
  },
  {
    id: 8,
    name: "Edge of Chaos",
    bColor: "rgb(0, 0, 0)",
    mColor: "rgb(138, 101, 130)",
    sColor: "rgb(248, 222, 148)",
    tier: 10
  },

  {
    id: 10,
    name: "East of Time",
    bColor: "rgb(3, 39, 49)",
    mColor: "rgb(92, 137, 134)",
    sColor: "rgb(131, 255, 249)",
    tier: 10
  },
  {
    id: 10,
    name: "The White Abyss",
    bColor: "rgb(0, 0, 0)",
    mColor: "rgb(115, 136, 150)",
    sColor: "rgb(255, 255, 255)",
    tier: 10
  },
  {
    id: 10,
    name: "The White Abyss",
    bColor: "rgb(0, 0, 0)",
    mColor: "rgb(115, 136, 150)",
    sColor: "rgb(255, 255, 255)",
    tier: 10
  },
  {
    id: 10,
    name: "The Origin of All",
    bColor: "rgb(10, 24, 5)",
    mColor: "rgb(115, 150, 125)",
    sColor: "rgb(255, 255, 255)",
    tier: 10
  },
];