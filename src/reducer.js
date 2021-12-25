
export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: state.length ? state.length : 0,
          text: action.payload.text,
          completed: action.payload.completed
        }
      ];

    default:
      return state;
  }
}