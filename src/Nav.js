import './Nav.css'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
// import { Switch, Route, Link } from 'react-router-dom'


// nav goes to upload and menu of search - text input, about, yours

export default function Nav() {

    return (
        <nav className="nav">
            {/* link to upload */}
            <AddRoundedIcon />
            <h1>Plant Finder</h1>
            {/* link to menu with txt search, about and user details */}
            <MenuRoundedIcon />
        </nav>
    )
}