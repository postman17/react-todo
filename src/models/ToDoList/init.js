import {forward, sample} from "effector";
import {getDate} from "src/lib/date";
import {notifySuccessFn} from 'src/models/App'
import {
    filtersDomain,
    $tasks, $searchStore, $dateStore, $statusStore,
    $filteredTasks,
    setSearchFn, setDataFn, setStatusFn,
    changeTaskStatusFn, deleteTaskFn, clearFiltersFn,
    filterTasksFn
} from "./index";


filtersDomain.onCreateStore(store => {
    store.reset(clearFiltersFn);
})

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

$searchStore.on(setSearchFn, (_, search) => search)
$dateStore.on(setDataFn, (_, data) => data)
$statusStore.on(setStatusFn, (_, status) => status)


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
