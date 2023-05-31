import './NavBar.css'
import NavbarLogo from '../images/navbar-logo.png'

const NavBar: React.FC = () => {
    return (
        <div className="container-navbar">
            <div className="navbar">
                <div className="container-logo">
                    <a href="/">
                        <img src={NavbarLogo} alt="Logo Webové stránky"></img>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NavBar