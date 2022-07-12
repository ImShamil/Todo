import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ItemList from './Item';

function List() {
  const [itemsList, setItemsList] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    if (value !== '') {
      axios.post('http://localhost:3001/tasks', {
        id: itemsList.length + 1,
        task: value,
        isEdit: false,
      });
      // .then((res) => {
      //   console.log(res);
      //   console.log(res.data);
      // });
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
  }, [value]);

  return (
    <Paper variant="outlined">
      <Box>
        <form onSubmit={onSubmit}>
          <TextField
            label="Task"
            id="filled-size-normal"
            placeholder="Task"
            variant="outlined"
            onChange={onChange}
          />
          <Button type="submit" variant="outlined" color="success" size="large">Add</Button>
          {itemsList.map((item, index) => (
            <ItemList
              index={index}
              task={item}
              itemsList={itemsList}
              setItemsList={setItemsList}
            />
          ))}
        </form>
      </Box>
    </Paper>
  );
}
export default List;
