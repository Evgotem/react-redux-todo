export const addTask = (text, completed) => ({
  type: 'ADD_TASK',
  payload: {
    text,
    completed
  }
})

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  payload: id,
})

export const toggleComplete = id => ({
  type: 'TOGGLE_COMPLETE',
  payload: id,
})

export const clearAllTasks = filterType => ({
  type: 'CLEAR_ALL_TASKS',
  payload: filterType
})

export const setCheckedAll = filterType => ({
  type: 'SET_CHECKED_ALL',
  payload: filterType
})

export const updateTask = (id, text) => ({
  type: 'UPDATE_TASK',
  payload: {
    id,
    updateText: text
  }
})

