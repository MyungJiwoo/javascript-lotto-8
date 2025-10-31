import WinningNumbers from "../src/models/WinningNumbers";

describe("당첨 번호 클래스 테스트", () => {
  test("당첨 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new WinningNumbers([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new WinningNumbers([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호에 1~45 이외의 숫자가 문자가 있으면 예외가 발생한다.", () => {
    const invalidCases = [
      [10, 20, 30, 40, 50, 60], // 범위 초과
      [10, 20, 30, 40, 50, "abc"], // 문자 포함
    ];

    invalidCases.forEach((numbers) => {
      expect(() => {
        new WinningNumbers(numbers);
      }).toThrow("[ERROR]");
    });
  });

  test("당첨 번호를 반환한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);
    expect(winningNumbers.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("보너스 번호를 반환한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);
    winningNumbers.setBonusOnce(10);
    expect(winningNumbers.getBonusNumber()).toEqual(10);
  });

  test("보너스 번호와 당첨 번호가 중복되면 예외가 발생한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);

    expect(() => {
      winningNumbers.setBonusOnce(1);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 1~45 이외의 숫자나 문자라면 예외가 발생한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);
    const invalidCases = [
      100, // 범위 초과
      "abc", // 문자 포함
    ];

    invalidCases.forEach((numbers) => {
      expect(() => {
        winningNumbers.setBonusOnce(numbers);
      }).toThrow("[ERROR]");
    });
  });

  test("보너스 번호가 설정되기 전에 bonusNumber에 접근하면 예외가 발생한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);

    expect(() => {
      winningNumbers.getBonusNumber();
    }).toThrow("[ERROR]");
  });

  test("보너스 번호를 두 번 설정하면 예외가 발생한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);
    winningNumbers.setBonusOnce(10);

    expect(() => {
      winningNumbers.setBonusOnce(20);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호와 보너스 번호를 함께 반환한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6]);
    winningNumbers.setBonusOnce(10);

    expect(winningNumbers.getWinningSet()).toEqual({
      numbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 10,
    });
  });
});
