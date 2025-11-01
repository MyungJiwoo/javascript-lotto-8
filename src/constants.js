export const RANK = Object.freeze({
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
});

export const CONDITIONS = Object.freeze({
  [RANK.FIRST]: "6개 일치",
  [RANK.SECOND]: "5개 일치, 보너스 볼 일치",
  [RANK.THIRD]: "5개 일치",
  [RANK.FOURTH]: "4개 일치",
  [RANK.FIFTH]: "3개 일치",
});

export const PRIZE = Object.freeze({
  [RANK.FIRST]: 2_000_000_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.FOURTH]: 50_000,
  [RANK.FIFTH]: 5_000,
});

export const INPUT_PROMPT = Object.freeze({
  purchase: "\n구매할 금액을 입력해 주세요.\n",
  winningNumbers: "\n당첨 번호를 입력해 주세요.\n",
  bonusNumber: "\n보너스 번호를 입력해 주세요.\n",
});

export const OUTPUT_PROMPT = Object.freeze({
  statisticsTitle: "\n당첨 통계\n---",
});

export const ERROR_PREFIX = "[ERROR]";
export const ERROR_MESSAGES = Object.freeze({
  COMMON: {
    EMPTY_INPUT: "입력값이 비어있습니다.",
    NOT_INTEGER: "입력값은 정수여야 합니다.",
  },

  LOTTO: {
    INVALID_COUNT: "로또 번호는 6개여야 합니다.",
    DUPLICATE_NUMBER: "로또 번호는 중복되지 않는 6개의 숫자여야 합니다.",
    OUT_OF_RANGE: "로또 번호는 1~45 사이의 양수여야 합니다.",
  },

  PURCHASE: {
    BELOW_MIN_PRICE: "최소 1000원 이상부터 가능합니다.",
    INVALID_UNIT: "1000원 단위로 가능합니다.",
  },

  STATISTICS: {
    INVALID_RANK: "등수는 1등부터 5등까지만 가능합니다.",
  },

  WINNING_SET: {
    DUPLICATE_BONUS: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
    BONUS_ALREADY_SET: "보너스 번호는 이미 설정되었습니다.",
    BONUS_NOT_SET: "보너스 번호가 아직 설정되지 않았습니다.",
  },
});

export const INITIAL_COUNT = 0;
export const LOTTO_PRICE = 1000;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBER_COUNT = 6;
