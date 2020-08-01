let initialState = { searchFor: "photos", query: "" };

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_FOR":
      return {
        ...state,
        searchFor: action.payload,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
}
