import {forward, guard, sample} from "effector";
import {spread} from "patronum/spread";
import { checkTitle, checkDescription, titleErrorText, descriptionErrorText } from 'src/helpers/validation';
import {EMPTY_TASK} from "src/dict/tasks";
import {$filteredTasks, $tasks, clearFiltersFn} from "src/models/ToDoList";
import {pushHistoryFn} from "src/models/App";
import {
    $descriptionStore, $titleStore, $formButtonVisible,
    $formTitleError, $formDescriptionError, $buttonText,
    $taskId,
    setTitleErrorFn, createTaskFn, hideButtonFn,
    resetTitleErrorFn, addTitleFn, addDescriptionFn,
    setDescriptionErrorFn, resetDescriptionErrorFn, showButtonFn,
    resetTitleFn, resetDescriptionFn, addTaskIdFn, addTaskFn,
    changeTaskFn, handleTaskFn, updateTaskFn, openTaskPageFn,
    closeTaskPageFn, restTaskIdFn
} from './index'


$tasks
    .on(addTaskFn, (state, task) => [...state, task])
    .on(changeTaskFn, (state, id, task) => {
        let newState = [...state]
        newState[id] = task
        return newState
    })

$titleStore
    .on(addTitleFn, (_, title) => title)
    .reset(resetTitleFn)
$descriptionStore
    .on(addDescriptionFn, (_, description) => description)
    .reset(resetDescriptionFn)

$formButtonVisible
    .on(hideButtonFn, (_) => true)
    .on(showButtonFn, (_) => false)

$formTitleError
    .on(setTitleErrorFn, () => titleErrorText)
    .reset(resetTitleErrorFn)
$formDescriptionError
    .on(setDescriptionErrorFn, () => descriptionErrorText)
    .reset(resetDescriptionErrorFn)

$taskId
    .on(addTaskIdFn, (_, value) => value)
    .reset(restTaskIdFn)


forward({
    from: addTaskFn,
    to: clearFiltersFn
})

guard({
    clock: $titleStore,
    source: $titleStore,
    filter: title => checkTitle(title),
    target: setTitleErrorFn,
})

guard({
    clock: $titleStore,
    source: $titleStore,
    filter: title => !checkTitle(title),
    target: resetTitleErrorFn,
})

guard({
    clock: $descriptionStore,
    source: $descriptionStore,
    filter: description => checkDescription(description),
    target: setDescriptionErrorFn,
})

guard({
    clock: $descriptionStore,
    source: $descriptionStore,
    filter: description => !checkDescription(description),
    target: resetDescriptionErrorFn,
})

guard({
    clock: [$titleStore, $descriptionStore],
    source: [$titleStore, $descriptionStore],
    filter: ([title, description], _) => (!checkTitle(title) && !checkDescription(description)),
    target: showButtonFn,
})

forward({
    from: [setTitleErrorFn, setDescriptionErrorFn],
    to: hideButtonFn
})

forward({
    from: $filteredTasks,
    to: [resetTitleFn, resetDescriptionFn, hideButtonFn, resetTitleErrorFn, resetDescriptionErrorFn]
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

forward({
    from: closeTaskPageFn,
    to: [resetTitleFn, resetDescriptionFn, hideButtonFn, restTaskIdFn]
})

sample({
    clock: openTaskPageFn,
    source: $taskId,
    fn: (_, id) => (!id ? 'Create': 'Update'),
    target: $buttonText
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

guard({
    clock: handleTaskFn,
    source: $taskId,
    filter: (id) => !id,
    target: createTaskFn
})

guard({
    clock: handleTaskFn,
    source: $taskId,
    filter: (id) => id,
    target: updateTaskFn
})

forward({
    from: handleTaskFn,
    to: pushHistoryFn.prepend(_ => '/')
})
