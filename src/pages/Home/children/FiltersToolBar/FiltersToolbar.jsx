import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Search from './children/Search'
import DateFilter from './children/DateFilter';
import StatusFilter from './children/StatusFilter';

const FiltersToolbar = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Toolbar disableGutters style={{ width: '50%' }}>
                <Paper style={{ width: '100%', padding: 11}}>
                    <Search />
                    <DateFilter />
                    <StatusFilter />
                </Paper>
            </Toolbar>
        </LocalizationProvider>
    )
}

export default FiltersToolbar;