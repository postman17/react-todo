import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {useStore} from "effector-react";
import {$alertText, $isAlertVisible, resetVisibleForAlertFn} from "src/models/Notification";

const Notification = () => {
    const text = useStore($alertText);
    const isVisible = useStore($isAlertVisible);
    useEffect(() => {
        setTimeout(() => {
            resetVisibleForAlertFn();
        }, 7000)
    })
    if (!isVisible) {
        return (
            <></>
        )
    }
    return (
        <Box mt={3}>
          <Alert severity="success">{text}</Alert>
        </Box>
    )
}

export default Notification