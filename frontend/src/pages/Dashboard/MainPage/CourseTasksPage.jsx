import {
    Typography,
    Container,
    CircularProgress, Grid, Button
} from '@mui/material';
import {toast} from "react-toastify";
import DashboardTemplate from "../../../components/Dashboard/DashboardTemplate.jsx";
import {useParams} from "react-router-dom";
import CourseCard from "../../../components/Dashboard/CourseCard.jsx";
import TaskCard from "../../../components/Dashboard/TaskCard.jsx";
import {
    useGetCourseByIdQuery,
    useGetTasksQuery,
    useSendTaskForReviewMutation
} from "../../../features/student/studentAPI.js";


function CourseTasksPage() {
    const {courseId} = useParams()
    const {data: courseData, isLoading: courseLoading} = useGetCourseByIdQuery(courseId);
    const {data: userTasksData, isLoading: tasksLoading} = useGetTasksQuery(courseId);

    const [sendTaskForReview] = useSendTaskForReviewMutation()

    const handleMarkAsCompleted = async (taskId) => {
        try {
            await sendTaskForReview(taskId).unwrap()
            toast.success('Задача відіслана на перевірку')
        } catch (e) {
            toast.error('Сталася помилка, спробуйте пізніше')
        }
    };

    return (

        <DashboardTemplate>
            {courseLoading || tasksLoading
                ? <CircularProgress/> :
                <Container>
                    <CourseCard courseData={courseData}/>
                    <Typography variant="h6" component="div">
                        Ваші задачі:
                    </Typography>
                    {userTasksData.length === 0 && (
                        <Typography variant="h6" component="div">
                            Задачі відсутні
                        </Typography>
                    )}

                    {userTasksData.map(task => (
                        <TaskCard task={task} send={handleMarkAsCompleted} key={task.id}/>
                    ))}
                </Container>

            }
        </DashboardTemplate>
    );
}

export default CourseTasksPage;
