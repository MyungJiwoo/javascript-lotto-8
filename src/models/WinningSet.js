import { LottoValidations, WinningSetValidations } from "../validations.js";

class WinningSet {
  #numbers;
  #bonusNumber = null;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  /**
   * 당첨 번호를 검증합니다.
   * @param {Array} numbers - 당첨 번호 배열
   * @throws {Error} 유효하지 않은 경우 예외가 발생
   */
  #validateNumbers(numbers) {
    LottoValidations.validateLottoNumberCount(numbers);
    LottoValidations.validateUniqueLottoNumbers(numbers);
    for (let number of numbers) {
      LottoValidations.validateLottoNumberRange(number);
    }
  }

  /**
   * 보너스 번호를 검증합니다.
   * @param {number} bonusNumber - 보너스 번호
   * @throws {Error} 유효하지 않은 경우 예외가 발생
   */
  #validateBonusNumber(bonusNumber) {
    LottoValidations.validateLottoNumberRange(bonusNumber);
    WinningSetValidations.validateUniqueBonusNumber(this.#numbers, bonusNumber);
  }

  /**
   * 보너스 번호를 설정합니다.
   * @param {number} bonusNumber - 보너스 번호
   * @throws {Error} 보너스 번호가 이미 설정되어 있는 경우 예외를 발생
   */
  set bonusOnce(bonusNumber) {
    WinningSetValidations.validateBonusNumberNotAlreadySet(this.#bonusNumber);

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  /**
   * 당첨 번호를 반환합니다.
   * @returns {Array} 당첨 번호 배열
   */
  get numbers() {
    return this.#numbers;
  }

  /**
   * 보너스 번호를 반환합니다.
   * @returns {number} 보너스 번호
   * @throws {Error} 보너스 번호가 설정되어 있지 않은 경우 예외를 발생
   */
  get bonusNumber() {
    WinningSetValidations.validateBonusNumberIsSet(this.#bonusNumber);

    return this.#bonusNumber;
  }

  /**
   * 보너스 번호를 반환합니다.
   * @returns {number} 보너스 번호
   */
  get winningSet() {
    return { numbers: this.#numbers, bonusNumber: this.#bonusNumber };
  }

  /**
   * 발행된 로또 번호를 당첨 번호와 보너스 번호로 추첨합니다.
   * @param {Array} lotto 로또 번호 배열
   * @returns {Object} 당첨 번호 일치 개수, 보넌스 번호 일치 여부
   */
  draw(lotto) {
    const matchCount = this.#numbers.filter((number) =>
      lotto.includes(number)
    ).length;
    const isBonusMatched = lotto.includes(this.#bonusNumber);
    return { matchCount, isBonusMatched };
  }
}

export default WinningSet;
