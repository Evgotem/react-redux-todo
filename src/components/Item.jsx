import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({ text, completed, onDelete, onClickChecked, updateTask }) => {

  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          onChange={onClickChecked}
          checked={completed}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton onClick={updateTask}>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
