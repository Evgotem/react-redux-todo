import React from 'react';

import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, clearAllTasks, deleteTask, setCheckedAll, toggleComplete, updateTask } from './redux/actions/tasks';


function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [inputValue, setInputValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [filterBy, setFilterBy] = React.useState('all');

  React.useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state.tasks))
  }, [state])

  const filterIndex = {
    all: 0,
    active: 1,
    completed: 2,
  };

  const handleClickAdd = () => {
    if (inputValue.trim()) {
      dispatch(addTask(inputValue, isChecked));
      setInputValue('');
      setIsChecked(false);
    }
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickDelete = (id) => {
    if (window.confirm(`Вы хотите удалить "${state.tasks.find((item) => item.id === id).text}"?`))
      dispatch(deleteTask(id));
  };

  const onClickCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const onClickChecked = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleClearAll = () => {
    let deleteText = 'Удалить все задачи?';
    if (filterBy === 'active') {
      deleteText = 'Удалить все активные задачи?';
    }
    if (filterBy === 'completed') {
      deleteText = 'Удалить все завершенные задачи?';
    }
    if (window.confirm(deleteText)) {
      dispatch(clearAllTasks(filterBy));
    }
  };

  const onClickCheckedAll = () => {
    dispatch(setCheckedAll(filterBy));
  };

  const handleTaskUpdate = (id) => {
    let updateText = prompt('Изменить текст задачи?', [state.tasks.find((obj) => obj.id === id).text]);
    dispatch(updateTask(id, updateText));
  };

  const isDisabled = () => {
    if (filterBy === 'all' && state.tasks.length === 0) {
      return true;
    }
    if (filterBy === 'active' && state.tasks.every((item) => item.completed === true)) {
      return true;
    }
    if (filterBy === 'completed' && state.tasks.every((item) => item.completed === false)) {
      return true;
    }
    return false;
  };

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
          onClickAdd={handleClickAdd}
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
          {state.tasks
            .filter((obj) => {
              if (filterBy === 'completed') {
                return obj.completed;
              }
              if (filterBy === 'active') {
                return !obj.completed;
              }
              return true;
            })
            .map((obj) => (
              <Item
                key={obj.id}
                text={obj.text}
                completed={obj.completed}
                onDelete={() => handleClickDelete(obj.id)}
                onClickChecked={() => onClickChecked(obj.id)}
                updateTask={() => handleTaskUpdate(obj.id)}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={isDisabled()} onClick={onClickCheckedAll}>
            {state.tasks.every((obj) => obj.completed === true) ? 'Снять отметки' : 'Отметить все'}
          </Button>
          <Button disabled={isDisabled()} onClick={handleClearAll}>
            Очистить все
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
