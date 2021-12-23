import {forward, guard, sample, split} from "effector";
import {spread} from "patronum/spread";
import {isTaskIdExist} from 'src/lib/lodash';
import {EMPTY_TASK} from "src/dict/tasks";
import {$tasks, clearFiltersFn} from "src/models/ToDoList";
import {pushHistoryFn, notifySuccessFn} from "src/models/App";
import {
    $descriptionStore, $titleStore, $taskId,
    createTaskFn, addTaskIdFn, addTaskFn,
    changeTaskFn, handleTaskFn, updateTaskFn, openTaskPageFn,
    closeTaskPageFn, restTaskIdFn,
    taskForm
} from './index'


$tasks
    .on(addTaskFn, (state, task) => [...state, task])
    .on(changeTaskFn, (state, id, task) => {
        let newState = [...state]
        newState[id] = task
        return newState
    })

$taskId
    .on(addTaskIdFn, (_, value) => value)
    .reset(restTaskIdFn)


forward({
    from: addTaskFn,
    to: clearFiltersFn
})

guard({
    clock: openTaskPageFn,
    filter: id => id,
    target: addTaskIdFn
});

sample({
    clock: addTaskIdFn,
    source: $tasks,
    fn: (tasks, id) => {
        const task = tasks[id];
        return {
            title: task.title,
            description: task.description
        }
    },
    target: spread({
        targets: {
          title: $titleStore,
          description: $descriptionStore
        },
    })
})

sample({
    clock: createTaskFn,
    source: [$titleStore, $descriptionStore],
    fn: ([title, description], _) => {
        const task = {...EMPTY_TASK};
        task.title = title;
        task.description = description;
        return task
    },
    target: addTaskFn
})

sample({
    clock: updateTaskFn,
    source: [$tasks, $titleStore, $descriptionStore, $taskId],
    fn: ([tasks, title, description, id]) => {
        const newTasks = [...tasks];
        let task = newTasks[id];
        task.title = title;
        task.description = description;
        return task
    },
    target: changeTaskFn
})

split({
    source: sample({source: $taskId, clock: handleTaskFn}),
    match: id => isTaskIdExist(id),
    cases: {
        false: createTaskFn,
        true: updateTaskFn
    }
})

forward({
    from: addTaskFn,
    to: notifySuccessFn.prepend(() => 'New task created')
})

forward({
    from: changeTaskFn,
    to: notifySuccessFn.prepend(() => 'Task updated')
})

forward({
    from: closeTaskPageFn,
    to: taskForm.reset
})

forward({
    from: handleTaskFn,
    to: pushHistoryFn.prepend(_ => '/')
})
