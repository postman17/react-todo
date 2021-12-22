import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {setSearchFn, filterTasksFn} from 'src/models/ToDoList/index';

const Search = () => (
        <>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search task"
            onChange={setSearchFn.prepend(e => e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={filterTasksFn}>
            <SearchIcon />
          </IconButton>
        </>
    )

export default Search;