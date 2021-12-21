import {createDomain} from 'effector';

const DEFAULT_TASKS = [
    {
        'title': 'Test',
        'description': 'Description',
        'status': 'Active',
        'created_at': new Date(),
    },
    {
        'title': 'Test 2',
        'description': 'Description 2',
        'status': 'Closed',
        'created_at': new Date(),
    }
]

export const appDomain = createDomain('App');

export const $tasks = appDomain.createStore(DEFAULT_TASKS, { name: 'tasks' });
export const $filteredTasks = appDomain.createStore(DEFAULT_TASKS, { name: 'filteredTasks' });

export const $searchStore = appDomain.createStore('', { name: 'searchStore' });
export const $dateStore = appDomain.createStore(new Date(), { name: 'dateStore' });
export const $statusStore = appDomain.createStore(null, { name: 'statusStore' });


export const addTaskFn = appDomain.createEvent('addTaskFn');
export const changeTaskStatusFn = appDomain.createEvent('changeTaskStatusFn');
export const deleteTaskFn = appDomain.createEvent('deleteTaskFn');

export const setSearchFn = appDomain.createEvent('setSearchFn');
export const clearSearchFn = appDomain.createEvent('clearSearchFn');
export const setDataFn = appDomain.createEvent('setDataFn');
export const clearDataFn = appDomain.createEvent('clearDataFn');
export const setStatusFn = appDomain.createEvent('setStatusFn');
export const clearStatusFn = appDomain.createEvent('clearStatusFn');
export const clearFiltersFn = appDomain.createEvent('clearFiltersFn');

export const filterTasksFn = appDomain.createEvent('filterTasks');
