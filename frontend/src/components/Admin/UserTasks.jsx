import {Button, TextField} from "@mui/material";
import {StyledCard} from "../Multi/StyledCard.jsx";
import {useState} from "react";
import {useSetScoreMutation} from "../../features/admin/adminAPI.js";
import {toast} from "react-toastify";

const UserTasks = ({task, taskId}) => {
    const [score, setScore] = useState(task.user_score || 0)
    const [setScoreQuery] = useSetScoreMutation()

    const handleSetScore = async (e) => {
        e.preventDefault()
        try {
            await setScoreQuery({taskId, userId: task.user.id, score, state: 'Оцінено'}).unwrap()
            toast.success('Оцінка виставлена!')
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    return (
        <StyledCard key={task.id} style={{width: '100%', boxShadow: 'true', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <div>{task.user.name} {task.user.surname}</div>
                <div>{task.user.usergroup.name}</div>
                <div style={{color: '#11d311'}}>{task.user_state}</div>
            </div>
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <TextField
                    fullWidth
                    label="Оцінка"
                    variant="outlined"
                    value={score}
                    onChange={(e) => setScore(+e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" onClick={handleSetScore}>
                    оцінити
                </Button>
            </div>
        </StyledCard>
    );
};

export default UserTasks