import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ItemList from './Item';

const API_URL = process.env.REACT_APP_API_ADDRESS;

function List() {
  const [itemsList, setItemsList] = useState([]);
  const [value, setValue] = useState();
  const getData = () => {
    axios.get(API_URL).then((resp) => {
      const tasks = resp.data;
      setItemsList(tasks);
    });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    const newItem = {
      // id: idNumber,
      task: value,
      isEdit: false,
    };
    if (value !== '') {
      axios.post(
        API_URL,
        newItem,
      );
    }
    setValue('');
    setItemsList([...itemsList, newItem]);
    e.preventDefault();
  };

  useEffect(() => {
    getData();
    console.log('Use effect1');
  }, [setItemsList]);

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
            value={value}
          />
          <Button
            type="submit"
            variant="outlined"
            color="success"
            size="large"
          >
            Add

          </Button>
        </form>
        {itemsList.map((item, index) => (
          <ItemList
            index={index}
            task={item}
            itemsList={itemsList}
            setItemsList={setItemsList}

          />
        ))}

      </Box>
    </Paper>
  );
}
export default List;
