/* eslint-disable no-unused-vars */
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';

function ItemList({
  index, task, itemsList, setItemsList,
}) {
  const copy = Object.assign([], itemsList);

  const startEdit = () => {
    copy[index].isEdit = true;
    setItemsList(copy);
  };

  const endEdit = () => {
    copy[index].isEdit = false;
    axios.patch(`http://localhost:3001/tasks/${task.id}`, {
      task: copy[index].task,
    });
    // .then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    setItemsList(copy);
  };

  const changeNote = (e) => {
    copy[index].task = e.target.value;
  };

  const deleteItem = (curIndex) => {
    const newItemsList = itemsList.filter((item, itemIndex) => itemIndex !== curIndex);
    axios.delete(`http://localhost:3001/tasks/${task.id}`, {
      task: copy[index].task,
    });
    setItemsList(newItemsList);
  };

  let elem;

  if (!task.isEdit) {
    elem = (<Button onClick={startEdit} variant="text">{task.task}</Button>);
  } else {
    elem = (
      <Input
        onBlur={endEdit}
        onChange={changeNote}
      >
        {task}
      </Input>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
      {elem}
      <IconButton aria-label="delete" size="large" onClick={() => deleteItem(index)}>
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
