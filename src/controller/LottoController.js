import { Console } from "@woowacourse/mission-utils";
import { InputView } from "../views/InputView.js";
import Purchase from "../models/Purchase.js";

class LottoController {
  async run() {
    // 구입 금액 입력
    const purchase = await this.#inputPurchaseUntilValid();
    const amount = purchase.getLottoCount();

    // 발행한 로또 개수 및 번호 출력
    Console.print(`\n${amount}개를 구매했습니다.`);
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
}

export default LottoController;
