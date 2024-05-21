import {styled} from "@mui/material/styles";
import {Card} from "@mui/material";

export const StyledCard = styled(Card)({
    minWidth: 275,
    margin: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px',
    '&:hover': {
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
});
