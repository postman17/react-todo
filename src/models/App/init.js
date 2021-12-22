import {sample} from "effector";
import {spread} from "patronum/spread";
import { RouterGate, $pathname, $history, pushHistoryFx, pushHistoryFn } from './index'


sample({
  clock: RouterGate.state,
  target: spread({
    targets: {
      pathname: $pathname,
      history: $history,
    },
  }),
});

pushHistoryFx.use(({ history, path }) => history.push(path));

sample({
    clock: pushHistoryFn,
    source: $history,
    fn: (history, path) => ({history, path}),
    target: pushHistoryFx
})