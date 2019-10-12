let initialState = {
  classes: []
};

const ClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CLASS_DATA":
      return {
        ...state,
        classes: action.value
      };
    default:
      return state;
  }
};

export default ClassReducer;
