import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const CreateTask = (props) => {
    const [title, updateTitle] = useState('')
    const [description, updateDescription] = useState('')
    const history = useHistory();
    const createTaskAndRedirect = () => {
        props.createTask(title, description)
        history.push('/')
    }
    return (
        <form onSubmit={createTaskAndRedirect}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField required onChange={e => updateTitle(e.target.value)} id="outlined-basic" label="Title" style={{width: '100%'}}/>
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <TextField required onChange={e => updateDescription(e.target.value)} id="outlined-basic" label="Desctiption" multiline={true} rows={5} style ={{width: '100%'}}/>
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button type="submit" size="small">Create</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { CreateTask };