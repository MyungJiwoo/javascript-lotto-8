export const RANK = Object.freeze({
  NONE: null,
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
});

export const CONDITIONS = Object.freeze({
  1: "6개 일치",
  2: "5개 일치, 보너스 볼 일치",
  3: "5개 일치",
  4: "4개 일치",
  5: "3개 일치",
});

export function determineRank(matchCount, isBonusMatched) {
  if (matchCount === 6) return RANK.FIRST;
  if (matchCount === 5 && isBonusMatched) return RANK.SECOND;
  if (matchCount === 5) return RANK.THIRD;
  if (matchCount === 4) return RANK.FOURTH;
  if (matchCount === 3) return RANK.FIFTH;
  return RANK.NONE;
}
