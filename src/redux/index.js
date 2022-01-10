import { createStore, combineReducers } from 'redux';
import { tasksReducer } from './reducers/tasks';

const rootReducer = combineReducers({
  tasks: tasksReducer
})

const store = createStore(rootReducer);
console.log(store.getState());
export default store;
