export function normalDistribution(accuracy){
	var x = Math.random();
	var y = Math.random();
	
	var z1 = 1 + Math.sqrt(-2*Math.log(x))*Math.cos(2 * Math.PI  * y)* accuracy/100;

	return z1;
}

export function random(List, tier){
  const filteredList = tier? List.filter(e => (e.Tier >= tier - 2 && e.Tier <= tier + 2)) : List;
  let totalWeight = 0;
  filteredList.forEach(e => totalWeight += getTierWeight(e.Tier, tier));
  let r = Math.random() * totalWeight;
  for (let i = 0; i < filteredList.length; i++) {
    if (r < getTierWeight(filteredList[i].Tier, tier)) {
      const s = { ...filteredList[i] };
      return(s)
      break;
    }
    r -= getTierWeight(filteredList[i].Tier, tier);
  }
}
function getTierWeight(itemTier, currentTier){
  const diff = itemTier - currentTier;
  let weight = Math.exp(-(diff ** 2) / 2);
  if(diff > 0){
    weight *= 0.5;
  }
  return weight;
}

export function mergeMods(...sources){
  const result = {};

  sources.forEach(obj => {
    for(const key in obj){
      result[key] = (result[key] || 0) + obj[key];
    }
  });

  return result;
}

export function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}