import { RANK } from "../constants.js";

export function determineRank(matchCount, isBonusMatched) {
  if (matchCount === 6) return RANK.FIRST;
  if (matchCount === 5 && isBonusMatched) return RANK.SECOND;
  if (matchCount === 5) return RANK.THIRD;
  if (matchCount === 4) return RANK.FOURTH;
  if (matchCount === 3) return RANK.FIFTH;
  return null;
}
