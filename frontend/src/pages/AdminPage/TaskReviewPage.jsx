import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {Button, Container, Select, TextField, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {
    useDeleteUserMutation, useEditUserMutation,
    useGetCoursesQuery,
    useGetSolvedTasksQuery,
    useGetTaskByIdQuery, useGetUsersQuery
} from "../../features/admin/adminAPI.js";
import IconButton from "@mui/material/IconButton";
import {Add} from "@mui/icons-material";
import {StyledCard} from "../../components/Multi/StyledCard.jsx";
import MenuItem from "@mui/material/MenuItem";
import UserTasks from "../../components/Admin/UserTasks.jsx";

function TaskReviewPage() {
    const {taskId} = useParams();

    const {data = {}, isLoading} = useGetSolvedTasksQuery(taskId)

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <AdminTemplate>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15,
                    marginTop: 30
                }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Перевірка завдання: "{data.task_info.name}"
                    </Typography>

                </div>
                {/*<Typography style={{whiteSpace: 'pre-line'}}>*/}
                {/*    Тут сначала должно идти описание задачи <br/>*/}
                {/*    Потом список юзеров при клике на юзера будет открываться конкретно его задание,<br/>*/}
                {/*    Поле для ввода 0-100 для оценки ( с оценкой )<br/>*/}
                {/*    Поле для ВЫБОРа из выпадающего списка ( 'Призначено', 'Оцінено' )<br/>*/}
                {/*    Кнопка отправить изменения<br/>*/}
                {/*</Typography>*/}
                <div>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Опис завдання: "{data.task_info.description}"
                    </Typography>
                </div>
                {data.tasks.length === 0 && (
                    <Typography variant="h6" style={{color: '#11d311'}} component="h3" gutterBottom>
                        Завдань на перевірку немає...
                    </Typography>
                )}
                {data.tasks.map(task => <UserTasks task={task} taskId={data.task_info.id} />)}
            </Container>
        </AdminTemplate>
    );
}

export default TaskReviewPage;
