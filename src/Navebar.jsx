
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  // Check if token exists in cookies
  const isLoggedIn = Cookies.get('token') !== undefined;

  return (
    <nav className="navbar">
      <div className="logo">
        <span>Logo Text</span>
      </div>
      <div className="links">
        {isLoggedIn ? (
          <div className="links">
             <Link to="/Cards" className="btn" >
            CARDS
          </Link>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
          </div>
        ) : (
          <>
            <Link to="/register">register</Link>
            <Link to="/login">login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
