export type dictItemType = {
  isStudying: boolean;
  isDifficult: boolean;
  isDeleted: boolean;
  word: string;
  errors: number;
  correct: number;
};

const initialStateDictionary: dictItemType = {
  isStudying: false,
  isDifficult: false,
  isDeleted: false,
  word: "",
  errors: 0,
  correct: 0,
};

const SET_STUDYING = "SET_STUDYING";
const SET_DIFFICULT = "SET_DIFFICULT";
const SET_DELETED = "SET_DELETED";
const SET_ERRORS = "SET_ERRORS";
const SET_CORRECT = "SET_CORRECT";

export default (state = initialStateDictionary, action: any) => {
  switch (action.type) {
    case SET_STUDYING:
      return {
        ...state,
        isStudying: true,
      };
    case SET_DIFFICULT:
      return {
        ...state,
        isDifficult: true,
      };
    case SET_DELETED:
      return {
        ...state,
        isDeleted: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: 1,
      };
    case SET_CORRECT:
      return {
        ...state,
        correct: 1,
      };
    default:
      return state;
  }
};
