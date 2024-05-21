import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupPageTableBodyItem from "./GroupPageTableBodyItem.jsx";

export default function GroupsPageTable({data, handleDeleteGroup, handleEditGroup, updateUserGroup}) {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Список груп</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(group => (
                    <TableRow key={group.id}>
                        <TableCell>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{group.name}</Typography>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEditGroup(group)}
                                        style={{marginLeft: 'auto'}}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteGroup(group.id)}
                                        style={{marginRight: '10px'}}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Ім'я</TableCell>
                                                <TableCell>Прізвище</TableCell>
                                                <TableCell>Пошта</TableCell>
                                                <TableCell>Дії</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <GroupPageTableBodyItem group={group} groups={data}
                                                                    updateUserGroup={updateUserGroup}/>
                                        </TableBody>
                                    </Table>
                                </AccordionDetails>
                            </Accordion>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
