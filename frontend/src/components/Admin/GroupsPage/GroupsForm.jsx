import {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Container, TextField, Typography} from "@mui/material";
import {styled} from '@mui/system';

const FormCard = styled(Card)({
    minWidth: 275,
    margin: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '5px',
});
export default function GroupsForm({initialData = {}, onSubmit}) {
    const [name, setName] = useState(initialData?.name || '');

    useEffect(() => {
        setName(initialData?.name || '')
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const groupData = {
            name,
        };
        if (initialData?.id) {
            groupData.id = initialData.id
        }
        onSubmit(groupData);
        setName('')
    };

    return (
        <Container>
            <FormCard>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {initialData?.id ? 'Редагувати группу' : 'Створити нову групу'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Назва"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Box>
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary">
                                {initialData?.id ? 'Зберегти зміни' : 'Створити'}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </FormCard>
        </Container>
    );
}