import {forward, guard, sample} from "effector";
import { spread } from 'patronum/spread';
import {$filteredTasks, $tasks, changeTaskFn} from "src/models/App";
import {checkDescription, checkTitle, titleErrorText, descriptionErrorText} from "src/helpers/validation";
import {
    $descriptionStore, $titleStore, $formButtonVisible,
    $formDescriptionError, $formTitleError,

    updateTaskFn, fillTitleAndDescriptionFn, addTitleFn,
    addDescriptionFn, resetTitleFn, resetDescriptionFn,
    hideButtonFn, resetDescriptionErrorFn, resetTitleErrorFn,
    setDescriptionErrorFn, setTitleErrorFn, showButtonFn
} from './index'


$titleStore.on(addTitleFn, (_, title) => title).reset(resetTitleFn)
$descriptionStore.on(addDescriptionFn, (_, description) => description).reset(resetDescriptionFn)

$formButtonVisible
    .on(hideButtonFn, (_) => true)
    .on(showButtonFn, (_) => false)

$formTitleError.on(setTitleErrorFn, () => titleErrorText).reset(resetTitleErrorFn)
$formDescriptionError.on(setDescriptionErrorFn, () => descriptionErrorText).reset(resetDescriptionErrorFn)

sample({
    clock: updateTaskFn,
    source: [$tasks, $titleStore, $descriptionStore],
    fn: ([tasks, title, description], id) => {
        const newTasks = [...tasks];
        let task = newTasks[id];
        task.title = title;
        task.description = description;
        return task
    },
    target: changeTaskFn
})

sample({
    clock: fillTitleAndDescriptionFn,
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
    filter: (title, description) => (!checkTitle(title) && !checkDescription(description)),
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