import React from 'react';
import Grid from '@mui/material/Grid';
import FiltersToolbar from './children/FiltersToolBar/FiltersToolbar'
import TaskList from './children/TaskList/TaskList'

const Home = () => (
        <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
            <FiltersToolbar />
            <TaskList />
        </Grid>
    )

export { Home };
