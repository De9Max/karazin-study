import {
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import {serverURL} from "../../features/config.js";
import {StyledCard} from "../Multi/StyledCard.jsx";

function CourseCard({courseData}) {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="200"
                image={`${serverURL}/uploaded/${courseData.image.file_name}`}
                alt={courseData.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {courseData.name}
                </Typography>
                <Typography color="textSecondary">
                    {courseData.description}
                </Typography>
                <Typography variant="body2" component="p">
                    Викладачі:
                    {courseData.teachers.map((teacher, index) => (
                        <div key={index}> {teacher.name} {teacher.surname}</div>
                    ))}
                </Typography>
            </CardContent>
        </StyledCard>
    )
}

export default CourseCard