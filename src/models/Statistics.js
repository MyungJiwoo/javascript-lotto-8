import { RANK } from "./Rank.js";

export const PRIZE = Object.freeze({
  [RANK.FIRST]: 2_000_000_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.FOURTH]: 50_000,
  [RANK.FIFTH]: 5_000,
});

class Statistics {
  #statistics;

  constructor() {
    this.#statistics = new Map([
      [RANK.FIRST, 0],
      [RANK.SECOND, 0],
      [RANK.THIRD, 0],
      [RANK.FOURTH, 0],
      [RANK.FIFTH, 0],
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
