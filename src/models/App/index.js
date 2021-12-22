import {createDomain} from 'effector';
import { createGate } from 'effector-react';

export const appDomain = createDomain('App');

export const RouterGate = createGate('App')

export const $pathname = appDomain.createStore('', { name: 'pathname' })
export const $history = appDomain.createStore({}, { name: 'history' })

export const pushHistoryFn = appDomain.createEvent('pushHistoryFn')

export const pushHistoryFx = appDomain.createEffect('pushHistoryFx')
