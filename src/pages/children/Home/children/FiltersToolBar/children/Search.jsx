import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {setTempSearchToSearchFn, setTempSearchFn} from 'src/models/App/index';

const Search = () => (
        <>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search task"
            onChange={setTempSearchFn.prepend(e => e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={setTempSearchToSearchFn}>
            <SearchIcon />
          </IconButton>
        </>
    )

export default Search;