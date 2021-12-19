import {combine, createDomain} from 'effector';
import { DEFAULT_TASKS } from 'src/dict/tasks';

export const appDomain = createDomain('App');
export const $tasks = appDomain.createStore(DEFAULT_TASKS, { name: 'tasks' });
export const addTaskFn = appDomain.createEvent('addTaskFn');
export const changeTaskStatusFn = appDomain.createEvent('changeTaskStatusFn');
export const deleteTaskFn = appDomain.createEvent('deleteTaskFn');

export const $searchStore = appDomain.createStore('', { name: 'search' });
export const setSearchFn = appDomain.createEvent('setSearchFn');
export const $dateStore = appDomain.createStore(null, { name: 'date' });
export const setDataFn = appDomain.createEvent('setDataFn');
export const $statusStore = appDomain.createStore(null, { name: 'status' });
export const setStatusFn = appDomain.createEvent('setStatusFn');

export const $filtersStore = combine($searchStore, $dateStore, $statusStore, (search, date, status) => ({
    search: search,
    date: date,
    status: status,
}))
