import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ItemList from './Item';

function List() {
  const [itemsList, setItemsList] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    console.log(value);
    if (value !== '') {
      axios.post('http://localhost:3001/tasks', { task: value })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      setValue('');
    }
    e.preventDefault();
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/tasks';
    axios.get(apiUrl).then((resp) => {
      const tasks = resp.data;
      setItemsList(tasks);
    });
  }, [setItemsList]);
  console.log(itemsList);

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <TextField
          label="Task"
          id="filled-size-normal"
          defaultValue="Task"
          variant="filled"
          onChange={onChange}
        />
        <Button type="submit" variant="outlined" color="success" size="large">Add</Button>
        {itemsList.map((item) => <ItemList item={item.task} />)}
      </form>
    </Box>
  );
}
export default List;
