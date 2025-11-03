import { LottoValidations } from "../validations.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    LottoValidations.validateLottoNumberCount(numbers);
    LottoValidations.validateUniqueLottoNumbers(numbers);
    for (let number of numbers) {
      LottoValidations.validateLottoNumberRange(number);
    }
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
