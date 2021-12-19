import React from 'react';
import Grid from '@mui/material/Grid';
import FiltersToolbar from './children/FiltersToolBar/FiltersToolbar'
import TaskCard from './children/TaskCard/TaskCard'
import {useStore} from "effector-react";
import { $tasks, $filtersStore } from 'src/models/App/index'
import { getDate } from 'src/lib/date';

const Home = () => {
    const tasks = useStore($tasks);
    const filters = useStore($filtersStore);
    const filteredTasks = () => {
        let tasksArray = tasks;
        if (filters.search) {
            tasksArray = tasks.filter((item) => {
                if (item.title.includes(filters.search) || item.description.includes(filters.search)) return true
                return false
            })
        }
        if (filters.date) {
            tasksArray = tasks.filter((item) => {
                if (getDate(item.created_at) === getDate(filters.date)) return true
                return false
            })
        }
        if (filters.status) {
            tasksArray = tasks.filter((item) => {
                if (item.status === filters.status) return true
                return false
            })
        }
        return tasksArray
    }
    return (
        <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
            <FiltersToolbar />
            {filteredTasks().map((item, index)=>{
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
