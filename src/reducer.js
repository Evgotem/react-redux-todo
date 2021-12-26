
export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload,
          id: state.length ? state[state.length-1].id + 1 : 1
        }
      ];

    case 'DELETE_TASK':
      return state.filter(item => (
        item.id !== action.payload
      ));

    default:
      return state;
  }
}