import { LOTTO_PRICE } from "../constants.js";
import { PurchaseValidations } from "../validations.js";

class Purchase {
  #purchase;

  constructor(purchase) {
    this.#validate(purchase);
    this.#purchase = purchase;
  }

  #validate(purchase) {
    PurchaseValidations.validateMinPurchase(purchase);
    PurchaseValidations.validatePurchaseAmountUnit(purchase);
  }

  getPurchase() {
    return this.#purchase;
  }

  getLottoCount() {
    return this.#purchase / LOTTO_PRICE;
  }
}

export default Purchase;
