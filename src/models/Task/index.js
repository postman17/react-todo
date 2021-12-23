import { createForm } from 'effector-forms';
import {combine} from "effector";
import {isEmptyString} from 'src/lib/lodash';
import {minLength} from 'src/lib/form';
import {appDomain} from "src/models/App";


export const taskDomain = appDomain.createDomain('Task');


export const $taskId = taskDomain.createStore('', { name: 'taskId' });

export const $titleStore = taskDomain.createStore('', { name: 'titleStore' });
export const $descriptionStore = taskDomain.createStore('', { name: 'descriptionStore' });


export const addTaskIdFn = taskDomain.createEvent('addTaskId');
export const restTaskIdFn = taskDomain.createEvent('restTaskIdFn');

export const createTaskFn = taskDomain.createEvent('createTaskFn');
export const updateTaskFn = taskDomain.createEvent('updateTaskFn');
export const handleTaskFn = taskDomain.createEvent('handleTaskFn');

export const addTaskFn = taskDomain.createEvent('addTaskFn');
export const changeTaskFn = taskDomain.createEvent('changeTaskFn');

export const openTaskPageFn = taskDomain.createEvent('openTaskPageFn');
export const closeTaskPageFn = taskDomain.createEvent('closeTaskPageFn');


export const $isTaskFormValid = combine(
    $titleStore, $descriptionStore,
    (title, description) => (
        !isEmptyString(title) && !isEmptyString(description) && minLength(title, 2) && minLength(description, 3)
    )
);

const rules = {
    required: () => ({
        name: "required",
        validator: (value) => ({
            isValid: Boolean(value),
            errorText: "This field is required",
        }),
    }),
    minLength: (min) => ({
        name: "minLength",
        validator: (value) => ({
            isValid: minLength(value, min),
            errorText: `Field length must be greater or equal ${min}`,
        })
    }),
}

export const taskForm = createForm({
    fields: {
        title: {
            rules: [
                rules.required(),
                rules.minLength(2)
            ],
            units: { $value: $titleStore }
        },
        description: {
            rules: [
                rules.required(),
                rules.minLength(3)
            ],
            units: { $value: $descriptionStore }
        },
    },
    validateOn: ['submit', 'blur'],
    units: {
        submit: handleTaskFn
    },
});
