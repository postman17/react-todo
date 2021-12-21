import {appDomain} from "src/models/App";

export const $alertText = appDomain.createStore('', { name: 'alertText' });
export const $isAlertVisible = appDomain.createStore('', { name: 'isAlertVisible' });


export const addAlertTextFn = appDomain.createEvent('addAlertTextFn');
export const resetAlertTextFn = appDomain.createEvent('resetAlertTextFn');

export const setVisibleForAlertFn = appDomain.createEvent('setVisibleForAlertFn');
export const resetVisibleForAlertFn = appDomain.createEvent('resetVisibleForAlertFn');