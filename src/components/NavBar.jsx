import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBarButton from './NavBarButton';

const NavBar = () => {
    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                React TODO
              </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <NavBarButton path={'/'} name={'Home'}/>
                    <NavBarButton path={'/create_task'} name={'Create task'}/>
                </Box>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default NavBar;