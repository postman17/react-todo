import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";

const DateFilter = (props) => {
    const [targetDate, updateTargetDate] = useState(new Date);
    const handleTargetDate = (date) => {
        updateTargetDate(date);
        props.changeFilters({key: 'date', value: date})
    }
    return (
        <DesktopDatePicker
            label="Created at"
            inputFormat="dd/MM/yyyy"
            value={targetDate}
            onChange={handleTargetDate}
            renderInput={(params) => <TextField {...params} />}
        />
    )
}

export default DateFilter;
