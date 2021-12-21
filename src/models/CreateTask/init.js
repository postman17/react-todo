import {forward, guard, sample} from "effector";
import { checkTitle, checkDescription, titleErrorText, descriptionErrorText } from 'src/helpers/validation';
import {EMPTY_TASK} from "src/dict/tasks";
import {addTaskFn, $filteredTasks} from "src/models/App";
import {
    $descriptionStore, $titleStore, $formButtonVisible,
    $formTitleError, $formDescriptionError,

    setTitleErrorFn, createTaskFn, hideButtonFn,
    resetTitleErrorFn, addTitleFn, addDescriptionFn,
    setDescriptionErrorFn, resetDescriptionErrorFn, showButtonFn,
    resetTitleFn, resetDescriptionFn
} from './index'

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