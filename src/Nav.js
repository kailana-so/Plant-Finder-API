import { Link } from 'react-router-dom'
import './Nav.css'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
// import AddRoundedIcon from '@material-ui/icons/AddRounded'
// import MenuRoundedIcon from '@material-ui/icons/MenuRounded'

// nav goes to upload and menu of search - text input, about, yours

export default function Nav() {

    // make an API request to the back end?

    return (
        <nav className="nav">
            <Link to="/image-search">
                <ImageSearchRoundedIcon />
            </Link>

            
            <h1><Link to="/">GenusGenius</Link></h1>
            
            {/* link to menu with txt search, about and user details */}
            <Link to="/plant-search">
                <SearchRoundedIcon />
            </Link>
        </nav>
        
    )
}