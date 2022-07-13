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
  const [taskCount, setTaskCount] = useState();
  const [isEdit, setIsEdit] = useState(false);

  function getData() {
    axios.get(API_URL).then((resp) => {
      const tasks = resp.data;
      setItemsList(tasks);
      setTaskCount(tasks.length);
    });
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    const newItem = {
      task: value,
      isEdit: false,
      isChecked: false,
    };

    if (value !== '') {
      axios.post(
        API_URL,
        newItem,
      );
    }
    setTaskCount(taskCount + 1);
    setValue('');
    e.preventDefault();
  };

  useEffect(() => {
    getData();
    setIsEdit(false);
  }, [taskCount, isEdit]);

  return (
    <Paper variant="outlined">
      <Box sx={{
        width: 'sm',
        padding: '15px',
      }}
      >
        <form onSubmit={onSubmit}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
          >
            <TextField
              sx={{
                width: 300,
                mr: '15px',
              }}
              label="Task"
              id="filled-size-normal"
              placeholder="Task"
              variant="outlined"
              onChange={onChange}
              value={value}
            />
            <Button
              sx={{
                width: 200,
              }}
              type="submit"
              variant="outlined"
              color="success"
              size="large"
            >
              Add

            </Button>
          </Box>
        </form>
        {itemsList.map((item, index) => (
          <ItemList
            index={index}
            task={item}
            itemsList={itemsList}
            setItemsList={setItemsList}
            taskCount={taskCount}
            setTaskCount={setTaskCount}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
        ))}

      </Box>
    </Paper>
  );
}
export default List;
