import {forward, sample} from "effector";
import {getDate} from "src/lib/date";
import {notifySuccessFn} from 'src/models/App'
import {
    $tasks, $searchStore, $dateStore, $statusStore,
    $filteredTasks,

    setSearchFn, setDataFn, setStatusFn,
    changeTaskStatusFn, deleteTaskFn, clearSearchFn, clearDataFn,
    clearStatusFn, clearFiltersFn, filterTasksFn
} from "./index";

$tasks
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

$searchStore
    .on(setSearchFn, (_, search) => search)
    .reset(clearSearchFn)
$dateStore
    .on(setDataFn, (_, data) => data)
    .reset(clearDataFn)
$statusStore
    .on(setStatusFn, (_, status) => status)
    .reset(clearStatusFn)


forward({
    from: clearFiltersFn,
    to: [clearSearchFn, clearDataFn, clearStatusFn],
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

forward({
    from: changeTaskStatusFn,
    to: notifySuccessFn.prepend(() => 'Task status changed')
})

forward({
    from: deleteTaskFn,
    to: notifySuccessFn.prepend(() => 'Task deleted')
})