import { LOTTO_PRICE } from "../constants.js";
import { PurchaseValidations } from "../validations.js";

class Purchase {
  #purchase;

  constructor(purchase) {
    this.#validate(purchase);
    this.#purchase = purchase;
  }

  /**
   * 구입 금액을 검증합니다.
   * @param {number} purchase - 구입 금액
   * @throws {Error} 유효하지 않은 경우 예외가 발생
   */
  #validate(purchase) {
    PurchaseValidations.validateMinPurchase(purchase);
    PurchaseValidations.validatePurchaseAmountUnit(purchase);
  }

  /**
   * 구입 금액을 반환합니다.
   * @returns {number} 구입 금액
   */
  get purchase() {
    return this.#purchase;
  }

  /**
   * 구입 개수를 반환합니다.
   * @returns {number} 구입 개수
   */
  get lottoCount() {
    return this.#purchase / LOTTO_PRICE;
  }
}

export default Purchase;
