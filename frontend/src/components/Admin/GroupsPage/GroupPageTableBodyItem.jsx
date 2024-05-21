import {useState} from "react";
import {Box, Button, FormControl, InputLabel, Select, TableCell, TableRow} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function GroupPageTableBodyItem({group, groups, updateUserGroup}) {
    const [selectedGroupId, setSelectedGroupId] = useState(group.id)
    const handleUpdateGroupButton = (userId, groupId) => {
        updateUserGroup(userId, groupId)
    }

    return (
        <>
            {group.users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.surname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <FormControl fullWidth>
                            <InputLabel>Група</InputLabel>
                            <Select
                                onChange={e => setSelectedGroupId(+e.target.value)}
                            >
                                {groups.map(group => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box mt={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateGroupButton(user.id, selectedGroupId)}
                                >
                                    Перевести
                                </Button>
                            </Box>
                        </FormControl>

                    </TableCell>
                </TableRow>
            ))}
        </>

    )
}
