import { LottoValidations } from "../validations.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  /**
   * 로또 번호를 검증합니다.
   * @param {Array} numbers - 로또 번호 배열
   * @throws {Error} 유효하지 않은 경우 예외가 발생
   */
  #validate(numbers) {
    LottoValidations.validateLottoNumberCount(numbers);
    LottoValidations.validateUniqueLottoNumbers(numbers);
    for (let number of numbers) {
      LottoValidations.validateLottoNumberRange(number);
    }
  }

  /**
   * 로또 번호를 반환합니다.
   * @returns {Array} 로또 번호 배열
   */
  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
