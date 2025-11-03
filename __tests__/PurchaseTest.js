import { ERROR_MESSAGES } from "../src/constants.js";
import Purchase from "../src/models/Purchase.js";

describe("Purchase 클래스 테스트", () => {
  test("1,000원 미만의 금액이라면 예외가 발생한다.", () => {
    const invalidInputs = [300, 999, 100.5, "700"];

    invalidInputs.forEach((input) => {
      expect(() => new Purchase(input)).toThrow(
        ERROR_MESSAGES.PURCHASE.BELOW_MIN_PRICE
      );
    });
  });

  test("1,000원 단위로 나눠지지 않으면 예외가 발생한다.", () => {
    expect(() => {
      new Purchase(10500);
    }).toThrow(ERROR_MESSAGES.PURCHASE.INVALID_UNIT);
  });

  test("지불한 금액을 반환한다.", () => {
    const purchase = new Purchase(10000);
    expect(purchase.purchase).toEqual(10000);
  });

  test("구매할 수 있는 로또 개수를 반환한다.", () => {
    const purchase = new Purchase(10000);
    expect(purchase.lottoCount).toEqual(10);
  });
});
