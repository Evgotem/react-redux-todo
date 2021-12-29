
export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload,
          id: state.length ? state[state.length - 1].id + 1 : 1
        }
      ];

    case 'DELETE_TASK':
      return state.filter(item => (
        item.id !== action.payload
      ));

    case 'TOGGLE_COMPLETE':
      return state.map(obj => obj.id === action.payload
        ?
        {
          ...obj,
          completed: !obj.completed
        }
        :
        obj
      );

    case 'CLEAR_ALL_TASKS':
      return [];

    case 'SET_CHECKED_ALL':
      if (state.every(obj => obj.completed === true)) {
        return state.map(obj => {
          return {
            ...obj,
            completed: false
          }
        })
      }
      return state.map(obj => {
        return {
          ...obj,
          completed: true
        }
      })


    default:
      return state;
  }
}