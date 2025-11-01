import {
  ERROR_MESSAGES,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
  LOTTO_PRICE,
} from "./constants.js";

export const CommonValidations = {
  validateIsEmpty: (value) => {
    if (value == "") throw new Error(ERROR_MESSAGES.COMMON.EMPTY_INPUT);
  },

  validateIsInteger: (value) => {
    if (!Number.isInteger(value)) {
      throw new Error(ERROR_MESSAGES.COMMON.NOT_INTEGER);
    }
  },
};

export const LottoValidations = {
  validateLottoNumberCount: (numbers) => {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO.INVALID_COUNT);
    }
  },

  validateUniqueLottoNumbers: (numbers) => {
    if (new Set(numbers).size !== LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBER);
    }
  },

  validateLottoNumberRange: (number) => {
    if (isNaN(number) || number > LOTTO_MAX_NUMBER || number < LOTTO_MIN_NUMBER)
      throw new Error(ERROR_MESSAGES.LOTTO.OUT_OF_RANGE);
  },
};

export const PurchaseValidations = {
  validateMinPurchase: (purchase) => {
    if (purchase < LOTTO_PRICE) {
      throw new Error(ERROR_MESSAGES.PURCHASE.BELOW_MIN_PRICE);
    }
  },

  validatePurchaseAmountUnit: (purchase) => {
    if (purchase % LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE.INVALID_UNIT);
    }
  },
};

export const StatisticsValidations = {
  validateRankRange: (statistics, rank) => {
    if (!statistics.has(rank))
      throw new Error(ERROR_MESSAGES.STATISTICS.INVALID_RANK);
  },
};

export const WinningSetValidations = {
  validateUniqueBonusNumber: (winningNumbers, bonusNumber) => {
    if (winningNumbers.includes(bonusNumber))
      throw new Error(ERROR_MESSAGES.WINNING_SET.DUPLICATE_BONUS);
  },

  validateBonusNumberNotAlreadySet: (bonusNumber) => {
    if (bonusNumber !== null) {
      throw new Error(ERROR_MESSAGES.WINNING_SET.BONUS_ALREADY_SET);
    }
  },

  validateBonusNumberIsSet: (bonusNumber) => {
    if (bonusNumber === null) {
      throw new Error(ERROR_MESSAGES.WINNING_SET.BONUS_NOT_SET);
    }
  },
};
