import React, {useEffect} from "react";
import {useStore} from "effector-react";
import {useForm} from "effector-forms";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {isTaskIdExist} from 'src/lib/lodash';
import {
    $isTaskFormValid,
    openTaskPageFn, closeTaskPageFn,
    taskForm
} from "src/models/Task";

const Task = () => {
    const { id } = useParams();
    useEffect(() => {
        openTaskPageFn(id);
        return () => closeTaskPageFn()
    }, [id])
    const { submit, fields, eachValid, hasError, errorText } = useForm(taskForm)
    const isTaskFormValid = useStore($isTaskFormValid);
    const buttonText = isTaskIdExist(id)? 'Update' : 'Create'
    const onSubmit = (e) => {
        e.preventDefault()
        submit()
    }
    return (
        <form onSubmit={onSubmit}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        value={fields.title.value}
                        error={hasError("title")}
                        onBlur={() => fields.title.onBlur()}
                        onChange={(e) => fields.title.onChange(e.target.value)}
                        id="outlined-basic"
                        label="Title"
                        style={{width: '100%'}}
                        helperText={errorText("title")}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        value={fields.description.value}
                        error={hasError("description")}
                        onBlur={() => fields.description.onBlur()}
                        onChange={(e) => fields.description.onChange(e.target.value)}
                        id="outlined-basic"
                        label="Description"
                        multiline={true}
                        rows={5}
                        style ={{width: '100%'}}
                        helperText={errorText("description")}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button disabled={!isTaskFormValid} type="submit" size="small">{buttonText}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { Task }