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

  // 구입 금액 입력 및 Purchase 생성
  async #getPurchase() {
    return await this.#inputPurchaseUntilValid();
  }

  // 구입 금액만큼 로또 발행
  #generateLottos(purchase) {
    const amount = purchase.lottoCount;
    OutputView.outputAmount(amount);

    const lottos = Array.from(
      { length: amount },
      () => new Lotto(this.#getRandomNumbers())
    );

    return lottos;
  }

  // 발행된 로또 출력
  #printLottos(lottos) {
    lottos.forEach((lotto) => OutputView.outputLotto(lotto.numbers));
  }

  // 당첨 번호 + 보너스 번호 입력
  async #getWinningSet() {
    const winningSet = await this.#inputWinningNumbersUntilValid();
    await this.#inputWinningBonusNumberUntilValid(winningSet);
    return winningSet;
  }

  // 로또 추첨 및 통계 계산
  #drawLottos(lottos, winningSet) {
    const statistics = new Statistics();
    lottos.forEach((lotto) => {
      const { matchCount, isBonusMatched } = winningSet.draw(lotto.numbers);
      const rank = determineRank(matchCount, isBonusMatched);
      if (rank >= 1 && rank <= 5) statistics.updateStatistics(rank);
    });
    return statistics;
  }

  // 통계 출력
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

  // 수익률 출력
  #printProfitRate(statistics, amount) {
    OutputView.outputProfitRate(statistics.calculateProfitRate(amount));
  }

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

  #handlePurchase = (raw) => {
    const parsedPurchase = Number(raw.trim());
    CommonValidations.validateIsEmpty(raw);
    CommonValidations.validateIsInteger(Number(raw.trim()));

    return new Purchase(parsedPurchase);
  };

  #handleWinningNumbers = (raw) => {
    CommonValidations.validateIsEmpty(raw);
    const parsedWinningNumbers = raw
      .split(",")
      .map((number) => Number(number.trim()));

    return new WinningSet(parsedWinningNumbers);
  };

  #handleBonusNumber = (winningSet, raw) => {
    const parsedWinningBonusNumber = Number(raw.trim());
    CommonValidations.validateIsEmpty(parsedWinningBonusNumber);
    CommonValidations.validateIsInteger(parsedWinningBonusNumber);
    winningSet.bonusOnce = parsedWinningBonusNumber;

    return parsedWinningBonusNumber;
  };

  async #inputPurchaseUntilValid() {
    return this.#inputUntilValid(InputView.inputPurchase, this.#handlePurchase);
  }

  async #inputWinningNumbersUntilValid() {
    return this.#inputUntilValid(
      InputView.inputWinningNumbers,
      this.#handleWinningNumbers
    );
  }

  async #inputWinningBonusNumberUntilValid(winningSet) {
    return this.#inputUntilValid(InputView.inputPurchase, (raw) =>
      this.#handleBonusNumber(winningSet, raw)
    );
  }

  #getRandomNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_MIN_NUMBER,
      LOTTO_MAX_NUMBER,
      LOTTO_NUMBER_COUNT
    );
  }
}

export default LottoController;
