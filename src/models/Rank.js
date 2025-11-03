import { CONDITIONS, RANK } from "../constants.js";

/**
 * 로또 추첨 결과로 등수를 결정합니다.
 * @param {number} matchCount - 당첨 번호와 일치한 개수
 * @param {boolean} isBonusMatched - 보너스 볼이 일치한지 여부
 * @returns {number} 당첨 시 1~5등 사이의 등수 반환. 미당첨 시 null 반환
 */
export function determineRank(matchCount, isBonusMatched) {
  if (matchCount === CONDITIONS[RANK.FIRST].matchCount) return RANK.FIRST;
  if (matchCount === CONDITIONS[RANK.SECOND].matchCount && isBonusMatched)
    return RANK.SECOND;
  if (matchCount === CONDITIONS[RANK.THIRD].matchCount) return RANK.THIRD;
  if (matchCount === CONDITIONS[RANK.FOURTH].matchCount) return RANK.FOURTH;
  if (matchCount === CONDITIONS[RANK.FIFTH].matchCount) return RANK.FIFTH;
  return null;
}
