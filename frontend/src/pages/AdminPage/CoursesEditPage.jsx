import {useState} from 'react';
import CourseTaskForm from "../../components/Dashboard/CreateForm.jsx";
import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {Container} from "@mui/material";
import {useParams} from "react-router-dom";

function CoursesEditPage() {
    const {courseId} = useParams()
    const [CourseName, setCourseName] = useState('');
    const [CourseDescription, setCourseDescription] = useState('');
    const [CourseImage, setCourseImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null)


    const fields = [
        {name: "Назва курсу", type: "input_text", input: CourseName, set_input: setCourseName},
        {name: "Опис курсу", type: "input_text_big", input: CourseDescription, set_input: setCourseDescription},
        {name: "Зображення курсу", type: "input_image", input: CourseImage, set_input: null},
        {name: "Оновити", type: "button", input: null}
    ]


    return (
        <AdminTemplate>
            <Container>
                <CourseTaskForm form_name="Редагування курсу" fields={fields} imagePreview={imagePreview}/>
            </Container>
        </AdminTemplate>
    );
}

export default CoursesEditPage;
