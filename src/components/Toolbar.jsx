import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Search from './Search'
import DateFilter from './DateFilter';
import StatusFilter from './StatusFilter';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

const FiltersToolbar = (props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Toolbar disableGutters style={{ width: '50%' }}>
                <Paper style={{ width: '100%', padding: 11}}>
                    <Search changeFilters={props.changeFilters}/>
                    <DateFilter changeFilters={props.changeFilters}/>
                    <StatusFilter changeFilters={props.changeFilters}/>
                </Paper>
            </Toolbar>
        </LocalizationProvider>
    )
}

export default FiltersToolbar;