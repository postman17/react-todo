import {sample} from "effector";
import {spread} from "patronum/spread";
import {
    RouterGate,
    $pathname, $history, $enqueueSnackbar,
    pushHistoryFx, pushHistoryFn, notifySuccessFn
} from './index'


$enqueueSnackbar.on(notifySuccessFn, (notify, message) => {
    notify(message, { variant: 'success' });
})


sample({
    clock: RouterGate.state,
    target: spread({
        targets: {
            pathname: $pathname,
            history: $history,
            enqueueSnackbar: $enqueueSnackbar,
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