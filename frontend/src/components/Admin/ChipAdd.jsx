import React, {useState} from 'react';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const DropdownChip = ({course_id, spec_type, values, current_values, handleChip}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    if (values) {
        values = values.filter(item1 => item1.name !== "Без групи" && item1.name !== "Администратор" && !current_values.some(item2 => item1.id === item2.id));
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOption = (value) => {
        setAnchorEl(null);
        handleChip(course_id, spec_type, value)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'dropdown-chip-popover' : undefined;

    return (
        <>
            <Chip
                icon={<AddIcon/>}
                label="Додати"
                color="secondary"
                variant="outlined"
                onClick={handleClick}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >

                <List>
                    {values && values.map(value => (
                        <ListItem button onClick={() => handleOption(value.id)} key={value.id}>
                            <ListItemText primary={value.surname ? `${value.name} ${value.surname}` : value.name}/>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
};

export default DropdownChip;
