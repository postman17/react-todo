import React, {useEffect} from "react";
import {useStore} from "effector-react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    $formButtonVisible, $formDescriptionError, $formTitleError,
    $buttonText, $descriptionStore, $titleStore,
    addDescriptionFn, addTitleFn, handleTaskFn, openTaskPageFn, closeTaskPageFn
} from "src/models/Task";

const Task = () => {
    const { id } = useParams();
    useEffect(() => {
        openTaskPageFn(id);
        return () => closeTaskPageFn()
    }, [])
    const isButtonVisible = useStore($formButtonVisible);
    const titleError = useStore($formTitleError);
    const descriptionError = useStore($formDescriptionError);
    const buttonText = useStore($buttonText);
    const title = useStore($titleStore);
    const description = useStore($descriptionStore);
    return (
        <form onSubmit={handleTaskFn}>
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
                        label="Description"
                        multiline={true}
                        rows={5}
                        style ={{width: '100%'}}
                        helperText={descriptionError}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button disabled={isButtonVisible} type="submit" size="small">{buttonText}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { Task }