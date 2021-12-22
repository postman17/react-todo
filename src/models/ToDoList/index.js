import {appDomain} from "src/models/App";

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

export const todoListDomain = appDomain.createDomain('todoList');

export const $tasks = todoListDomain.createStore(DEFAULT_TASKS, { name: 'tasks' });
export const $filteredTasks = todoListDomain.createStore(DEFAULT_TASKS, { name: 'filteredTasks' });

export const $searchStore = todoListDomain.createStore('', { name: 'searchStore' });
export const $dateStore = todoListDomain.createStore(new Date(), { name: 'dateStore' });
export const $statusStore = todoListDomain.createStore(null, { name: 'statusStore' });


export const changeTaskStatusFn = todoListDomain.createEvent('changeTaskStatusFn');
export const deleteTaskFn = todoListDomain.createEvent('deleteTaskFn');

export const setSearchFn = todoListDomain.createEvent('setSearchFn');
export const clearSearchFn = todoListDomain.createEvent('clearSearchFn');
export const setDataFn = todoListDomain.createEvent('setDataFn');
export const clearDataFn = todoListDomain.createEvent('clearDataFn');
export const setStatusFn = todoListDomain.createEvent('setStatusFn');
export const clearStatusFn = todoListDomain.createEvent('clearStatusFn');
export const clearFiltersFn = todoListDomain.createEvent('clearFiltersFn');

export const filterTasksFn = todoListDomain.createEvent('filterTasks');