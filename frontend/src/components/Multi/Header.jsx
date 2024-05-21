import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {AppRegistration, Login, School} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../features/user/userSlice.js";
import {Button} from "@mui/material";

function Header() {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const location = useLocation()
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar position="fixed">
            <Container maxWidth="xl" sx={{
                paddingRight: 0
            }}>
                <Toolbar disableGutters>
                    <School sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link} to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}

                    >
                        Karazin Study
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            component={Link}
                            to="/dashboard"
                            sx={{my: 0, color: 'white', display: 'block'}}
                        >
                            Головна
                        </Button>
                        <Button
                            component={Link}
                            to="/about_us"
                            sx={{my: 0, color: 'white', display: 'block'}}
                        >
                            О нас
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
                        {user ?
                            <>
                                <Box sx={{mr: 1}}>
                                    <Typography textAlign="center" sx={{p: 0}}>
                                        Привіт, {user?.name} {user?.surname}
                                    </Typography>
                                </Box>

                                <Tooltip title="Open settings">

                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt={`${user?.name} ${user?.surname}`}
                                                src={`https://ui-avatars.com/api/?name=${user?.name}+${user?.surname}`}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    {user.admin ? (<MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" component={Link}
                                                        to="/admin"
                                                        sx={{
                                                            textDecoration: "none",
                                                            color: "inherit"
                                                        }}>Адмін-панель</Typography>
                                        </MenuItem>
                                    ) : null}
                                    <MenuItem onClick={() => {
                                        dispatch(logoutUser())
                                        handleCloseUserMenu()
                                    }}>
                                        <Typography textAlign="center">Вийти</Typography>
                                    </MenuItem>


                                </Menu>
                            </>
                            : location.pathname === '/auth/login' || location.pathname === '/auth/register' ? null :
                                <>
                                    <IconButton to="auth/login" component={Link}
                                                sx={{textDecoration: 'none', color: 'inherit'}}>
                                        <Login/>
                                        <Typography textAlign="center"
                                                    sx={{textDecoration: 'none', color: 'inherit'}}>Увійти</Typography>

                                    </IconButton>
                                    <IconButton to="auth/register" component={Link}
                                                sx={{textDecoration: 'none', color: 'inherit'}}>
                                        <AppRegistration/>
                                        <Typography textAlign="center"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit'
                                                    }}>Реєстрація</Typography>
                                    </IconButton>

                                </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;