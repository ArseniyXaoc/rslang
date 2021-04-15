export type bookPaginationType = {
  group: number;
  page: number;
};

const initialStateBook: bookPaginationType = {
  group: 0,
  page: 0,
};

const SET_GROUP = "SET_GROUP";
const SET_PAGE = "SET_PAGE";

export default (state = initialStateBook, action: any) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        // group: getCurrGroup(listItem from Menu),
      };
    case SET_PAGE:
      return {
        ...state,
        // page: getCurrPage(from Pagination),
      };
    default:
      return state;
  }
};
