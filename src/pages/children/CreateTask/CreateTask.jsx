import React from 'react';
import {useStore} from "effector-react";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {
    $formButtonVisible, $formTitleError, $formDescriptionError,

    createTaskFn, addTitleFn, addDescriptionFn,
} from 'src/models/CreateTask';

const CreateTask = () => {
    const isButtonVisible = useStore($formButtonVisible);
    const titleError = useStore($formTitleError);
    const descriptionError = useStore($formDescriptionError);
    const history = useHistory();
    const createTaskAndRedirect = () => {
        createTaskFn()
        history.push('/');
    }
    return (
        <form onSubmit={createTaskAndRedirect}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        required
                        error={titleError}
                        onChange={addTitleFn.prepend(e => e.target.value)}
                        id="outlined-basic"
                        label="Title"
                        style={{width: '100%'}}
                        helperText={titleError}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        required
                        error={descriptionError}
                        onChange={addDescriptionFn.prepend(e => e.target.value)}
                        id="outlined-basic"
                        label="Desctiption"
                        multiline={true}
                        rows={5}
                        style ={{width: '100%'}}
                        helperText={descriptionError}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button disabled={isButtonVisible} type="submit" size="small">Create</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { CreateTask };
