import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { setStatusFn } from 'src/models/ToDoList/index';

const StatusFilter = () => (
        <FormControl style={{ width: '20%', marginLeft: 10 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            onChange={setStatusFn.prepend(e => e.target.value)}
          >
            <MenuItem value={''}>-----</MenuItem>
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'Closed'}>Closed</MenuItem>
          </Select>
        </FormControl>
    )

export default StatusFilter;
