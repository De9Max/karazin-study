import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CardContent,
    CardMedia, Chip,
    Table, TableBody, TableCell,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import {serverURL} from "../../features/config.js";
import {StyledCard} from "../Multi/StyledCard.jsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {toast} from "react-toastify";
import {
    useActionToCourseMutation,
    useDeleteTaskMutation,
    useGetGroupsQuery,
    useGetTeachersQuery
} from "../../features/admin/adminAPI.js";
import DropdownChip from "./ChipAdd.jsx";

export default function AdminCourseCard({courseData, refetch}) {
    const [expanded, setExpanded] = useState(false)
    const {data: all_groups} = useGetGroupsQuery()
    const {data: teachers} = useGetTeachersQuery()
    const [deleteTask] = useDeleteTaskMutation()
    const [actionToCourse] = useActionToCourseMutation()

    const deleteTaskHandler = async (taskId) => {
        const confirm = window.confirm(`Ви впевнені, що хочете видалити завдання "${courseData.name}"?`)
        if (!confirm) return
        try {
            await deleteTask(taskId).unwrap()
            toast.success('Задача успішно видалена!')
            refetch()
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    const addTeacherHandler = async (course_id, spec_type, spec_id) => {
        try {
            await actionToCourse({action: "add", course_id, spec_type, spec_id}).unwrap()
            toast.success('Успіх!')
            refetch()
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    const handleTeacherDelete = async (course_id, spec_type, spec_id) => {
        try {
            await actionToCourse({action: "remove", course_id, spec_type, spec_id}).unwrap()
            toast.success('Успіх!')
            refetch()
        } catch (e) {
            toast.error('Error, please try later')
        }
    }
    return (
        <>
            <StyledCard style={{width: '100%', boxShadow: 'none'}}>
                <Accordion expanded={expanded}>
                    <AccordionSummary>

                        <div style={{width: '100%'}} onClick={(e) => e.stopPropagation()}>
                            <CardMedia
                                component="img"
                                height="200"
                                style={{width: '100%'}}
                                image={`${serverURL}/uploaded/${courseData.image.file_name}`}
                                alt={courseData.name}
                            />
                            <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>

                                <div>
                                    <Typography variant="h5" component="div">
                                        {courseData.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {courseData.description}
                                    </Typography>
                                </div>
                                <div style={{width: '80vh'}}>
                                    {courseData.groups && (
                                        <>
                                            <Typography>Групи:</Typography>
                                            {courseData.groups.map(group => (
                                                <Chip key={group.id} label={group.name} color="secondary"
                                                      onDelete={() => {
                                                          handleTeacherDelete(courseData.id, "group", group.id)
                                                      }}
                                                />
                                            ))}
                                            <DropdownChip course_id={courseData.id} spec_type="group"
                                                          values={all_groups} current_values={courseData.groups}
                                                          handleChip={addTeacherHandler}/>
                                        </>
                                    )}
                                    {courseData.teachers && (
                                        <>
                                            <Typography>Викладачі:</Typography>
                                            {courseData.teachers.map(user => (
                                                <Chip key={user.id} label={`${user.name} ${user.surname}`}
                                                      color="primary"
                                                      onDelete={() => {
                                                          handleTeacherDelete(courseData.id, "teacher", user.id)
                                                      }}
                                                />
                                            ))}
                                            <DropdownChip course_id={courseData.id} spec_type="teacher"
                                                          values={teachers} current_values={courseData.teachers}
                                                          handleChip={addTeacherHandler}/>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <IconButton color="primary" size="small" component={Link}
                                                to={`/admin/courses/tasks/create/${courseData.id}`}>
                                        <AddIcon/>
                                    </IconButton>
                                    <IconButton color="primary" size="small">
                                        <ExpandMoreIcon
                                            style={expanded ? {transform: 'rotate(180deg)'} : {}}
                                            onClick={() => setExpanded(!expanded)}/>
                                    </IconButton>
                                </div>
                            </CardContent>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails>
                        {courseData.tasks && (

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell>Назва</TableCell>
                                        <TableCell>Опис</TableCell>
                                        <TableCell>Максимальний бал</TableCell>
                                        <TableCell>Дії</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courseData.tasks.map(task => (

                                        <TableRow key={task.id}>
                                            <TableCell>{task.id}</TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{task.max_score}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" size="large" component={Link}
                                                            to={`tasks/review/${task.id}`}>
                                                    <SearchIcon/>
                                                </IconButton>
                                                <IconButton color="primary" size="large" component={Link}
                                                            to={`/admin/courses/tasks/edit/${task.id}`}>
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton color="primary" size="large"
                                                            onClick={() => deleteTaskHandler(task.id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                    </AccordionDetails>
                </Accordion>
            </StyledCard>
        </>


    )


}
