import {
    $tasks,
    addTaskFn,
    setSearchFn,
    setDataFn,
    setStatusFn,
    $searchStore,
    $dateStore,
    $statusStore,
    changeTaskStatusFn,
    deleteTaskFn,
} from "./index";

$tasks.on(addTaskFn, (state, task) => {
    state.push(task);
    return [...state]
})
$tasks.on(changeTaskStatusFn, (state, id) => {
    let newState = [...state]
    newState[id].status = newState[id].status === 'Active' ? 'Closed' : 'Active';
    return newState
})
$tasks.on(deleteTaskFn, (state, id) => {
    let newState = [...state]
    newState.splice(id, 1);
    return newState
})

$searchStore.on(setSearchFn, (_, search) => {
    return search
})

$dateStore.on(setDataFn, (_, data) => {
    return data
})

$statusStore.on(setStatusFn, (_, status) => {
    return status
})
