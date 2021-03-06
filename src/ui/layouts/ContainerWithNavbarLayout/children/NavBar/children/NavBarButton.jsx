import { useLocation, Link } from "react-router-dom";
import Button from '@mui/material/Button';

const NavBarButton = (props) => {
    const location = useLocation()
    let isButtonDisabled = false;
    if (location.pathname === props.path) {
        isButtonDisabled = true;
    }
    return (
        <Button disabled={isButtonDisabled} color="inherit" component={Link} to={props.path}>{props.name}</Button>
    )
}

export default NavBarButton;