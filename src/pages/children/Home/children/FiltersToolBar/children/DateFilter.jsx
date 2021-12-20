import * as React from "react";
import {useStore} from "effector-react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import {$dateStore, setDataFn} from 'src/models/App/index';

const DateFilter = () => {
    const date = useStore($dateStore)
    return (
        <DesktopDatePicker
            label="Created at"
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={setDataFn}
            renderInput={(params) => <TextField {...params} />}
        />
    )
}

export default DateFilter;
