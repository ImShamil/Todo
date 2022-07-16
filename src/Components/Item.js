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
  task, taskCount, setTaskCount, setIsEdit,
}) {
  const [value, setValue] = useState();

  const startEdit = () => {
    axios.patch(`${API_URL}/${task.id}`, {
      isEdit: true,
    });
    setValue(task.task);
    setIsEdit(true);
  };

  const endEdit = (e) => {
    axios.patch(`${API_URL}/${task.id}`, {
      task: (value || task.task),
      isEdit: false,
    });
    setIsEdit(true);
    e.preventDefault();
  };

  const changeNote = (e) => {
    setValue(e.target.value);
  };

  const deleteItem = () => {
    axios.delete(`${API_URL}/${task.id}`);
    setTaskCount(taskCount - 1);
  };

  const handleChange = (e) => {
    axios.patch(`${API_URL}/${task.id}`, {
      isChecked: e.target.checked,
    }).then(setIsEdit(true));
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
          checked={task.isChecked}
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
  task: PropTypes.shape.isRequired,
  taskCount: PropTypes.number.isRequired,
  setTaskCount: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};
export default ItemList;
