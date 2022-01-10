const initialState = JSON.parse(localStorage.getItem('state'));

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload,
          id: state.length ? state[state.length - 1].id + 1 : 1,
        },
      ];

    case 'DELETE_TASK':
      return state.filter((item) => item.id !== action.payload);

    case 'TOGGLE_COMPLETE':
      return state.map((obj) =>
        obj.id === action.payload
          ? {
            ...obj,
            completed: !obj.completed,
          }
          : obj,
      );

    case 'CLEAR_ALL_TASKS':
      if (action.payload === 'active') {
        return state.filter((item) => item.completed === true);
      }
      if (action.payload === 'completed') {
        return state.filter((item) => item.completed === false);
      }
      return [];

    case 'SET_CHECKED_ALL':
      if (action.payload === 'completed' || state.every((obj) => obj.completed === true)) {
        return state.map((obj) => {
          return {
            ...obj,
            completed: false,
          };
        });
      }

      return state.map((obj) => {
        return {
          ...obj,
          completed: true,
        };
      });

    case 'UPDATE_TASK':
      return state.map((obj) => {
        return obj.id === action.payload.id
          ? {
            ...obj,
            text: action.payload.updateText,
          }
          : obj;
      });

    default:
      return state;
  }
}