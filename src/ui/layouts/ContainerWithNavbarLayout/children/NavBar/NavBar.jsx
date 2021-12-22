import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { List, ListItem, ListItemText } from '@material-ui/core';
import NavBarButton from './children/NavBarButton';

const NavBar = () => {
    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
                <List component="nav" style={{display: 'flex'}}>
                    <ListItem>
                      <ListItemText primary={'ReactTODO'} />
                    </ListItem>
                    <ListItem>
                        <NavBarButton path={'/'} name={'Home'}/>
                    </ListItem>
                    <ListItem>
                      <NavBarButton path={'/create_task'} name={'Create task'}/>
                    </ListItem>
                </List>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default NavBar;