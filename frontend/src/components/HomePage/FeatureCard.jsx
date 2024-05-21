import React from 'react';
import {Card, CardContent, Typography, Box, Icon} from '@mui/material';

const FeatureCard = ({icon, title, description}) => {
    return (
        <Card>
            <CardContent>
                <Box alignItems="center" mb={2}>
                    <Icon component={icon} color="primary" style={{fontSize: 40, marginRight: 16}}/>
                    <Typography variant="h6" component="h3">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" paragraph={true}>
                    {description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br/>
                        </React.Fragment>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;