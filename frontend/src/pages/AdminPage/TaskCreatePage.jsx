import {useState} from 'react';
import CourseTaskForm from "../../components/Dashboard/CreateForm.jsx";
import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {CircularProgress, Container} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useCreateTaskMutation} from "../../features/admin/adminAPI.js";
import {useGetCourseByIdQuery} from "../../features/student/studentAPI.js";

function TaskCreatePage() {
    const {courseId} = useParams();
    const [TaskName, setTaskName] = useState('');
    const [TaskDescription, setTaskDescription] = useState('');
    const [TaskMaxScore, setTaskMaxScore] = useState(100);
    const {data, isLoading} = useGetCourseByIdQuery(courseId)

    const [createTask] = useCreateTaskMutation()
    const navigate = useNavigate()

    const handleCreate = async () => {
        const data = {
            name: TaskName,
            description: TaskDescription,
            max_score: +TaskMaxScore,
            course_id: +courseId,
        }
        try {
            await createTask(data).unwrap()
            toast.success('Задача успішно створена')
            navigate('/admin/courses')
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    const fields = [
        {name: "Назва завдання", type: "input_text", input: TaskName, set_input: setTaskName},
        {name: "Опис завдання", type: "input_text_big", input: TaskDescription, set_input: setTaskDescription},
        {name: "Максимальний бал", type: "input_text_big", input: TaskMaxScore, set_input: setTaskMaxScore},
        {name: "Створити", type: "button", input: handleCreate}
    ]

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <AdminTemplate>
            <Container>
                <CourseTaskForm
                    form_name={`Створити нове завдання на курсі ${data.name}`}
                    fields={fields} />
            </Container>
        </AdminTemplate>
    );
}

export default TaskCreatePage;
