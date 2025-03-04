import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface CustomDropdownProps {
  label: string;
  menuItems: string[]; // Array of objects with 'value' and 'label'
  setOuterTarget: (value: string) => void;
  width?: string; // Optional width prop
}

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
          borderColor: '#9EF300',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#9EF300',
      },
  },
  '& .MuiInputLabel-root': {
      '&.Mui-focused': {
          color: '#9EF300',
      },
  },
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  menuItems,
  setOuterTarget,
  width = '100%', // Default to 100% width if not provided
}) => {
  return (
    <TextField
      select
      label={label}
      fullWidth
      onChange={(e) => setOuterTarget(e.target.value)}
      margin="normal"
      defaultValue={menuItems[0]}
      sx={{ width, ...textFieldStyles}}
    >
      {menuItems.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomDropdown;