const PRIZE = Object.freeze({
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
});

class Statistics {
  #statistics;

  constructor() {
    this.#statistics = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);
  }

  #validateRank(rank) {
    if (!this.#statistics.has(rank))
      throw new Error("[ERROR] 등수는 1등부터 5등까지만 가능합니다.");
  }

  updateStatistics(rank) {
    const rankNumber = Number(rank);
    this.#validateRank(rankNumber);

    const current = this.#statistics.get(rankNumber) ?? 0;
    this.#statistics.set(rankNumber, current + 1);
  }

  getStatistics() {
    return Object.fromEntries(this.#statistics);
  }

  getCountByRank(rank) {
    const rankNumber = Number(rank);
    this.#validateRank(rankNumber);
    return this.#statistics.get(rankNumber);
  }

  calculateTotalPrize() {
    return Array.from(this.#statistics).reduce(
      (sum, [rank, count]) => sum + count * PRIZE[rank],
      0
    );
  }

  calculateProfitRate(lottoAmount) {
    const totalPrize = this.calculateTotalPrize();
    return (totalPrize / (lottoAmount * 1000)) * 100;
  }
}

export default Statistics;
