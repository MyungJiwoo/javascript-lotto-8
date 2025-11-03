import { CONDITIONS, RANK } from "../constants.js";

export function determineRank(matchCount, isBonusMatched) {
  if (matchCount === CONDITIONS[RANK.FIRST].matchCount) return RANK.FIRST;
  if (matchCount === CONDITIONS[RANK.SECOND].matchCount && isBonusMatched)
    return RANK.SECOND;
  if (matchCount === CONDITIONS[RANK.THIRD].matchCount) return RANK.THIRD;
  if (matchCount === CONDITIONS[RANK.FOURTH].matchCount) return RANK.FOURTH;
  if (matchCount === CONDITIONS[RANK.FIFTH].matchCount) return RANK.FIFTH;
  return null;
}
