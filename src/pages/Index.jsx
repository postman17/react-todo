import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import TaskCard from '../components/TaskCard'


const Index = (props) => {
    return (
        <Container maxWidth="xl">
            <NavBar />
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                {props.tasks.map((item, index)=>{
                    return (
                        <Grid item style={{ width: '70%'}} key={index}>
                            <TaskCard id={index} changeStatus={props.changeTaskStatus} {...item}/>
                        </Grid>
                    )
                 })}
            </Grid>
        </Container>
    )
}

export { Index };
