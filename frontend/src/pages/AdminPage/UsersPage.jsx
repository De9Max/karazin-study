import {useState} from 'react';
import {
    Button,
    Checkbox,
    Container, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Paginator from "../../components/Admin/Paginator.jsx";
import SearchField from "../../components/Admin/SearchField.jsx";
import AdminTemplate from "../../components/Admin/AdminTemplate.jsx";
import {toast} from "react-toastify";
import {useDeleteUserMutation, useEditUserMutation, useGetUsersQuery} from "../../features/admin/adminAPI.js";
import MenuItem from "@mui/material/MenuItem";


function UsersPage() {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const skip = (currentPage - 1) * 10
    const limit = 10
    const {data = [], isLoading, error, refetch} = useGetUsersQuery({skip, limit, query})
    const [deleteUser] = useDeleteUserMutation()
    const [editUser] = useEditUserMutation()

    // useEffect(() => {
    //     refetch()
    // }, [currentPage]);


    const handleCheckboxChange = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleSearch = (query) => {
        setQuery(query)
    }
    const handleChangePage = (page) => {
        setSelectedUsers([])
        setCurrentPage(page);
    };

    const handleDeleteUser = async () => {
        const confirm = window.confirm('Ви впевнені що хочете видалити корисутвачів?')
        if (!confirm) {
            return
        }
        try {
            for (let i = 0; i < selectedUsers.length; i++) {
                await deleteUser(selectedUsers[i]).unwrap()
            }
            toast.success('Корстувачі успішно видалені!')
            refetch()
            setSelectedUsers([])
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    const handleEditUser = async (user, teacher) => {
        const confirm = window.confirm(`Ви впевнені що хочете ${teacher ? 'призначити' : 'зняти з посади'} викадача ${user.name}?`)
        if(!confirm) return
        try {
            await editUser({id: user.id, teacher})
            toast.success(`Корстувач ${user.name} успішно ${teacher ? 'отримав' : 'втратив'} статус викладача`)
        } catch (e) {
            toast.error('Error, please try later')
        }
    }

    return (
        <AdminTemplate>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 30
                }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Список користувачів
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SearchField sx={{width: 300}} searchFunction={handleSearch}/>
                    </div>

                </div>
                {isLoading ? <div>Loading...</div> : error ? <div>{error}</div> : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: 15}}></TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Ім'я</TableCell>
                                <TableCell>Прізвище</TableCell>
                                <TableCell>Пошта</TableCell>
                                <TableCell>Група</TableCell>
                                <TableCell>Викладач</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox sx={{padding: 0}}
                                                  checked={selectedUsers.includes(user.id)}
                                                  onChange={() => handleCheckboxChange(user.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.surname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.usergroup.name}</TableCell>
                                    <TableCell>
                                        <Select
                                            onChange={e => handleEditUser(user, +e.target.value === 1)}
                                            value={user.teacher ? 1 : 0}
                                            style={{height:'30px', width:'70px'}}
                                        >
                                            <MenuItem value={1}>
                                                так
                                            </MenuItem>
                                            <MenuItem value={0}>
                                                ні
                                            </MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                )}
                {selectedUsers.length > 0 && (
                    <Box sx={{
                        marginBottom: 2,
                        marginLeft: 10
                    }}>
                        <Typography variant="h6">Дії з виділеними користувачами</Typography>
                        <Button variant="contained" color="error" onClick={() => handleDeleteUser()}>
                            Видалити
                        </Button>
                    </Box>
                )}
                <Paginator currentPage={currentPage} nextPage={data.has_next} onChangePage={handleChangePage}/>
            </Container>
        </AdminTemplate>
    );
}

export default UsersPage;
