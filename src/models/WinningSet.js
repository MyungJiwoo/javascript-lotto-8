import { LottoValidations, WinningSetValidations } from "../validations.js";

class WinningSet {
  #numbers;
  #bonusNumber = null;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  #validateNumbers(numbers) {
    LottoValidations.validateLottoNumberCount(numbers);
    LottoValidations.validateUniqueLottoNumbers(numbers);
    for (let number of numbers) {
      LottoValidations.validateLottoNumberRange(number);
    }
  }

  #validateBonusNumber(bonusNumber) {
    LottoValidations.validateLottoNumberRange(bonusNumber);
    WinningSetValidations.validateUniqueBonusNumber(this.#numbers, bonusNumber);
  }

  setBonusOnce(bonusNumber) {
    WinningSetValidations.validateBonusNumberNotAlreadySet(this.#bonusNumber);

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    WinningSetValidations.validateBonusNumberIsSet(this.#bonusNumber);

    return this.#bonusNumber;
  }

  getWinningSet() {
    return { numbers: this.#numbers, bonusNumber: this.#bonusNumber };
  }

  draw(lotto) {
    const matchCount = this.#numbers.filter((number) =>
      lotto.includes(number)
    ).length;
    const isBonusMatched = lotto.includes(this.#bonusNumber);
    return { matchCount, isBonusMatched };
  }
}

export default WinningSet;
