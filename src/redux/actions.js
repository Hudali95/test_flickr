export function setSearchFor(value) {
  return {
    type: "SET_SEARCH_FOR",
    payload: value,
  };
}
export function searchQuery(value) {
  return {
    type: "SET_SEARCH_QUERY",
    payload: value,
  };
}
