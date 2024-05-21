import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft} from "@mui/icons-material";

const Paginator = ({currentPage, nextPage, onChangePage}) => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <IconButton onClick={() => {
                onChangePage(currentPage - 1);
            }} disabled={currentPage === 1}>
                <KeyboardArrowLeft/>
            </IconButton>
            <IconButton onClick={() => {
                onChangePage(currentPage + 1)
            }} disabled={!nextPage}>
                <KeyboardArrowRight/>
            </IconButton>
        </div>
    );
};

export default Paginator;