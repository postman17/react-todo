import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { setStatusFn } from 'src/models/App/index';

const StatusFilter = () => {
    const handleChange = (e) => {
        setStatusFn(e.target.value);
    }
    return (
        <FormControl style={{ width: '20%', marginLeft: 10 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={''}>-----</MenuItem>
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'Closed'}>Closed</MenuItem>
          </Select>
        </FormControl>
    )
}

export default StatusFilter;
