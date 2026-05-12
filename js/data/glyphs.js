export const glyphs = [
  { tier:1, name:"力", read:"Riki", description:"+10% ATK", mods:{ magATK:10 }, CST:30, PROB:120 },
  { tier:4, name:"烈", read:"Tou", description:"+25% ATK", mods:{ magATK:25 }, CST:100, PROB:80 },
  { tier:7, name:"猛", read:"Mou", description:"+45% ATK", mods:{ magATK:45 }, CST:200, PROB:40 },
  { tier:10, name:"覇", read:"Ha", description:"+70% ATK", mods:{ magATK:70 }, CST:600, PROB:10 },

  { tier:2, name:"炎", read:"En", description:"convert 20% ATK to FIR damage\nFIR +20%", mods:{ conFIR:20, magFIR: 20}, CST:30, PROB:80 },
  { tier:5, name:"灼", read:"Shaku", description:"convert 30% ATK to FIR damage\nFIR +40%", mods:{ conFIR:30, magFIR: 40 }, CST:200, PROB:40 },
  { tier:9, name:"獄", read:"Goku", description:"convert 40% ATK to FIR damage\nFIR +75%", mods:{ conFIR:40, magFIR: 75 }, CST:600, PROB:10 },
  { tier:10, name:"焔", read:"En", description:"convert 40% ATK to FIR damage\nFIR +75%", mods:{ conFIR:50, magFIR: 100 }, CST:1000, PROB:1 },

  { tier:2, name:"氷", read:"Hyou", description:"convert 20% ATK to ICE damage\nICE +20%", mods:{ conICE:20, magICE: 20}, CST:30, PROB:80 },
  { tier:5, name:"凍", read:"Tou", description:"convert 30% ATK to ICE damage\nICE +40%", mods:{ conICE:30, magICE: 40 }, CST:200, PROB:40 },
  { tier:9, name:"凛", read:"Rin", description:"convert 40% ATK to ICE damage\nICE +75%", mods:{ conICE:40, magICE: 75 }, CST:600, PROB:10 },
  { tier:10, name:"零", read:"Rei", description:"convert 40% ATK to ICE damage\nICE +75%", mods:{ conICE:50, magICE: 100 }, CST:1000, PROB:1 },

  { tier:2, name:"雷", read:"Rai", description:"convert 20% ATK to LTN damage\nLTN +20%", mods:{ conLTN:20, magLTN: 20}, CST:30, PROB:80 },
  { tier:5, name:"撃", read:"Geki", description:"convert 30% ATK to LTN damage\nLTN +40%", mods:{ conLTN:30, magLTN: 40 }, CST:200, PROB:40 },
  { tier:9, name:"霹", read:"Heki", description:"convert 40% ATK to LTN damage\nLTN +75%", mods:{ conLTN:40, magLTN: 75 }, CST:600, PROB:10 },
  { tier:10, name:"轟", read:"Go", description:"convert 40% ATK to LTN damage\nLTN +75%", mods:{ conLTN:50, magLTN: 100 }, CST:1000, PROB:1 },

  { tier:2, name:"酸", read:"San", description:"convert 20% ATK to ACD damage\nACD +20%", mods:{ conACD:20, magACD: 20}, CST:30, PROB:80 },
  { tier:5, name:"毒", read:"Doku", description:"convert 30% ATK to ACD damage\nACD +40%", mods:{ conACD:30, magACD: 40 }, CST:200, PROB:40 },
  { tier:9, name:"蝕", read:"Shoku", description:"convert 40% ATK to ACD damage\nACD +75%", mods:{ conACD:40, magACD: 75 }, CST:600, PROB:10 },
  { tier:10, name:"瘴", read:"Shou", description:"convert 40% ATK to ACD damage\nACD +75%", mods:{ conACD:50, magACD: 100 }, CST:1000, PROB:1 },

  { tier:1, name:"心", read:"Shin", description:"+10% ACC", mods:{ magACC:10 }, CST:30, PROB:120 },
  { tier:4, name:"視", read:"Shi", description:"+25% ACC", mods:{ magACC:25 }, CST:100, PROB:80 },
  { tier:7, name:"覚", read:"Kaku", description:"+45% ACC", mods:{ magACC:45 }, CST:200, PROB:40 },
  { tier:10, name:"悟", read:"Go", description:"+70% ACC", mods:{ magACC:70 }, CST:600, PROB:10 },

  { tier:2, name:"鋭", read:"Ei", description:"+30% CRT", mods:{ magCRT:30 }, CST:30, PROB:120 },
  { tier:5, name:"断", read:"Dan", description:"+55% CRT", mods:{ magCRT:55 }, CST:200, PROB:60 },
  { tier:9, name:"斬", read:"Zan", description:"+85% CRT", mods:{ magCRT:85 }, CST:600, PROB:15 },

  { tier:2, name:"打", read:"Shin", description:"+30% CRD", mods:{ magCRD:30 }, CST:30, PROB:120 },
  { tier:5, name:"渾", read:"Shi", description:"+55% CRD", mods:{ magCRD:55 }, CST:200, PROB:60 },
  { tier:9, name:"壊", read:"Kai", description:"+85% CRD", mods:{ magCRD:85 }, CST:600, PROB:15 },

  { tier:3, name:"乱", read:"Ran", description:"+15% ATK -20% ACC", mods:{ magATK:40, magACC:-20 }, CST:50, PROB:30 },

  { tier:5, name:"傷", read:"Shou", description:"+5 BLE\n+40% BLE", mods:{ BLE:5, magBLE:40 }, CST:50, PROB:30 },
  { tier:5, name:"撲", read:"Boku", description:"+5 STN\n+30% STN", mods:{ STN:5, magSTN:30 }, CST:50, PROB:30 },


  { tier:9, name:"律", read:"Ritsu", description:"Every third attack is Critical.", CST:200, PROB:10 },
  { tier:7, name:"狂", read:"Kyou", description:"+70% ATK when your HP falls below 30%", CST:200, PROB:10 },
];