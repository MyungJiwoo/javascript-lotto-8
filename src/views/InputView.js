import { Console } from "@woowacourse/mission-utils";
import { INPUT_PROMPT } from "../constants.js";

export const InputView = {
  inputPurchase: () => Console.readLineAsync(INPUT_PROMPT.purchase),
  inputWinningNumbers: () => Console.readLineAsync(INPUT_PROMPT.winningNumbers),
  inputBonusNumber: () => Console.readLineAsync(INPUT_PROMPT.bonusNumber),
};
