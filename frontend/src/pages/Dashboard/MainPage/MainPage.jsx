import {useSelector} from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Container
} from '@mui/material';
import DashboardTemplate from "../../../components/Dashboard/DashboardTemplate.jsx";
import {useGetTimeTableQuery} from "../../../features/student/studentAPI.js";

function MainPage() {
    const user = useSelector(store => store.user.user);
    const {data = {}, isLoading} = useGetTimeTableQuery(user.usergroup.id);
    const day_normalizer = {
        "MONDAY": "Понеділок",
        "TUESDAY": "Вівторок",
        "WEDNESDAY": "Середа",
        "THURSDAY": "Четверг",
        "FRIDAY": "П'ятниця"
    }

    const {upper_lower_week, ...days} = data

    if (isLoading) {
        return <CircularProgress/>
    }

    return (

        <DashboardTemplate>
            <Container>
                {user.usergroup.id === 1?(
                    <Typography variant={'h6'} >У вас немає групи. Попросіть викладача назначити вам групу...</Typography>
                ):(
                    <>
                        Тиждень: <b>{upper_lower_week.toLowerCase() === 'верхня' ? 'верхній' : 'нижній'}</b>
                        {Object.keys(days).map((day, key) => (
                            <div key={key}>
                                <Typography variant="h6" gutterBottom>{day_normalizer[day].toUpperCase()}</Typography>
                                {!days[day] ? 'Розклад відсутній' : (
                                    <>
                                        <TableContainer component={Paper} style={{marginBottom: '20px'}}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Номер заняття</TableCell>
                                                        <TableCell>Назва заняття</TableCell>
                                                        <TableCell>Тип заняття</TableCell>
                                                        <TableCell>Викладач</TableCell>
                                                        <TableCell>Посилання</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.keys(data[day]).map((lessonNumber, lessonKey) => (
                                                        <TableRow key={lessonKey}>
                                                            <TableCell>{lessonKey + 1}</TableCell>
                                                            <TableCell>{data[day][lessonNumber]?.lesson_name || '-'}</TableCell>
                                                            <TableCell>{data[day][lessonNumber]?.lesson_type || '-'}</TableCell>
                                                            <TableCell>{data[day][lessonNumber]?.teacher || '-'}</TableCell>
                                                            <TableCell>{data[day][lessonNumber]?.url ?
                                                                <a href={data[day][lessonNumber]?.url}>Посилання</a> : '-'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </Container>
        </DashboardTemplate>

    );
}

export default MainPage;
