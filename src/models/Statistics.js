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

  /**
   * 등수를 검증합니다.
   * @param {number} rank - 등수
   * @throws {Error} 유효하지 않은 경우 예외가 발생
   */
  #validateRank(rank) {
    StatisticsValidations.validateRankRange(this.#statistics, rank);
  }

  /**
   * 당첨 통계를 반환합니다.
   * @returns {Object} 당첨 통계 객체
   */
  get statistics() {
    return Object.fromEntries(this.#statistics);
  }

  /**
   * 주어진 등수에 해당하는 당첨 통계를 1 증가시킵니다.
   * @param {number} rank - 등수
   * @throws {Error} 잘못된 등수(rank)가 주어진 경우 예외가 발생합니다.
   */
  updateStatistics(rank) {
    const rankNumber = Number(rank);
    this.#validateRank(rankNumber);

    const current = this.#statistics.get(rankNumber) ?? INITIAL_COUNT;
    this.#statistics.set(rankNumber, current + 1);
  }

  /**
   * 등수에 해당하는 결과를 반환합니다.
   * @param {number} rank - 등수
   * @returns {Array} 당첨 통계 배열
   */
  getCountByRank(rank) {
    const rankNumber = Number(rank);
    this.#validateRank(rankNumber);
    return this.#statistics.get(rankNumber);
  }

  /**
   * 당첨금 총 합계를 계산합니다.
   * @returns {number} 당첨금 합계
   */
  calculateTotalPrize() {
    return Array.from(this.#statistics).reduce(
      (sum, [rank, count]) => sum + count * PRIZE[rank],
      0
    );
  }

  /**
   * 당첨금 합계와 로또 구매 개수로 수익률을 계산합니다.
   * @param {number} lottoAmount - 로또 구매 개수
   * @returns {number} 수익률
   */
  calculateProfitRate(lottoAmount) {
    const totalPrize = this.calculateTotalPrize();
    const profitRate = (totalPrize / (lottoAmount * LOTTO_PRICE)) * 100;
    return +profitRate.toFixed(2);
  }
}

export default Statistics;
