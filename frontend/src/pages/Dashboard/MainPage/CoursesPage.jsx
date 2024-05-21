import {Typography, Container, CardActionArea, Grid} from '@mui/material';
import {Link} from "react-router-dom"
import DashboardTemplate from "../../../components/Dashboard/DashboardTemplate.jsx";
import CourseCard from "../../../components/Dashboard/CourseCard.jsx";
import {useGetCoursesQuery} from "../../../features/student/studentAPI.js";

function CoursesPage() {
    const {data = []} = useGetCoursesQuery();
    return (

        <DashboardTemplate>
            <Container>
                <Typography variant="h4" component="h4">
                    Ваші курси:
                </Typography>
                {data.map((course, index) => (
                    <CardActionArea component={Link} to={`/dashboard/courses/${course.id}`} key={index}>
                        <CourseCard courseData={course}/>
                    </CardActionArea>
                ))}
            </Container>
        </DashboardTemplate>
    );
}

export default CoursesPage;
