// import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ItemList from './ItemList';

function List() {
  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Box>
      <TextField
        label="Task"
        id="filled-size-normal"
        defaultValue="Task"
        variant="filled"
        onChange={onChange}
      />
      <Button variant="outlined" color="success" size="large">Add</Button>
      <ItemList />
    </Box>
  );
}
export default List;
