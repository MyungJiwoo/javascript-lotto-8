import { ERROR_MESSAGES } from "../src/constants.js";
import WinningSet from "../src/models/WinningSet.js";

describe("당첨 번호 클래스 테스트", () => {
  test("당첨 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new WinningSet([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGES.LOTTO.INVALID_COUNT);
  });

  test("당첨 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new WinningSet([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBER);
  });

  test("당첨 번호에 1~45 이외의 숫자가 문자가 있으면 예외가 발생한다.", () => {
    const invalidCases = [
      [10, 20, 30, 40, 50, 60], // 범위 초과
      [10, 20, 30, 40, 50, "abc"], // 문자 포함
    ];

    invalidCases.forEach((numbers) => {
      expect(() => {
        new WinningSet(numbers);
      }).toThrow(ERROR_MESSAGES.LOTTO.OUT_OF_RANGE);
    });
  });

  test("당첨 번호를 반환한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    expect(winningSet.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("보너스 번호를 반환한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    winningSet.bonusOnce = 10;
    expect(winningSet.bonusNumber).toEqual(10);
  });

  test("보너스 번호와 당첨 번호가 중복되면 예외가 발생한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);

    expect(() => {
      winningSet.bonusOnce = 1;
    }).toThrow(ERROR_MESSAGES.WINNING_SET.DUPLICATE_BONUS);
  });

  test("보너스 번호가 1~45 이외의 숫자나 문자라면 예외가 발생한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    const invalidCases = [
      100, // 범위 초과
      "abc", // 문자 포함
    ];

    invalidCases.forEach((numbers) => {
      expect(() => {
        winningSet.bonusOnce = numbers;
      }).toThrow(ERROR_MESSAGES.LOTTO.OUT_OF_RANGE);
    });
  });

  test("보너스 번호가 설정되기 전에 bonusNumber에 접근하면 예외가 발생한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);

    expect(() => {
      winningSet.bonusNumber;
    }).toThrow(ERROR_MESSAGES.WINNING_SET.BONUS_NOT_SET);
  });

  test("보너스 번호를 두 번 설정하면 예외가 발생한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    winningSet.bonusOnce = 10;

    expect(() => {
      winningSet.bonusOnce = 20;
    }).toThrow(ERROR_MESSAGES.WINNING_SET.BONUS_ALREADY_SET);
  });

  test("당첨 번호와 보너스 번호를 함께 반환한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    winningSet.bonusOnce = 10;

    expect(winningSet.winningSet).toEqual({
      numbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 10,
    });
  });

  test("발행된 로또와 당첨 번호를 비교하여 번호가 일치한 개수와 보너스 번호의 일치 여부를 반환한다.", () => {
    const winningSet = new WinningSet([1, 2, 3, 4, 5, 6]);
    winningSet.bonusOnce = 10;

    const cases = [
      {
        lotto: [1, 2, 3, 10, 11, 12],
        expected: { matchCount: 3, isBonusMatched: true },
      },
      {
        lotto: [1, 2, 3, 4, 5, 6],
        expected: { matchCount: 6, isBonusMatched: false },
      },
      {
        lotto: [10, 11, 12, 13, 14, 15],
        expected: { matchCount: 0, isBonusMatched: true },
      },
      {
        lotto: [20, 21, 22, 23, 24, 25],
        expected: { matchCount: 0, isBonusMatched: false },
      },
    ];

    cases.forEach(({ lotto, expected }) => {
      expect(winningSet.draw(lotto)).toEqual(expected);
    });
  });
});
