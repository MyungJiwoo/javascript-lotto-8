import { Console, Random } from "@woowacourse/mission-utils";
import { InputView } from "../views/InputView.js";
import Purchase from "../models/Purchase.js";
import Lotto from "../models/Lotto.js";
import WinningSet from "../models/WinningSet.js";
import { determineRank, CONDITIONS } from "../models/Rank.js";
import Statistics, { PRIZE } from "../models/Statistics.js";
import { OutputView } from "../views/OutputView.js";
import { CommonValidations } from "../validations.js";

class LottoController {
  async run() {
    // 구입 금액 입력
    const purchase = await this.#inputPurchaseUntilValid();
    const amount = purchase.getLottoCount();

    // 발행한 로또 개수 및 번호 출력
    OutputView.outputAmount(amount);
    const lottos = Array.from(
      { length: amount },
      () => new Lotto(this.#getRandomNumbers())
    );

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      OutputView.outputLotto(numbers);
    });

    // 당첨 번호 입력
    const winningSet = await this.#inputWinningNumbersUntilValid();
    await this.#inputWinningBonusNumberUntilValid(winningSet);

    // 로또 추첨
    const statistics = new Statistics();
    lottos.forEach((lotto) => {
      const { matchCount, isBonusMatched } = winningSet.draw(
        lotto.getNumbers()
      );
      const rank = determineRank(matchCount, isBonusMatched);
      if (rank >= 1 && rank <= 5) statistics.updateStatistics(rank);
    });

    // 당첨 통계 출력
    OutputView.outputStatisticsTitle();
    for (let i = 5; i > 0; i--) {
      OutputView.outputStatistic(
        CONDITIONS[i],
        PRIZE[i].toLocaleString("ko-KR"),
        statistics.getCountByRank(i)
      );
    }

    // 수익률 출력
    OutputView.outputProfitRate(statistics.calculateProfitRate(amount));
  }

  async #inputPurchaseUntilValid() {
    while (true) {
      try {
        const rawPurchase = await InputView.inputPurchase();
        const parsedPurchase = Number(rawPurchase.trim());
        CommonValidations.validateIsEmpty(parsedPurchase);
        CommonValidations.validateIsInteger(parsedPurchase);

        return new Purchase(parsedPurchase);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #inputWinningNumbersUntilValid() {
    while (true) {
      try {
        const rawWinningNumbers = await InputView.inputWinningNumbers();
        CommonValidations.validateIsEmpty(rawWinningNumbers);
        const parsedWinningNumbers = rawWinningNumbers
          .split(",")
          .map((number) => Number(number.trim()));

        return new WinningSet(parsedWinningNumbers);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #inputWinningBonusNumberUntilValid(winningSet) {
    while (true) {
      try {
        const rawWinningBonusNumber = await InputView.inputBonusNumber();
        const parsedWinningBonusNumber = Number(rawWinningBonusNumber.trim());
        CommonValidations.validateIsEmpty(parsedWinningBonusNumber);
        CommonValidations.validateIsInteger(parsedWinningBonusNumber);

        winningSet.setBonusOnce(parsedWinningBonusNumber);
        return parsedWinningBonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  #getRandomNumbers() {
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }
}

export default LottoController;
