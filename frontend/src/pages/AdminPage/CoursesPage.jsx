import {Typography, Container} from '@mui/material';
import {Link} from "react-router-dom"
import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {Add} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import AdminCourseCard from "../../components/Admin/AdminCourseCard.jsx";
import {useGetCoursesQuery} from "../../features/admin/adminAPI.js";


function CoursesPage() {
    const {data = [], refetch} = useGetCoursesQuery();
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
                        Список всіх курсів та завдань
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            <IconButton color="primary" size="large" component={Link} to="/admin/courses/create">
                                <Add/>
                            </IconButton>
                        </div>
                    </div>

                </div>
                {data.map((course, index) => (
                    <div key={index}>
                    {/*<CardActionArea component={Link} to={`/admin/courses/edit/${course.id}`} key={index}>*/}
                        <AdminCourseCard courseData={course} refetch={refetch}/>
                    </div>
                ))}
            </Container>
        </AdminTemplate>
    );
}

export default CoursesPage;
