/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';

const API_URL = process.env.REACT_APP_API_ADDRESS;

function ItemList({
  index, task, itemsList, setItemsList,
}) {
  const copy = Object.assign([], itemsList);
  const [value, setValue] = useState(task.task);

  const startEdit = () => {
    copy[index].isEdit = true;
    setItemsList(copy);
  };

  const endEdit = (e) => {
    copy[index].isEdit = false;
    copy[index].task = value;
    setItemsList(copy);
    if (value !== '') {
      axios.patch(`${API_URL}/${task.id}`, {
        task: value,
      });
    }
    e.preventDefault();
  };

  const changeNote = (e) => {
    setValue(e.target.value);
  };

  const deleteItem = (curIndex) => {
    const newItemsList = itemsList.filter((item, itemIndex) => itemIndex !== curIndex);
    setItemsList(newItemsList);
    axios.delete(`${API_URL}/${task.id}`);
  };

  let elem;

  if (!task.isEdit) {
    elem = (
      <Button
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
          onChange={changeNote}
          onBlur={endEdit}
          value={value}
        />
        <Button
          type="submit"
          variant="outlined"
          color="success"
          size="large"
        >
          Change

        </Button>
      </form>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
      {elem}
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => deleteItem(index)}
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
};
export default ItemList;
