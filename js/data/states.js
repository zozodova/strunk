import { clamp } from "../utils.js";

export const states = {
  Burn: {
    sign: `<span class = "fir">焼</span>`,
    type: "damage",
    element: "FIR",
    merge: "max",
    create(power){
      const fir = clamp(Math.round(power / 3), 1, 99999)
      return {value: fir};
    },
    description(data){
      return `Take ${data.value} FIR damage every turn.`;
    }
  },

  Chill: {
    sign: `<span class = "ice">凍</span>`,
    type: "debuff",
    element: "ICE",
    merge: "max",
    create(power){
      const slow = clamp(Math.round(power / 6), 1, 50)
      return {
        mods:{magSPD: -slow, magACC: -slow},
        value: slow
      };
    },
    description(data){
      return `SPD -${data.value}%, ACC -${data.value}%`;
    }
  },

  Electrify: {
    sign: `<span class = "ltn">電</span>`,
    type: "chargeDebuff",
    trigger: "hit",
    element: "LTN",
    merge: "stack",
    create(power){
      const ele = clamp(Math.round(power / 6), 1, 100)
      return {
        mods:{ELE: ele},
        value: ele
      };
    },
    description(data){
      return `Take ${data.value}% more damage.`;
    }
  },

  Poison: {
    sign: `<span class = "acd">蝕</span>`,
    type: "trueDamage",
    element: "ACD",
    merge: "max",
    create(power){
      const acd = clamp(Math.round(power / 10), 1, 99999)
      return {value: acd};
    },
    description(data){
      return `Take ${data.value} ACD damage every turn. This damage ignore Block.`;
    }
  },

  Bleeding: {
    sign: "血",
    type: "damage",
    merge: "max",
    create(power){
      return {value: Math.floor(power / 10)};
    },
    description(data){
      return `Take ${data.value} damage every turn.`;
    }
  },

  Stun:{
    sign: "昏",
    type: "stun",
    merge: "stack",
    description(data, finalStats){return `Unable to act.`;}
  },

  Vulnerable: {
    sign: "脆",
    type: "debuff",
    merge: "stack",
    create(power){
      return {mods: {magDEF: -power}, value: power};
    },
    description(data){
      return `DEF ${data.mods.magDEF}%`;
    }
  },

  Plundered: {
    sign: "奪",
    type: "debuff",
    merge: "stack",
    create(power){
      return {mods:{addDRW: -power}, value: power};
    },
    description(data){
      return `DRW -${data.value}`;
    }
  },




  Strength: {
    sign: "攻",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magATK: power}, value: power};
    },
    description(data){
      return `ATK +${data.value}%`;
    }
  },
  StrengthCharge: {
    sign: "攻",
    type: "chargeBuff",
    trigger: "attack",
    merge: "stack",
    create(power){
      return {mods:{magATK: power}, value: power};
    },
    description(data){
      return `ATK +${data.value}%`;
    }
  },
  Fortify: {
    sign: "堅",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magDEF: power}, value: power};
    },
    description(data){
      return `DEF +${data.value}%`;
    }
  },
  FortifyCharge: {
    sign: "堅",
    type: "chargeBuff",
    trigger: "block",
    merge: "stack",
    create(power){
      return {mods:{magDEF: power}, value: power};
    },
    description(data){
      return `DEF +${data.value}%`;
    }
  },
  Haste: {
    sign: "迅",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magSPD: power}, value: power};
    },
    description(data){
      return `SPD +${data.value}%`;
    }
  },
  Focus: {
    sign: "精",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magACC: power}, value: power};
    },
    description(data){
      return `ACC +${data.value}%`;
    }
  },
  FocusCharge: {
    sign: "精",
    type: "chargeBuff",
    trigger: "attack",
    merge: "stack",
    create(power){
      return {mods:{magACC: power}, value: power};
    },
    description(data){
      return `ACC +${data.value}%`;
    }
  },
  Insight: {
    sign: "究",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magCRT: power}, value: power};
    },
    description(data){
      return `CRT +${data.value}%`;
    }
  },
  InsightCharge: {
    sign: "究",
    type: "chargeBuff",
    trigger: "attack",
    merge: "stack",
    create(power){
      return {mods:{magCRT: power}, value: power};
    },
    description(data){
      return `CRT +${data.value}%`;
    }
  },
  Fervor: {
    sign: "渾",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magCRD: power}, value: power};
    },
    description(data){
      return `CRD +${data.value}%`;
    }
  },
  FervorCharge: {
    sign: "渾",
    type: "chargeBuff",
    trigger: "attack",
    merge: "stack",
    create(power){
      return {mods:{magCRD: power}, value: power};
    },
    description(data){
      return `CRD +${data.value}%`;
    }
  },
  
  Mana: {
    sign: "気",
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{addAP: power}, value: power};
    },
    description(data){
      return `AP +${data.value}`;
    }
  },
  Ignite: {
    sign: `<span class = "fir">炎</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magFIR: power}, value: power};
    },
    description(data){
      return `FIR +${data.value}%`;
    },
  },
  Glaciate: {
    sign: `<span class = "ice">氷</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magICE: power}, value: power};
    },
    description(data){
      return `ICE +${data.value}%`;
    },
  },
  Overload: {
    sign: `<span class = "ltn">雷</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magLTN: power}, value: power};
    },
    description(data){
      return `LTN +${data.value}%`;
    },
  },
  Corrode: {
    sign: `<span class = "acd">毒</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{magACD: power}, value: power};
    },
    description(data){
      return `ACD +${data.value}%`;
    },
  },

  FlameImbue: {
    sign: `<span class = "fir">纏</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{conFIR: power}, value: power};
    },
    description(data){
      return `${data.value}% ATK converted to FIR`;
    },
  },
  FrostImbue: {
    sign: `<span class = "ice">纏</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{conICE: power}, value: power};
    },
    description(data){
      return `${data.value}% ATK converted to ICE`;
    },
  },
  StormImbue: {
    sign: `<span class = "ltn">纏</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{conLTN: power}, value: power};
    },
    description(data){
      return `${data.value}% ATK converted to LTN`;
    },
  },
  PoisonImbue: {
    sign: `<span class = "acd">纏</span>`,
    type: "buff",
    merge: "stack",
    create(power){
      return {mods:{conACD: power}, value: power};
    },
    description(data){
      return `${data.value}% ATK converted to ACD`;
    },
  },


}