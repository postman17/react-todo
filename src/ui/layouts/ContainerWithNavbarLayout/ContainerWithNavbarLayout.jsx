import React from 'react';
import {useGate} from "effector-react";
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import NavBar from './children/NavBar/NavBar';
import { RouterGate } from 'src/models/App';

const ContainerWithNavbarLayout = (props) => {
    const pathname = window.location.pathname;
    const history = useHistory();
    useGate(RouterGate, { history, pathname });
    return (
        <Container maxWidth="xl">
            <NavBar />
            {props.children}
        </Container>
    )
}

export { ContainerWithNavbarLayout }
