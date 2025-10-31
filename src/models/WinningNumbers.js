class WinningNumbers {
  #numbers;
  #bonusNumber = null;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  #validateNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    if (new Set(numbers).size !== 6) {
      throw new Error(
        "[ERROR] 로또 번호는 중복되지 않는 6개의 숫자여야 합니다."
      );
    }

    for (let number of numbers) {
      if (number > 45 || number < 1)
        throw new Error("[ERROR] 로또 번호는 1~45 사이의 양수여야 합니다.");
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (isNaN(bonusNumber) || bonusNumber > 45 || bonusNumber < 1)
      throw new Error("[ERROR] 로또 번호는 1~45 사이의 양수여야 합니다.");

    if (this.#numbers.includes(bonusNumber))
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
  }

  setBonusOnce(bonusNumber) {
    if (this.#bonusNumber !== null) {
      throw new Error("[ERROR] 보너스 번호는 이미 설정되었습니다.");
    }

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    if (this.#bonusNumber === null) {
      throw new Error("[ERROR] 보너스 번호가 아직 설정되지 않았습니다.");
    }
    return this.#bonusNumber;
  }

  getWinningSet() {
    return { numbers: this.#numbers, bonusNumber: this.#bonusNumber };
  }
}

export default WinningNumbers;
