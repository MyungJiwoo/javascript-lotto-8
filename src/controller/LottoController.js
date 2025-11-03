import { Console, Random } from "@woowacourse/mission-utils";
import { InputView } from "../views/InputView.js";
import Purchase from "../models/Purchase.js";
import Lotto from "../models/Lotto.js";
import WinningSet from "../models/WinningSet.js";
import { determineRank } from "../models/Rank.js";
import Statistics from "../models/Statistics.js";
import { OutputView } from "../views/OutputView.js";
import { CommonValidations } from "../validations.js";
import {
  RANK,
  CONDITIONS,
  PRIZE,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
  ERROR_PREFIX,
} from "../constants.js";

class LottoController {
  async run() {
    const purchase = await this.#getPurchase();
    const lottos = this.#generateLottos(purchase);

    this.#printLottos(lottos);

    const winningSet = await this.#getWinningSet();
    const statistics = this.#drawLottos(lottos, winningSet);

    this.#printStatistics(statistics);
    this.#printProfitRate(statistics, purchase.lottoCount);
  }

  /**
   * 구입 금액을 입력 받아 Purchase 객체를 생성합니다.
   * @returns {Purchase}
   */
  async #getPurchase() {
    return await this.#inputPurchaseUntilValid();
  }

  /**
   * 구입 금액에 따라 로또를 발행합니다.
   * @param {Purchase} purchase - 구입 정보
   * @returns {Array<Lotto>} 발행된 로또 배열
   */
  #generateLottos(purchase) {
    const amount = purchase.lottoCount;
    OutputView.outputAmount(amount);

    const lottos = Array.from(
      { length: amount },
      () => new Lotto(this.#getRandomNumbers())
    );

    return lottos;
  }

  /**
   * 발행된 로또 번호들을 출력합니다.
   * @param {Array<Lotto>} lottos - 발행된 로또 배열
   */
  #printLottos(lottos) {
    lottos.forEach((lotto) => OutputView.outputLotto(lotto.numbers));
  }

  /**
   * 당첨 번호와 보너스 번호를 입력 받아 WinningSet을 반환합니다.
   * @returns {WinningSet}
   */
  async #getWinningSet() {
    const winningSet = await this.#inputWinningNumbersUntilValid();
    await this.#inputWinningBonusNumberUntilValid(winningSet);
    return winningSet;
  }

  /**
   * 각 로또를 추첨하여 통계를 계산합니다.
   * @param {Array<Lotto>} lottos - 발행된 로또 배열
   * @param {WinningSet} winningSet - 당첨 번호와 보너스 번호 세트
   * @returns {Statistics} 당첨 통계 객체
   */
  #drawLottos(lottos, winningSet) {
    const statistics = new Statistics();
    lottos.forEach((lotto) => {
      const { matchCount, isBonusMatched } = winningSet.draw(lotto.numbers);
      const rank = determineRank(matchCount, isBonusMatched);
      if (rank >= 1 && rank <= 5) statistics.updateStatistics(rank);
    });
    return statistics;
  }

  /**
   * 당첨 통계를 출력합니다.
   * @param {Statistics} statistics - 당첨 통계 객체
   */
  #printStatistics(statistics) {
    OutputView.outputStatisticsTitle();

    Object.values(RANK)
      .sort((a, b) => b - a)
      .forEach((rank) => {
        OutputView.outputStatistic(
          CONDITIONS[rank].message,
          PRIZE[rank].toLocaleString("ko-KR"),
          statistics.getCountByRank(rank)
        );
      });
  }

  /**
   * 수익률을 계산해 출력합니다.
   * @param {Statistics} statistics - 당첨 통계 객체
   * @param {number} amount - 로또 구입 개수
   */
  #printProfitRate(statistics, amount) {
    OutputView.outputProfitRate(statistics.calculateProfitRate(amount));
  }

  /**
   * 입력과 처리 함수를 받아, 유효성 검사에 통과할 때까지 반복 입력을 수행합니다.
   * @param {Function} inputFn - 입력 함수
   * @param {Function} handleFn - 입력 처리 함수
   * @returns {Promise<any>} 처리 결과
   */
  #inputUntilValid = async (inputFn, handleFn) => {
    while (true) {
      try {
        const raw = await inputFn();
        return await handleFn(raw);
      } catch (error) {
        Console.print(`${ERROR_PREFIX} ${error.message}`);
      }
    }
  };

  /**
   * 입력된 구입 금액 문자열을 검증하고 Purchase를 생성합니다.
   * @param {string} raw - 구입 금액 입력값
   * @returns {Purchase} 구입 금액이 설정된 Purchase 객체
   * @throws {Error} 비어 있거나 정수가 아닌 경우
   */
  #handlePurchase = (raw) => {
    const parsedPurchase = Number(raw.trim());
    CommonValidations.validateIsEmpty(raw);
    CommonValidations.validateIsInteger(Number(raw.trim()));

    return new Purchase(parsedPurchase);
  };

  /**
   * 입력된 당첨 번호 문자열을 검증하고 WinningSet을 생성합니다.
   * @param {string} raw - 당첨 번호 입력값
   * @returns {WinningSet} 당첨 번호만 설정된 WinningSet 객체
   * @throws {Error} 비어 있거나 형식이 잘못된 경우
   */
  #handleWinningNumbers = (raw) => {
    CommonValidations.validateIsEmpty(raw);
    const parsedWinningNumbers = raw
      .split(",")
      .map((number) => Number(number.trim()));

    return new WinningSet(parsedWinningNumbers);
  };

  /**
   * 입력된 보너스 번호를 검증하고 WinningSet에 설정합니다.
   * @param {WinningSet} winningSet - 보너스 번호만 설정된 WinningSet 객체
   * @param {string} raw - 보너스 번호 입력값
   * @returns {number} 설정된 보너스 번호
   * @throws {Error} 비어 있거나 정수가 아닌 경우, 혹은 유효하지 않은 경우
   */
  #handleBonusNumber = (winningSet, raw) => {
    const parsedWinningBonusNumber = Number(raw.trim());
    CommonValidations.validateIsEmpty(parsedWinningBonusNumber);
    CommonValidations.validateIsInteger(parsedWinningBonusNumber);
    winningSet.bonusOnce = parsedWinningBonusNumber;

    return parsedWinningBonusNumber;
  };

  /**
   * 유효한 구입 금액이 입력될 때까지 반복 입력 받아 Purchase를 반환합니다.
   * @returns {Purchase}
   */
  async #inputPurchaseUntilValid() {
    return this.#inputUntilValid(InputView.inputPurchase, this.#handlePurchase);
  }

  /**
   * 유효한 당첨 번호가 입력될 때까지 반복 입력 받아 WinningSet을 반환합니다.
   * @returns {WinningSet}
   */
  async #inputWinningNumbersUntilValid() {
    return this.#inputUntilValid(
      InputView.inputWinningNumbers,
      this.#handleWinningNumbers
    );
  }

  /**
   * 유효한 보너스 번호가 입력될 때까지 반복 입력하여 WinningSet에 설정합니다.
   * @param {WinningSet} winningSet - 당첨 번호만 설정된 WinningSet 객체
   * @returns {Promise<number>} 설정된 보너스 번호
   */
  async #inputWinningBonusNumberUntilValid(winningSet) {
    return this.#inputUntilValid(InputView.inputBonusNumber, (raw) =>
      this.#handleBonusNumber(winningSet, raw)
    );
  }

  /**
   * 1~45 사이의 무작위 정수 6개로 구성된 로또 번호 배열을 생성합니다.
   * @returns {Array} 로또 번호 배열
   */
  #getRandomNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_MIN_NUMBER,
      LOTTO_MAX_NUMBER,
      LOTTO_NUMBER_COUNT
    );
  }
}

export default LottoController;
