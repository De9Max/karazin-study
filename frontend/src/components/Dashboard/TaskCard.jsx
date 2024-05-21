import {CardContent, Card, Typography, Button} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledTaskCard = styled(Card)({
    minWidth: 250,
    margin: '10px',
    padding: '10px',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px',
    '&:hover': {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },
});

const TaskCard = ({task, send}) => {
    return (
        <StyledTaskCard>
            <CardContent>
                <Typography variant="h6" component="div">
                    {task.name}
                </Typography>
                <Typography color="textSecondary">
                    {task.description}
                </Typography>
                <Typography variant="body2" component="p">
                    Статус: {task.state}
                </Typography>
                {task.state != "Оцінено" ? null :
                    <Typography variant="body2" component="p">
                        Оцінка: {task.score || '0'}/{task.max_score}
                    </Typography>
                }
                {task.state == 'Призначено' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => send(task.id)}
                    >
                        Позначити як виконане
                    </Button>
                )}
            </CardContent>
        </StyledTaskCard>
    )

}


export default TaskCard;