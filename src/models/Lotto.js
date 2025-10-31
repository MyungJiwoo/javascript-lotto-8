class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
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

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
