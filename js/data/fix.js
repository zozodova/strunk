export const prefixes = {
  common: [
    { name:"", mods:{}, PROB:500, Tier:1, CST:0 },

    { name:"Burning", mods:{conFIR:20, magFIR:20}, PROB:100, Tier:3, CST:30 },
    { name:"Scorching", mods:{conFIR:40, magFIR:40}, PROB:10, Tier:5, CST:120 },
    { name:"Infernal", mods:{conFIR:60, magFIR:60}, PROB:1, Tier:8, CST:600 },

    { name:"Frozen", mods:{conICE:20, magICE:20}, PROB:100, Tier:3, CST:30 },
    { name:"Glacial", mods:{conICE:40, magICE:40}, PROB:10, Tier:5, CST:120 },
    { name:"Absolute", mods:{conICE:60, magICE:60}, PROB:1, Tier:8, CST:600 },

    { name:"Spark", mods:{conLTN:20, magLTN:20}, PROB:100, Tier:3, CST:30 },
    { name:"Tempest", mods:{conLTN:40, magLTN:40}, PROB:10, Tier:5, CST:120 },
    { name:"Cataclysmic", mods:{conLTN:60, magLTN:60}, PROB:1, Tier:8, CST:600 },

    { name:"Toxic", mods:{conACD:20, magACD:20}, PROB:100, Tier:3, CST:30 },
    { name:"Caustic", mods:{conACD:40, magACD:40}, PROB:10, Tier:5, CST:120 },
    { name:"Venomous", mods:{conACD:60, magACD:60}, PROB:1, Tier:8, CST:600 },

    { name:"Vaporborn", mods:{conFIR:40, conICE:40, magFIR:40, magICE:40}, PROB:1, Tier:9, CST:800 },
    { name:"Sunburst", mods:{conFIR:40, conLTN:40, magFIR:40, magLTN:40}, PROB:1, Tier:9, CST:800 },
    { name:"Blightflame", mods:{conFIR:40, conACD:40, magFIR:40, magACD:40}, PROB:1, Tier:9, CST:800 },
    { name:"Cryoshock", mods:{conICE:40, conLTN:40, magICE:40, magLTN:40}, PROB:1, Tier:9, CST:800 },
    { name:"Crystal Decay", mods:{conICE:40, conACD:40, magICE:40, magACD:40}, PROB:1, Tier:9, CST:800 },
    { name:"Corrosion Pulse", mods:{conLTN:40, conACD:40, magLTN:40, magACD:40}, PROB:1, Tier:9, CST:800 },

    { name:"Rainbow", mods:{conFIR:20, conICE:20, conLTN:20, conACD:20, magFIR:20, magICE:20, magLTN:20, magACD:20}, PROB:1, Tier:10, CST:1000 },

    { name:"Awakened", mods:{addAP:1}, PROB:1, Tier:9, CST:900 },
    { name:"Ascendant", mods:{addAP:2}, PROB:0.1, Tier:10, CST:2000 },
  ],

  weapon: [
    { name:"Heavy", mods:{magATK:10}, PROB:100, Tier:2, CST:20 },
    { name:"Savage", mods:{magATK:30}, PROB:10, Tier:5, CST:100 },
    { name:"Tyrant", mods:{magATK:50}, PROB:1, Tier:8, CST:500 },

    { name:"Sharp", mods:{magCRT:20}, PROB:100, Tier:2, CST:20 },
    { name:"Deadly", mods:{magCRT:40}, PROB:10, Tier:5, CST:100 },
    { name:"Executioner’s", mods:{magCRT:60}, PROB:1, Tier:8, CST:500 },
  ],

  armor: [
    { name:"Sturdy", mods:{magDEF:20}, PROB:100, Tier:3, CST:30 },
    { name:"Fortress", mods:{magDEF:40}, PROB:10, Tier:6, CST:120 },
    { name:"Adamant", mods:{magDEF:60}, PROB:1, Tier:9, CST:600 },

    { name:"Vital", mods:{magHP:20}, PROB:100, Tier:3, CST:30 },
    { name:"Colossal", mods:{magHP:40}, PROB:10, Tier:6, CST:120 },
    { name:"Brobdingnagian", mods:{magHP:60}, PROB:1, Tier:9, CST:600 },

    { name:"Flameward", mods:{resFIR:20}, PROB:100, Tier:2, CST:25 },
    { name:"Sootbound", mods:{resFIR:40}, PROB:10, Tier:5, CST:110 },
    { name:"Vaelion’s", mods:{resFIR:60}, PROB:1, Tier:8, CST:500 },

    { name:"Frostward", mods:{resICE:20}, PROB:100, Tier:2, CST:25 },
    { name:"Whitebound", mods:{resICE:40}, PROB:10, Tier:5, CST:110 },
    { name:"Iscariot’s", mods:{resICE:60}, PROB:1, Tier:8, CST:500 },

    { name:"Stormward", mods:{resLTN:20}, PROB:100, Tier:2, CST:25 },
    { name:"Skybound", mods:{resLTN:40}, PROB:10, Tier:5, CST:110 },
    { name:"Ravok’s", mods:{resLTN:60}, PROB:1, Tier:8, CST:500 },

    { name:"Blightward", mods:{resACD:20}, PROB:100, Tier:2, CST:25 },
    { name:"Rotbound", mods:{resACD:40}, PROB:10, Tier:5, CST:110 },
    { name:"Morghul’s", mods:{resACD:60}, PROB:1, Tier:8, CST:500 },

    { name:"Elyndor’s", mods:{resFIR:40, resICE:40}, PROB:1, Tier:9, CST:700 },
    { name:"Xalreth’s", mods:{resFIR:40, resLTN:40}, PROB:1, Tier:9, CST:700 },
    { name:"Malachor’s", mods:{resFIR:40, resACD:40}, PROB:1, Tier:9, CST:700 },
    { name:"Iscivar’s", mods:{resICE:40, resLTN:40}, PROB:1, Tier:9, CST:700 },
    { name:"Falgrim’s", mods:{resICE:40, resACD:40}, PROB:1, Tier:9, CST:700 },
    { name:"Ysmor’s", mods:{resLTN:40, resACD:40}, PROB:1, Tier:9, CST:700 },

    { name:"Azrael’s", mods:{resFIR:30, resICE:30, resLTN:30, resACD:30}, PROB:1, Tier:10, CST:1000 },
  ]
};
export const suffixes = {
  common: [
    { name:"", mods:{}, PROB:500, Tier:1, CST:0 },

    { name:"of Embers", mods:{magFIR:20, resFIR:20}, PROB:100, Tier:3, CST:35 },
    { name:"of the Furnace", mods:{magFIR:40, resFIR:40}, PROB:10, Tier:5, CST:140 },
    { name:"of Eternal Flame", mods:{magFIR:60, resFIR:60}, PROB:1, Tier:8, CST:650 },

    { name:"of Frost", mods:{magICE:20, resICE:20}, PROB:100, Tier:3, CST:35 },
    { name:"of Pale Expanse", mods:{magICE:40, resICE:40}, PROB:10, Tier:5, CST:140 },
    { name:"of the White Abyss", mods:{magICE:60, resICE:60}, PROB:1, Tier:8, CST:650 },

    { name:"of Thunder", mods:{magLTN:20, resLTN:20}, PROB:100, Tier:3, CST:35 },
    { name:"of Storm Veins", mods:{magLTN:40, resLTN:40}, PROB:10, Tier:5, CST:140 },
    { name:"of Shattered Skies", mods:{magLTN:60, resLTN:60}, PROB:1, Tier:8, CST:650 },

    { name:"of Rot", mods:{magACD:20, resACD:20}, PROB:100, Tier:3, CST:35 },
    { name:"of Decay", mods:{magACD:40, resACD:40}, PROB:10, Tier:5, CST:140 },
    { name:"of Black Mire", mods:{magACD:60, resACD:60}, PROB:1, Tier:8, CST:650 },

    { name:"of Steam Wounds", mods:{magFIR:40, magICE:40, resFIR:40, resICE:40}, PROB:1, Tier:9, CST:850 },
    { name:"of Solar Ruin", mods:{magFIR:40, magLTN:40, resFIR:40, resLTN:40}, PROB:1, Tier:9, CST:850 },
    { name:"of Melted Bones", mods:{magFIR:40, magACD:40, resFIR:40, resACD:40}, PROB:1, Tier:9, CST:850 },
    { name:"of White Voltage", mods:{magICE:40, magLTN:40, resICE:40, resLTN:40}, PROB:1, Tier:9, CST:850 },
    { name:"of Rotten Snow", mods:{magICE:40, magACD:40, resICE:40, resACD:40}, PROB:1, Tier:9, CST:850 },
    { name:"of Venom Current", mods:{magLTN:40, magACD:40, resLTN:40, resACD:40}, PROB:1, Tier:9, CST:850 },

    { name:"of Variegation", mods:{magFIR:20, magICE:20, magLTN:20, magACD:20, resFIR:20, resICE:20, resLTN:20, resACD:20}, PROB:1, Tier:10, CST:1100 },
  ],

  weapon: [
    { name:"of Force", mods:{magATK:10}, PROB:100, Tier:2, CST:25 },
    { name:"of Slaughter", mods:{magATK:30}, PROB:10, Tier:5, CST:110 },
    { name:"of Annihilation", mods:{magATK:50}, PROB:1, Tier:8, CST:550 },

    { name:"of Wounds", mods:{magCRD:20}, PROB:100, Tier:2, CST:25 },
    { name:"of Fracture", mods:{magCRD:40}, PROB:10, Tier:5, CST:110 },
    { name:"of Massacre", mods:{magCRD:60}, PROB:1, Tier:8, CST:550 },
  ],

  armor: [
    { name:"of Stone", mods:{magDEF:20}, PROB:100, Tier:3, CST:35 },
    { name:"of the Bastion", mods:{magDEF:40}, PROB:10, Tier:6, CST:140 },
    { name:"of Eternity", mods:{magDEF:60}, PROB:1, Tier:9, CST:650 },

    { name:"of Blood", mods:{magHP:20}, PROB:100, Tier:3, CST:35 },
    { name:"of Giants", mods:{magHP:40}, PROB:10, Tier:6, CST:140 },
    { name:"of Immortal", mods:{magHP:60}, PROB:1, Tier:9, CST:650 },
  ]
};
