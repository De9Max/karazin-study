import {useEffect, useState} from 'react';
import CourseTaskForm from "../../components/Dashboard/CreateForm.jsx";
import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {Container} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useEditTaskMutation, useGetTaskByIdQuery} from "../../features/admin/adminAPI.js";

function TaskEditPage() {
    const {taskId} = useParams();
    const [TaskName, setTaskName] = useState('');
    const [TaskDescription, setTaskDescription] = useState('');
    const [TaskMaxScore, setTaskMaxScore] = useState(100);

    const { data = {}, isLoading } = useGetTaskByIdQuery(taskId)
    const [editTask] = useEditTaskMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            setTaskName(data.name || '');
            setTaskDescription(data.description || '');
            setTaskMaxScore(data.max_score || 100);
        }
    }, [data]);

    const handleUpdate = async () => {
        const data = {
            taskId,
            name: TaskName,
            description: TaskDescription,
            max_score: TaskMaxScore
        }
        // TODO: add validate
        try {
            await editTask(data).unwrap()
            toast.success('Задача успішно оновлена!')
            navigate('/admin/courses')
            window.location.reload()
        } catch (e) {
            console.log(e)
            toast.error('Сталася помилка, спробуйте пізніше')
        }
    }

    const fields = [
        {name: "Назва таски", type: "input_text", input: TaskName, set_input: setTaskName},
        {name: "Опис таски", type: "input_text_big", input: TaskDescription, set_input: setTaskDescription},
        {name: "Максимальний бал", type: "input_text_big", input: TaskMaxScore, set_input: setTaskMaxScore},
        {name: "Створити", type: "button", input: handleUpdate}
    ]

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <AdminTemplate>
            <Container>
                <CourseTaskForm form_name={`Редагувати завдання "${data.name}"`} fields={fields} />
            </Container>
        </AdminTemplate>
    );
}

export default TaskEditPage;
