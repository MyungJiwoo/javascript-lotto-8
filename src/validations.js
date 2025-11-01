export const CommonValidations = {
  validateIsEmpty: (value) => {
    if (value == "") throw new Error("[ERROR] 입력값이 비어있습니다.");
  },

  validateIsInteger: (value) => {
    if (!Number.isInteger(value)) {
      throw new Error("[ERROR] 입력값은 정수여야 합니다.");
    }
  },
};

export const LottoValidations = {
  validateLottoNumberCount: (numbers) => {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  },

  validateUniqueLottoNumbers: (numbers) => {
    if (new Set(numbers).size !== 6) {
      throw new Error(
        "[ERROR] 로또 번호는 중복되지 않는 6개의 숫자여야 합니다."
      );
    }
  },

  validateLottoNumberRange: (number) => {
    if (isNaN(number) || number > 45 || number < 1)
      throw new Error("[ERROR] 로또 번호는 1~45 사이의 양수여야 합니다.");
  },
};

export const PurchaseValidations = {
  validateMinPurchase: (purchase) => {
    if (purchase < 1000) {
      throw new Error("[ERROR] 최소 1000원 이상부터 가능합니다.");
    }
  },

  validatePurchaseAmountUnit: (purchase) => {
    if (purchase % 1000 !== 0) {
      throw new Error("[ERROR] 1000원 단위로 가능합니다.");
    }
  },
};

export const StatisticsValidations = {
  validateRankRange: (statistics, rank) => {
    if (!statistics.has(rank))
      throw new Error("[ERROR] 등수는 1등부터 5등까지만 가능합니다.");
  },
};

export const WinningSetValidations = {
  validateUniqueBonusNumber: (winningNumbers, bonusNumber) => {
    if (winningNumbers.includes(bonusNumber))
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
  },

  validateBonusNumberNotAlreadySet: (bonusNumber) => {
    if (bonusNumber !== null) {
      throw new Error("[ERROR] 보너스 번호는 이미 설정되었습니다.");
    }
  },

  validateBonusNumberIsSet: (bonusNumber) => {
    if (bonusNumber === null) {
      throw new Error("[ERROR] 보너스 번호가 아직 설정되지 않았습니다.");
    }
  },
};
