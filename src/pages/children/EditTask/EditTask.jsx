import React, {useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import {useStore} from "effector-react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    $titleStore, $descriptionStore, $formButtonVisible,
    $formDescriptionError, $formTitleError,

    updateTaskFn, fillTitleAndDescriptionFn,
    addDescriptionFn, addTitleFn,
} from 'src/models/EditTask'

const EditTask = () => {
    const { id } = useParams();
    useEffect(() => {
        fillTitleAndDescriptionFn(id);
    }, []);
    const title = useStore($titleStore);
    const description = useStore($descriptionStore);
    const isButtonVisible = useStore($formButtonVisible);
    const titleError = useStore($formTitleError);
    const descriptionError = useStore($formDescriptionError);
    const history = useHistory();
    const changeTaskAndRedirect = () => {
        updateTaskFn(id)
        history.push('/');
    }
    return (
        <form onSubmit={changeTaskAndRedirect}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        required
                        value={title}
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
                        value={description}
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
                    <Button disabled={isButtonVisible} type="submit" size="small">Update</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { EditTask };