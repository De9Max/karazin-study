import {useState} from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {Close, Refresh} from "@mui/icons-material";

const SearchField = ({searchFunction}) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        searchFunction(query);
    };


    return (
        <form onSubmit={handleSearch}>
            <TextField
                id='search-bar'
                className='text outline-0'
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                label='Пошук'
                variant='standard'
                placeholder='Пошук'
                size='small'
                value={query}
                InputProps={{
                    endAdornment: (
                        <>
                            {

                                <IconButton onClick={(event) => {
                                    setQuery('')
                                    searchFunction('')
                                }} aria-label='search'>
                                    {query.length > 0 ?
                                        <Close color='gray'/>
                                        :
                                        <Refresh color='primary'/>
                                    }
                                </IconButton>
                            }
                            <IconButton type='submit' aria-label='search'>
                                <SearchIcon color='primary'/>
                            </IconButton>

                        </>
                    )
                }}
            />
        </form>
    );
};

export default SearchField;
