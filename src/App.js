import React from 'react';

import { reducer } from './reducer';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [inputValue, setInputValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [filterBy, setFilterBy] = React.useState('all');

  const filterIndex = {
    'all': 0,
    'active': 1,
    'completed': 2
  }

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
    if (window.confirm('Удалить все задачи?')) {
      dispatch({
        type: 'CLEAR_ALL_TASKS'
      })
    }
  }

  const setCheckedAll = () => {
    dispatch({
      type: 'SET_CHECKED_ALL'
    })
  }

  const updateTask = id => {
    let updateText = prompt('Изменить текст задачи?', [state.find(obj => obj.id === id).text])

    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id,
        updateText
      }
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
        <Tabs value={filterIndex[filterBy]}>
          <Tab onClick={() => setFilterBy('all')} label="Все" />
          <Tab onClick={() => setFilterBy('active')} label="Активные" />
          <Tab onClick={() => setFilterBy('completed')} label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.filter(obj => {
            if (filterBy === 'completed') {
              return obj.completed;
            }
            if (filterBy === 'active') {
              return !obj.completed;
            }
            return true;
          }).map((obj) => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onDelete={() => onDeleteTask(obj.id)}
              onClickChecked={() => toggleComplete(obj.id)}
              updateTask={() => updateTask(obj.id)}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={!state.length} onClick={setCheckedAll}>
            {
              state.every(obj => obj.completed === true)
                ?
                'Снять отметки'
                :
                'Отметить все'
            }
          </Button>
          <Button disabled={!state.length} onClick={clearAllTasks}>Очистить все</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
