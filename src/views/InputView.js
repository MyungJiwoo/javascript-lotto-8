import { Console } from "@woowacourse/mission-utils";

export const InputView = {
  inputPurchase: () =>
    Console.readLineAsync("\n구매할 금액을 입력해 주세요.\n"),

  inputWinningNumbers: () =>
    Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n"),

  inputBonusNumber: () =>
    Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n"),
};
