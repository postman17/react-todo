import React from 'react';
import Container from '@mui/material/Container';
import NavBar from './children/NavBar/NavBar';

const ContainerWithNavbarLayout = (props) => {
    return (
        <Container maxWidth="xl">
            <NavBar />
            {props.children}
        </Container>
    )
}

export { ContainerWithNavbarLayout }
