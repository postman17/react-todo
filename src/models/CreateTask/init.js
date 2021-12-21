import {forward, guard, sample} from "effector";
import { checkTitle, checkDescription } from 'src/helpers/validation';
import {EMPTY_TASK} from "src/dict/tasks";
import {addTaskFn} from "src/models/App";
import {
    $descriptionStore, $titleStore, $formButtonVisible,
    $formTitleError, $formDescriptionError,

    setTitleErrorFn, createTaskFn, hideButtonFn,
    resetTitleErrorFn, addTitleFn, addDescriptionFn,
    setDescriptionErrorFn, resetDescriptionErrorFn, showButtonFn
} from './index'

$titleStore.on(addTitleFn, (_, title) => title)
$descriptionStore.on(addDescriptionFn, (_, description) => description)

$formButtonVisible
    .on(hideButtonFn, (_) => true)
    .on(showButtonFn, (_) => false)

$formTitleError.on(setTitleErrorFn, () => 'Title length must be more than 2').reset(resetTitleErrorFn)
$formDescriptionError.on(setDescriptionErrorFn, () => 'Description length must be more than 3').reset(resetDescriptionErrorFn)


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