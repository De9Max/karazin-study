import React from 'react';
import {Box, Container, Typography} from '@mui/material';

const NotFoundPage = () => {
    return (
        <Box>
            <Box sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        Ошибочка вышла....
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default NotFoundPage;