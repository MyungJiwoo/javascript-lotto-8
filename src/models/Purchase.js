class Purchase {
  #purchase;

  constructor(purchase) {
    this.#validate(purchase);
    this.#purchase = purchase;
  }

  #validate(purchase) {
    if (purchase < 1000) {
      throw new Error("[ERROR] 최소 1000원 이상부터 가능합니다.");
    }

    if (purchase % 1000 !== 0) {
      throw new Error("[ERROR] 1000원 단위로 가능합니다.");
    }
  }

  getPurchase() {
    return this.#purchase;
  }

  getLottoCount() {
    return this.#purchase / 1000;
  }
}

export default Purchase;
