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
    return this.#purchase / 1000;
  }
}

export default Purchase;
