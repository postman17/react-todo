import React from 'react';
import Grid from '@mui/material/Grid';
import FiltersToolbar from './children/FiltersToolBar/FiltersToolbar'
import TaskCard from './children/TaskCard/TaskCard'
import {useStore} from "effector-react";
import {$filteredStore} from 'src/models/App/index'

const Home = () => {
    const filteredData = useStore($filteredStore);
    return (
        <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
            <FiltersToolbar />
            {filteredData.map((item, index)=>{
                return (
                    <Grid item style={{ width: '70%'}} key={index}>
                        <TaskCard id={index} {...item}/>
                    </Grid>
                )
             })}
        </Grid>
    )
}

export { Home };
