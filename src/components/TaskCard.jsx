import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TaskCard = (props) => {
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
                {props.created_at}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => props.changeStatus(props.id)}>Change status</Button>
            <Button size="small" color="error" onClick={() => props.deleteTask(props.id)}>Delete task</Button>
          </CardActions>
        </Card>
    )
}

export default TaskCard;