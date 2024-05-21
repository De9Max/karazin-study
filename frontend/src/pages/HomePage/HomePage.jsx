import React from 'react';
import {Box, Container, Typography, Grid, Button, AppBar, Toolbar} from '@mui/material';
import {styled} from '@mui/system';
import {Link, NavLink} from "react-router-dom";
import FeatureCard from "../../components/HomePage/FeatureCard.jsx";
import {MySQLIcon, PythonIcon, ReactIcon} from "../../components/HomePage/Icons.jsx";

const HeroSection = styled(Box)(({theme}) => ({
    backgroundImage: 'url("https://source.unsplash.com/random/1920x1080/?education,university")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
}));

const HomePage = () => {
    return (
        <Box>
            <HeroSection>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom>
                        Сервіс для дистанційного навчання
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        From students to students
                    </Typography>
                    <Button variant="contained" color="secondary">
                        <NavLink to='/auth/login' style={{textDecoration: "none", color: "inherit"}}>
                        Поїхали
                        </NavLink>
                    </Button>
                </Container>
            </HeroSection>

            <Box py={6}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom mb={5}>
                        Використані бібліотеки
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureCard
                                icon={ReactIcon}
                                title="React"
                                description="Redux
                                Vite
                                MaterialUI Components"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureCard
                                icon={PythonIcon}
                                title="Python"
                                description="FastAPI
                                             SQLAlchemy
                                             Pydantic"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureCard
                                icon={MySQLIcon}
                                title="MySQL"
                                description="Database
                                             PhpMyAdmin
                                             "
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>


            {/* Footer */}
            <Box component="footer" py={3} bgcolor="grey.800" color="common.white">
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center">
                        &copy; {new Date().getFullYear()} Karazin Study
                    </Typography>
                    <Typography variant="body2" align="center">
                        Developed by <Link to="https://t.me/de9_3333"
                                           style={{color: "inherit"}}>De9</Link>&nbsp;
                        <Link to="https://t.me/kstya" style={{color: "inherit"}}>Kostya</Link>&nbsp;
                        <Link to="https://t.me/Glebasta_mashine" style={{color: "inherit"}}>Gleb</Link>
                    </Typography>

                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;