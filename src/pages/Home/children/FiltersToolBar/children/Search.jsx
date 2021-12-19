import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useState } from "react";
import { setSearchFn } from 'src/models/App/index';

const Search = () => {
    const [searchValue, updateSearchValue] = useState('');
    const updateSearchValueByEvent = (e) => {
        updateSearchValue(e.target.value);
    }
    return (
        <>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search task"
            onChange={updateSearchValueByEvent}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() => setSearchFn(searchValue)}>
            <SearchIcon />
          </IconButton>
        </>
    )
}

export default Search;