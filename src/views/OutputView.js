import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_PROMPT } from "../constants.js";

export const OutputView = {
  outputAmount: (amount) => Console.print(`\n${amount}개를 구매했습니다.`),

  outputLotto: (lotto) => Console.print(`[${lotto.join(", ")}]`),

  outputStatisticsTitle: () => Console.print(OUTPUT_PROMPT.statisticsTitle),

  outputStatistic: (condition, prize, matchCount) =>
    Console.print(`${condition} (${prize}원) - ${matchCount}개`),

  outputProfitRate: (profitRate) =>
    Console.print(`총 수익률은 ${profitRate}%입니다.`),
};
