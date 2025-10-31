export const CONDITIONS = Object.freeze({
  1: "6개 일치",
  2: "5개 일치, 보너스 볼 일치",
  3: "5개 일치",
  4: "4개 일치",
  5: "3개 일치",
});

export function determineRank(matchCount, isBonusMatched) {
  if (matchCount === 6) return 1;
  if (matchCount === 5 && isBonusMatched) return 2;
  if (matchCount === 5) return 3;
  if (matchCount === 4) return 4;
  if (matchCount === 3) return 5;
  return null;
}
