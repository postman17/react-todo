import React from 'react';
import {useStore} from "effector-react";
import Grid from "@mui/material/Grid";
import {$filteredTasks} from 'src/models/App/index'
import TaskCard from './children/TaskCard/TaskCard'

const TaskList = () => {
    const filteredData = useStore($filteredTasks);
    return (
        <>
            {filteredData.map((item, index)=>{
                return (
                    <Grid item style={{ width: '70%'}} key={index}>
                        <TaskCard id={index} {...item}/>
                    </Grid>
                )
             })}
        </>
    )
}

export default TaskList