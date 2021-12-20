import {combine, createDomain} from 'effector';
import { DEFAULT_TASKS } from 'src/dict/tasks';

export const appDomain = createDomain('App');
export const $tasks = appDomain.createStore(DEFAULT_TASKS, { name: 'tasks' });
export const addTaskFn = appDomain.createEvent('addTaskFn');
export const changeTaskStatusFn = appDomain.createEvent('changeTaskStatusFn');
export const deleteTaskFn = appDomain.createEvent('deleteTaskFn');

export const $filteredStore = appDomain.createStore(DEFAULT_TASKS, { name: 'filteredStore' });
export const filterStoreFn = appDomain.createEvent({ name: 'filterStoreFn' });

export const $searchStore = appDomain.createStore('', { name: 'search' });
export const setSearchFn = appDomain.createEvent('setSearchFn');
export const clearSearchFn = appDomain.createEvent('clearSearchFn');

export const $dateStore = appDomain.createStore(null, { name: 'date' });
export const setDataFn = appDomain.createEvent('setDataFn');
export const clearDataFn = appDomain.createEvent('clearDataFn');

export const $statusStore = appDomain.createStore(null, { name: 'status' });
export const setStatusFn = appDomain.createEvent('setStatusFn');
export const clearStatusFn = appDomain.createEvent('clearStatusFn');

export const $filtersStore = combine($searchStore, $dateStore, $statusStore, (search, date, status) => ({
    search: search,
    date: date,
    status: status,
}))
export const clearFiltersFn = appDomain.createEvent('clearFiltersFn');
