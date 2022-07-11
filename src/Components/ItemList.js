// import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ItemList() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
      <TextField
        id="filled-size-normal"
        defaultValue="Task"
        variant="filled"
      />
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
export default ItemList;
