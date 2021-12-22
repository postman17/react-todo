import {forward, sample} from "effector";
import {changeTaskStatusFn, deleteTaskFn} from "src/models/ToDoList";
import { addTaskFn, changeTaskFn } from 'src/models/Task';
import {
    $alertText,
    $isAlertVisible,
    addAlertTextFn,
    resetAlertTextFn,
    resetVisibleForAlertFn,
    setVisibleForAlertFn
} from "./index";

$alertText
    .on(addAlertTextFn, (_, text) => text)
    .reset(resetAlertTextFn)

$isAlertVisible
    .on(setVisibleForAlertFn, () => true)
    .reset(resetVisibleForAlertFn)


forward({
    from: resetVisibleForAlertFn,
    to: resetAlertTextFn
})


forward({
    from: addTaskFn,
    to: setVisibleForAlertFn
})

sample({
    clock: setVisibleForAlertFn,
    fn: () => {
        return 'Task created!'
    },
    target: addAlertTextFn
})

forward({
    from: changeTaskFn,
    to: setVisibleForAlertFn
})

sample({
    clock: setVisibleForAlertFn,
    fn: () => {
        return 'Task updated!'
    },
    target: addAlertTextFn
})

forward({
    from: changeTaskStatusFn,
    to: setVisibleForAlertFn
})

sample({
    clock: setVisibleForAlertFn,
    fn: () => {
        return 'Task status changed!'
    },
    target: addAlertTextFn
})

forward({
    from: deleteTaskFn,
    to: setVisibleForAlertFn
})

sample({
    clock: setVisibleForAlertFn,
    fn: () => {
        return 'Task deleted!'
    },
    target: addAlertTextFn
})