import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useState } from "react";

const Search = (props) => {
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
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() =>  props.changeFilters({key: 'search', value: searchValue})}>
            <SearchIcon />
          </IconButton>
        </>
    )
}

export default Search;