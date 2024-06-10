import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // or handle the absence of context appropriately
  }

  const { user, logOutUser } = authContext;

  return (
    <div>
      <Link to="/">Home</Link>
      

      {user ? (
        <p onClick={logOutUser}>logout</p>
      ): (
        <Link to="/login">Login</Link>
      )}

      {user && <p>Hello {user.username}</p>}
    </div>
  );
}

export default Header;
