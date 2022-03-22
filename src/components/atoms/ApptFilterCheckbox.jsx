import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ApptFilterCheckbox({
  id, label, dataArray, setFilterValue,
}) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    switch (label) {
      case 'Hospital':
        setFilterValue({ hospital: value });
        break;
      case 'Department':
        setFilterValue({ department: value });
        break;
      case 'Patient':
        setFilterValue({ patient: value });
        break;
      case 'Chaperone':
        setFilterValue({ chaperone: value });
        break;
      case 'Date':
        setFilterValue({ date: value });
        break;
      default:
        console.log('incorrect label');
        break;
    }
  }, [value]);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      options={dataArray}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} id={id} />
      )}
    />
  );
}
