import * as React from "react";
import {useStore} from "effector-react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { $statusStore, setStatusFn } from 'src/models/ToDoList/index';


const StatusFilter = () => {
    const status = useStore($statusStore);
    return (
        <FormControl style={{ width: '20%', marginLeft: 10 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                value={status}
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
}

export default StatusFilter;
