import {appDomain} from "src/models/App";


export const $titleStore = appDomain.createStore(null, { name: 'titleStore' });
export const $descriptionStore = appDomain.createStore(null, { name: 'descriptionStore' });

export const $formButtonVisible = appDomain.createStore(true, { name: 'formButtonVisible' });
export const $formTitleError = appDomain.createStore('', { name: 'formTitleError' });
export const $formDescriptionError = appDomain.createStore('', { name: 'formDescriptionError' });


export const updateTaskFn = appDomain.createEvent('updateTaskFn');
export const fillTitleAndDescriptionFn = appDomain.createEvent('fillTitleAndDescriptionFn');

export const addTitleFn = appDomain.createEvent('addTitleFn');
export const addDescriptionFn = appDomain.createEvent('addDescriptionFn');
export const resetTitleFn = appDomain.createEvent('resetTitleFn');
export const resetDescriptionFn = appDomain.createEvent('resetDescriptionFn');

export const hideButtonFn = appDomain.createEvent('hideButtonFn');
export const showButtonFn = appDomain.createEvent('showButtonFn');

export const setTitleErrorFn = appDomain.createEvent('setTitleErrorFn');
export const resetTitleErrorFn = appDomain.createEvent('resetTitleErrorFn');

export const setDescriptionErrorFn = appDomain.createEvent('setDescriptionErrorFn');
export const resetDescriptionErrorFn = appDomain.createEvent('resetDescriptionErrorFn');