import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";
import { changeTaskStatusFn, deleteTaskFn } from 'src/models/App/index'

const TaskCard = (props) => {
    const history = useHistory();
    const redirectToEdit = (id) => {
        history.push(`/edit_task/${id}`);
    }
    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.id}
            </Typography>
            <Typography variant="h5" component="div">
                {props.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.status}
            </Typography>
            <Typography variant="body2">
                {props.description}
            </Typography>
            <Typography variant="body2">
                {props.created_at.toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => redirectToEdit(props.id)}>Edit task</Button>
            <Button size="small" onClick={() => changeTaskStatusFn(props.id)}>Change status</Button>
            <Button size="small" color="error" onClick={() => deleteTaskFn(props.id)}>Delete task</Button>
          </CardActions>
        </Card>
    )
}

export default TaskCard;