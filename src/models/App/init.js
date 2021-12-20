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
    $filteredStore,
    filterStoreFn,
    clearSearchFn,
    clearDataFn,
    clearStatusFn,
    clearFiltersFn,
    $filtersStore,
} from "./index";
import {getDate} from "../../lib/date";
import {forward, sample} from "effector";

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
}).reset(clearSearchFn)

$dateStore.on(setDataFn, (_, data) => {
    return data
}).reset(clearDataFn)

$statusStore.on(setStatusFn, (_, status) => {
    return status
}).reset(clearStatusFn)

forward({
    from: clearFiltersFn,
    to: [clearSearchFn, clearDataFn, clearStatusFn],
})

$filteredStore.on(filterStoreFn, (_, data) => {
    const filters = data[0];
    const tasks = data[1];
    let tasksArray = tasks;
    if (filters.search) {
        tasksArray = tasks.filter((item) => {
            if (item.title.includes(filters.search) || item.description.includes(filters.search)) return true
            return false
        })
    }
    if (filters.date) {
        tasksArray = tasks.filter((item) => {
            if (getDate(item.created_at) === getDate(filters.date)) return true
            return false
        })
    }
    if (filters.status) {
        tasksArray = tasks.filter((item) => {
            if (item.status === filters.status) return true
            return false
        })
    }
    return tasksArray
})

sample({
    clock: [$filtersStore, $tasks],
    source: [$filtersStore, $tasks],
    target: filterStoreFn,
})
