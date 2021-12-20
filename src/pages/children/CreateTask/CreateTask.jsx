import React from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {createTaskFn, addTitleFn, addDescriptionFn} from 'src/models/App';

const CreateTask = () => {
    const history = useHistory();
    const createTaskAndRedirect = () => {
        createTaskFn()
        history.push('/');
    }
    return (
        <form onSubmit={createTaskAndRedirect}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField required onChange={addTitleFn.prepend(e => e.target.value)} id="outlined-basic" label="Title" style={{width: '100%'}}/>
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <TextField required onChange={addDescriptionFn.prepend(e => e.target.value)} id="outlined-basic" label="Desctiption" multiline={true} rows={5} style ={{width: '100%'}}/>
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button type="submit" size="small">Create</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { CreateTask };
