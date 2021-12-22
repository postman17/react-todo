import {forward, guard, sample, split} from "effector";
import {spread} from "patronum/spread";
import { checkTitle, checkDescription, titleErrorText, descriptionErrorText } from 'src/helpers/validation';
import {isEmptyString, isTaskIdExist} from 'src/lib/lodash';
import {EMPTY_TASK} from "src/dict/tasks";
import {$tasks, clearFiltersFn} from "src/models/ToDoList";
import {pushHistoryFn, notifySuccessFn} from "src/models/App";
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

split({
    source: $titleStore,
    match: title => (checkTitle(title) && !isEmptyString(title)),
    cases: {
        true: setTitleErrorFn,
        false: resetTitleErrorFn
    }
})

split({
    source: $descriptionStore,
    match: description => (checkDescription(description) && !isEmptyString(description)),
    cases: {
        true: setDescriptionErrorFn,
        false: resetDescriptionErrorFn
    }
})

split({
    source: sample([$titleStore, $descriptionStore]),
    match: ([title, description]) => (!checkTitle(title) && !checkDescription(description) && !isEmptyString(title) && !isEmptyString(description)),
    cases: {
        true: showButtonFn,
        false: hideButtonFn
    }
})

forward({
    from: [setTitleErrorFn, setDescriptionErrorFn],
    to: hideButtonFn
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
    to: [resetTitleFn, resetDescriptionFn, hideButtonFn, restTaskIdFn]
})

forward({
    from: handleTaskFn,
    to: pushHistoryFn.prepend(_ => '/')
})
