import { determineRank } from "../src/models/Rank.js";

describe("Rank 테스트", () => {
  // 당첨 번호와 로또가 일치한 개수와, 보너스 번호 일치 여부를 전달하면 등수를 반환한다.
  test("6개 번호가 일치하면 1등을 반환한다.", () => {
    const matchCount = 6;
    const isBonusMatched = false;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(1);
  });

  test("5개 번호가 일치하고 보너스 번호도 일치하면 2등을 반환한다.", () => {
    const matchCount = 5;
    const isBonusMatched = true;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(2);
  });

  test("5개 번호가 일치하면 3등을 반환한다.", () => {
    const matchCount = 5;
    const isBonusMatched = false;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(3);
  });

  test("4개 번호가 일치하면 4등을 반환한다.", () => {
    const matchCount = 4;
    const isBonusMatched = false;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(4);
  });

  test("3개 번호가 일치하면 5등을 반환한다.", () => {
    const matchCount = 3;
    const isBonusMatched = false;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(5);
  });

  test("2개 이하의 번호만 일치하면 null을 반환한다.", () => {
    const matchCount = 2;
    const isBonusMatched = true;
    expect(determineRank(matchCount, isBonusMatched)).toEqual(null);
  });
});
