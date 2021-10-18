export const processReducer = (state = {}, action) => {
  switch (action.type) {
    //returns updated state
    case "PROCESS":
      return { ...action.payload };
    //else the current state is retained
    default:
      return state;
  }
};
