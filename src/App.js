import React from 'react';

import { reducer } from './reducer';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [inputValue, setInputValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  const addTask = () => {
    if (inputValue.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          text: inputValue,
          completed: isChecked,
        },
      });
      setInputValue('');
      setIsChecked(false);
    }
  };

  const onInputChange = event => {
    setInputValue(event.target.value);
  };

  const onDeleteTask = id => {
    if (window.confirm(`Вы хотите удалить "${state.find(item => item.id === id).text}"?`))
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const onClickCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toggleComplete = id => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: id,
    });
  }

  const clearAllTasks = () => {
    dispatch({
      type:'CLEAR_ALL_TASKS'
    })
  }

  const setCheckedAll = () => {
    dispatch({
      type:'SET_CHECKED_ALL'
    })
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          inputValue={inputValue}
          isChecked={isChecked}
          onClickCheckbox={onClickCheckbox}
          onClickAdd={addTask}
          onInputChange={onInputChange}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onDelete={() => onDeleteTask(obj.id)}
              onClickChecked={() => toggleComplete(obj.id)}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={setCheckedAll}>
            {
              state.every(obj => obj.completed === true) 
              ? 
              'Снять отметки'
              :
             'Отметить все'
            }
          </Button>
          <Button onClick={clearAllTasks}>Очистить все</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
