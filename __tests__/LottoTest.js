import { ERROR_MESSAGES } from "../src/constants.js";
import Lotto from "../src/models/Lotto.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGES.LOTTO.INVALID_COUNT);
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBER);
  });

  test("로또 번호에 1~45 이외의 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([10, 20, 30, 40, 50, 60]);
    }).toThrow(ERROR_MESSAGES.LOTTO.OUT_OF_RANGE);
  });

  test("로또 번호를 반환한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
