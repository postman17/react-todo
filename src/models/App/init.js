import {forward, sample} from "effector";
import {getDate} from "src/lib/date";

import {
    $tasks, $searchStore, $dateStore, $statusStore,
    $filteredTasks,

    addTaskFn, setSearchFn, setDataFn, setStatusFn,
    changeTaskStatusFn, deleteTaskFn, clearSearchFn, clearDataFn,
    clearStatusFn, clearFiltersFn, filterTasksFn, changeTaskFn
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
    .on(changeTaskFn, (state, id, task) => {
        let newState = [...state]
        newState[id] = task
        return newState
    })

$searchStore.on(setSearchFn, (_, search) => search).reset(clearSearchFn)
$dateStore.on(setDataFn, (_, data) => data).reset(clearDataFn)
$statusStore.on(setStatusFn, (_, status) => status).reset(clearStatusFn)


forward({
    from: clearFiltersFn,
    to: [clearSearchFn, clearDataFn, clearStatusFn],
})

forward({
    from: addTaskFn,
    to: clearFiltersFn
})

sample({
    clock: [filterTasksFn, $tasks, $dateStore, $statusStore],
    source: [$tasks, $searchStore, $dateStore, $statusStore],
    fn: ([tasks, search, date, status], _) => {
        return tasks.filter((item) => {
            if (search) {
                if (!(item.title.includes(search) || item.description.includes(search))) return false
            }
            if (date) {
                if (!(getDate(item.created_at) === getDate(date))) return false
            }
            if (status) {
                if (!(item.status === status)) return false
            }
            return true
        })
    },
    target: $filteredTasks
})
