import axios from 'axios';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutline from '@mui/icons-material/DoneOutline';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

const API_URL = process.env.REACT_APP_API_ADDRESS;

function ItemList({
  index, task, itemsList, setItemsList, taskCount, setTaskCount, setIsEdit,
}) {
  const copy = Object.assign([], itemsList);
  const [value, setValue] = useState(task.task);
  const [checked, setChecked] = useState(task.isChecked);

  const startEdit = () => {
    copy[index].isEdit = true;
    setItemsList(copy);
  };

  const endEdit = (e) => {
    copy[index].isEdit = false;
    copy[index].task = value;
    if (value !== '') {
      axios.patch(`${API_URL}/${task.id}`, {
        task: value,
      });
    }
    setIsEdit(true);
    e.preventDefault();
  };

  const changeNote = (e) => {
    setValue(e.target.value);
  };

  const deleteItem = () => {
    delete copy[index];
    axios.delete(`${API_URL}/${task.id}`);
    setTaskCount(taskCount - 1);
    setItemsList(copy);
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    copy[index].isChecked = e.target.checked;
    axios.patch(`${API_URL}/${task.id}`, {
      isChecked: e.target.checked,
    });
    setIsEdit(true);
  };

  let elem;

  if (!task.isEdit) {
    elem = (
      <Button
        sx={{
          color: 'black',
          textTransform: 'none',
          fontSize: '1rem',
        }}
        onClick={startEdit}
        variant="text"
      >
        {task.task}
      </Button>
    );
  } else {
    elem = (
      <form onSubmit={endEdit}>
        <Input
          sx={{
            width: 370,
          }}
          onChange={changeNote}
          onBlur={endEdit}
          value={value}
        />
        <IconButton
          aria-label="delete"
          size="large"
          type="submit"
        >
          <DoneOutline />
        </IconButton>
      </form>
    );
  }
  return (
    <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
      <Box sx={{
        display: 'flex',
      }}
      >
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {elem}
      </Box>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={deleteItem}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
ItemList.propTypes = {
  index: PropTypes.number.isRequired,
  task: PropTypes.shape.isRequired,
  setItemsList: PropTypes.func.isRequired,
  itemsList: PropTypes.shape.isRequired,
  taskCount: PropTypes.number.isRequired,
  setTaskCount: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};
export default ItemList;
