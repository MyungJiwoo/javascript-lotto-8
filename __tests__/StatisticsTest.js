import Statistics from "../src/models/Statistics";

describe("당첨 통계 클래스 테스트", () => {
  test("등수를 기준으로 당첨 횟수를 기록한다.", () => {
    const statistics = new Statistics();
    statistics.updateStatistics(1);
    statistics.updateStatistics(1);

    expect(statistics.getCountByRank(1)).toEqual(2);
  });

  test("1~5등 외 유효하지 않는 등수라면 예외가 발생한다.", () => {
    const statistics = new Statistics();

    expect(() => {
      statistics.updateStatistics(10);
    }).toThrow("[ERROR]");
  });

  test("전체 당첨 통계를 반환한다.", () => {
    const statistics = new Statistics();
    statistics.updateStatistics(1);
    statistics.updateStatistics(2);
    statistics.updateStatistics(3);
    statistics.updateStatistics(4);
    statistics.updateStatistics(4);

    expect(statistics.getStatistics()).toEqual({
      1: 1,
      2: 1,
      3: 1,
      4: 2,
      5: 0,
    });
  });

  test("등수별 당첨 통계를 반환한다.", () => {
    const statistics = new Statistics();
    statistics.updateStatistics(1);
    statistics.updateStatistics(2);
    statistics.updateStatistics(3);
    statistics.updateStatistics(3);

    const expectedCounts = {
      1: 1,
      2: 1,
      3: 2,
      4: 0,
      5: 0,
    };

    Object.entries(expectedCounts).forEach(([rank, expected]) => {
      expect(statistics.getCountByRank(Number(rank))).toEqual(expected);
    });
  });

  test("총 당첨금을 계산해서 반환한다.", () => {
    const statistics = new Statistics();
    statistics.updateStatistics(1);
    statistics.updateStatistics(2);
    statistics.updateStatistics(3);
    statistics.updateStatistics(4);
    statistics.updateStatistics(5);

    expect(statistics.calculateTotalPrize()).toEqual(2031555000);
  });

  test("수익률을 계산해서 반환한다.", () => {
    const statistics = new Statistics();
    statistics.updateStatistics(1);

    expect(statistics.calculateProfitRate(1)).toEqual(200000000);
  });
});
