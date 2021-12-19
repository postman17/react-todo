import React from 'react';
import Grid from '@mui/material/Grid';
import FiltersToolbar from './children/FiltersToolBar/FiltersToolbar'
import TaskCard from './children/TaskCard/TaskCard'


const Home = (props) => {
    return (
        <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
            <FiltersToolbar changeFilters={props.changeFilters}/>
            {props.tasks().map((item, index)=>{
                return (
                    <Grid item style={{ width: '70%'}} key={index}>
                        <TaskCard id={index} changeStatus={props.changeTaskStatus} deleteTask={props.deleteTask} {...item}/>
                    </Grid>
                )
             })}
        </Grid>
    )
}

export { Home };
