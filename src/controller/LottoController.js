import { Console, Random } from "@woowacourse/mission-utils";
import { InputView } from "../views/InputView.js";
import Purchase from "../models/Purchase.js";
import Lotto from "../models/Lotto.js";
import WinningSet from "../models/WinningSet.js";
import { determineRank, CONDITIONS } from "../models/Rank.js";
import Statistics, { PRIZE } from "../models/Statistics.js";

class LottoController {
  async run() {
    // 구입 금액 입력
    const purchase = await this.#inputPurchaseUntilValid();
    const amount = purchase.getLottoCount();

    // 발행한 로또 개수 및 번호 출력
    Console.print(`\n${amount}개를 구매했습니다.`);
    const lottos = Array.from(
      { length: amount },
      () => new Lotto(this.#getRandomNumbers())
    );

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      Console.print(`[${numbers.join(", ")}]`);
    });

    // 당첨 번호 입력
    const winningSet = await this.#inputWinningNumbersUntilValid();
    const bonusNumber = await this.#inputWinningBonusNumberUntilValid();
    winningSet.setBonusOnce(bonusNumber);

    // 로또 추첨
    const statistics = new Statistics();
    lottos.forEach((lotto) => {
      Console.print(lotto.getNumbers());
      const { matchCount, isBonusMatched } = winningSet.draw(
        lotto.getNumbers()
      );
      const rank = determineRank(matchCount, isBonusMatched);
      if (rank >= 1 && rank <= 5) statistics.updateStatistics(rank);
    });

    // 당첨 통계 출력
    Console.print("\n당첨 통계");
    Console.print("---");
    for (let i = 5; i > 0; i--) {
      Console.print(
        `${CONDITIONS[i]} (${PRIZE[i].toLocaleString(
          "ko-KR"
        )}원) - ${statistics.getCountByRank(i)}개`
      );
    }

    // 수익률 출력
    Console.print(
      `총 수익률은 ${statistics.calculateProfitRate(amount)}%입니다.`
    );
  }

  async #inputPurchaseUntilValid() {
    while (true) {
      try {
        const rawPurchase = await InputView.inputPurchase();
        const parsedPurchase = Number(rawPurchase.trim());

        if (parsedPurchase === "")
          throw new Error("[ERROR] 입력값이 비어있습니다.");

        if (isNaN(parsedPurchase)) {
          throw new Error("[ERROR] 입력값은 정수여야 합니다.");
        }

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
        const parsedWinningNumbers = rawWinningNumbers
          .split(",")
          .map((number) => Number(number.trim()));

        if (parsedWinningNumbers === "")
          throw new Error("[ERROR] 입력값이 비어있습니다.");

        return new WinningSet(parsedWinningNumbers);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #inputWinningBonusNumberUntilValid() {
    while (true) {
      try {
        const rawWinningBonusNumber = await InputView.inputBonusNumber();
        const parsedWinningBonusNumber = Number(rawWinningBonusNumber.trim());

        if (parsedWinningBonusNumber === "")
          throw new Error("[ERROR] 입력값이 비어있습니다.");

        if (isNaN(parsedWinningBonusNumber)) {
          throw new Error("[ERROR] 입력값은 정수여야 합니다.");
        }

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
