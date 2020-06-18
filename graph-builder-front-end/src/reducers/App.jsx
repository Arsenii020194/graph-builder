const reducer = (state = {}, action) => {
  debugger
  switch (action.type) {
    case 'HELLO_REACT':
      return { ...state, say : 'Hello World Redux'  };
    default:
      return state;
  }

};

export default reducer;
