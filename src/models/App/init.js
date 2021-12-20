import {forward, sample} from "effector";
import { EMPTY_TASK } from 'src/dict/tasks';
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
    clearSearchFn,
    clearDataFn,
    clearStatusFn,
    clearFiltersFn,
    $titleStore,
    addTitleFn,
    $descriptionStore,
    addDescriptionFn,
    createTaskFn,
    $tempSearchStore,
    setTempSearchFn,
    setTempSearchToSearchFn,
} from "./index";

$tasks
    .on(addTaskFn, (state, task) => [...state, task])
    .on(changeTaskStatusFn, (state, id) => {
        let newState = [...state]
        newState[id].status = newState[id].status === 'Active' ? 'Closed' : 'Active';
        return newState
    })
    .on(deleteTaskFn, (state, id) => {
        let newState = [...state]
        newState.splice(id, 1);
        return newState
    })
$searchStore.on(setSearchFn, (_, search) => search).reset(clearSearchFn)
$dateStore.on(setDataFn, (_, data) => data).reset(clearDataFn)
$statusStore.on(setStatusFn, (_, status) => status).reset(clearStatusFn)
$titleStore.on(addTitleFn, (_, title) => title)
$descriptionStore.on(addDescriptionFn, (_, description) => description)
$tempSearchStore.on(setTempSearchFn, (_, search) => search)

forward({
    from: clearFiltersFn,
    to: [clearSearchFn, clearDataFn, clearStatusFn],
})

sample({
    clock: createTaskFn,
    source: [$titleStore, $descriptionStore],
    fn: (sourceData, _) => {
        const task = {...EMPTY_TASK};
        task.title = sourceData[0];
        task.description = sourceData[1];
        return task
    },
    target: addTaskFn
})

forward({
    from: addTaskFn,
    to: clearFiltersFn
})

sample({
    clock: setTempSearchToSearchFn,
    source: $tempSearchStore,
    target: setSearchFn
})