import {appDomain} from "src/models/App";

export const taskDomain = appDomain.createDomain('Task');


export const $taskId = taskDomain.createStore('', { name: 'taskId' });

export const $buttonText = taskDomain.createStore('', { name: 'buttonText' });

export const $titleStore = taskDomain.createStore(null, { name: 'titleStore' });
export const $descriptionStore = taskDomain.createStore(null, { name: 'descriptionStore' });

export const $formButtonVisible = taskDomain.createStore(true, { name: 'formButtonVisible' });
export const $formTitleError = taskDomain.createStore('', { name: 'formTitleError' });
export const $formDescriptionError = taskDomain.createStore('', { name: 'formDescriptionError' });

export const addTaskIdFn = taskDomain.createEvent('addTaskId');
export const restTaskIdFn = taskDomain.createEvent('restTaskIdFn');

export const createTaskFn = taskDomain.createEvent('createTaskFn');
export const updateTaskFn = taskDomain.createEvent('updateTaskFn');
export const handleTaskFn = taskDomain.createEvent('handleTaskFn');
export const addTitleFn = taskDomain.createEvent('addTitleFn');
export const addDescriptionFn = taskDomain.createEvent('addDescriptionFn');
export const resetTitleFn = taskDomain.createEvent('resetTitleFn');
export const resetDescriptionFn = taskDomain.createEvent('resetDescriptionFn');

export const hideButtonFn = taskDomain.createEvent('hideButtonFn');
export const showButtonFn = taskDomain.createEvent('showButtonFn');

export const setTitleErrorFn = taskDomain.createEvent('setTitleErrorFn');
export const resetTitleErrorFn = taskDomain.createEvent('resetTitleErrorFn');

export const setDescriptionErrorFn = taskDomain.createEvent('setDescriptionErrorFn');
export const resetDescriptionErrorFn = taskDomain.createEvent('resetDescriptionErrorFn');

export const addTaskFn = taskDomain.createEvent('addTaskFn');
export const changeTaskFn = taskDomain.createEvent('changeTaskFn');


export const openTaskPageFn = taskDomain.createEvent('openTaskPageFn');
export const closeTaskPageFn = taskDomain.createEvent('closeTaskPageFn');
