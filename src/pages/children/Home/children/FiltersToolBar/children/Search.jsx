import * as React from "react";
import {useStore} from "effector-react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
    $searchStore,
    setSearchFn, filterTasksFn
} from 'src/models/ToDoList/index';


const Search = () => {
    const search = useStore($searchStore);
    return (
        <>
            <InputBase
                value={search}
                sx={{ml: 1, flex: 1}}
                placeholder="Search task"
                onChange={setSearchFn.prepend(e => e.target.value)}
            />
            <IconButton type="submit" sx={{p: '10px'}} aria-label="search" onClick={filterTasksFn}>
                <SearchIcon/>
            </IconButton>
        </>
    )
}

export default Search;