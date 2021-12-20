import {combine, createDomain} from 'effector';
import {getDate} from "src/lib/date";

export const appDomain = createDomain('App');

export const $tasks = appDomain.createStore([
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
], { name: 'tasks' });
export const $searchStore = appDomain.createStore('', { name: 'searchStore' });
export const $tempSearchStore = appDomain.createStore('', { name: 'searchStore' });
export const $dateStore = appDomain.createStore(new Date(), { name: 'dateStore' });
export const $statusStore = appDomain.createStore(null, { name: 'statusStore' });
export const $titleStore = appDomain.createStore(null, { name: 'titleStore' });
export const $descriptionStore = appDomain.createStore(null, { name: 'descriptionStore' });

export const addTaskFn = appDomain.createEvent('addTaskFn');
export const createTaskFn = appDomain.createEvent('createTaskFn');
export const changeTaskStatusFn = appDomain.createEvent('changeTaskStatusFn');
export const deleteTaskFn = appDomain.createEvent('deleteTaskFn');
export const setSearchFn = appDomain.createEvent('setSearchFn');
export const clearSearchFn = appDomain.createEvent('clearSearchFn');
export const setDataFn = appDomain.createEvent('setDataFn');
export const clearDataFn = appDomain.createEvent('clearDataFn');
export const setStatusFn = appDomain.createEvent('setStatusFn');
export const clearStatusFn = appDomain.createEvent('clearStatusFn');
export const clearFiltersFn = appDomain.createEvent('clearFiltersFn');
export const addTitleFn = appDomain.createEvent('addTitleFn');
export const addDescriptionFn = appDomain.createEvent('addDescriptionFn');
export const setTempSearchFn = appDomain.createEvent('setTempSearch');
export const setTempSearchToSearchFn = appDomain.createEvent('setTempSearchToSearchFn');

export const $filteredTasks = combine($tasks, $searchStore, $dateStore, $statusStore, (tasks, search, date, status) => {
    let tasksArray = tasks;
    if (search) {
        tasksArray = tasksArray.filter((item) => {
            if (item.title.includes(search) || item.description.includes(search)) return true
            return false
        })
    }
    if (date) {
        tasksArray = tasksArray.filter((item) => {
            if (getDate(item.created_at) === getDate(date)) return true
            return false
        })
    }
    if (status) {
        tasksArray = tasksArray.filter((item) => {
            if (item.status === status) return true
            return false
        })
    }
    return tasksArray
})