import { StatisticsValidations } from "../validations.js";
import { RANK, PRIZE, INITIAL_COUNT, LOTTO_PRICE } from "../constants.js";

class Statistics {
  #statistics;

  constructor() {
    this.#statistics = new Map([
      [RANK.FIRST, INITIAL_COUNT],
      [RANK.SECOND, INITIAL_COUNT],
      [RANK.THIRD, INITIAL_COUNT],
      [RANK.FOURTH, INITIAL_COUNT],
      [RANK.FIFTH, INITIAL_COUNT],
    ]);
  }

  #validateRank(rank) {
    StatisticsValidations.validateRankRange(this.#statistics, rank);
  }

  updateStatistics(rank) {
    const rankNumber = Number(rank);
    this.#validateRank(rankNumber);

    const current = this.#statistics.get(rankNumber) ?? INITIAL_COUNT;
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
    const profitRate = (totalPrize / (lottoAmount * LOTTO_PRICE)) * 100;
    return +profitRate.toFixed(2);
  }
}

export default Statistics;
