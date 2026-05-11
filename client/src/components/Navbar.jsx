import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav>
            <h1>Kantor</h1>
            {!isLoggedIn && (
                <>
                    <Link to="/" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Rejestracja</Link>
                </>
            )}
            <Link to="/currencies" className="nav-link">💰 Waluty</Link>
            <Link to="/users" className="nav-link">🙍🏻‍♂️ Użytkownicy</Link>
            <Link to="/wallets" className="nav-link">💼 Portfele</Link>

            {isLoggedIn && (
                <button type="button" onClick={handleLogout} className="nav-link">Wyloguj</button>
            )}
            <div className="navBar-bottom">
                {isLoggedIn ? <p>Role: Zalogowany</p> : <p>Role: Gość</p>}
            </div>
        </nav>
    );
}

export default Navbar;