import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserPlus, FaUsers, FaUsersSlash } from 'react-icons/fa6';
import { AiFillMessage } from 'react-icons/ai';
import { GiExitDoor, GiThreeFriends } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {

  // ================ Navigate ___
  const navigate =useNavigate()

  // ================ Log Out Button
  const handelLogout =()=>{
    navigate('/SingIn')
    localStorage.removeItem('currentUser')
    alert('LogOut')
    
  }



  return (
    <nav>
      <ul>
        <Link className='nav-link' to="/User">
          <FaUsers className="nav-icon" /> <span>Users</span>
        </Link>
        <Link className='nav-link' to="#">
          <AiFillMessage  className="nav-icon" /> <span>Message</span>
        </Link>
        <Link className='nav-link' to="#">
          <FaUserPlus className="nav-icon" /> <span>Requests</span>
        </Link>
        <Link className='nav-link' to="#">
          <GiThreeFriends className="nav-icon" /> <span>Friends</span>
        </Link>
        <Link className='nav-link' to="#">
          <FaUsersSlash className="nav-icon" /> <span>Blocked</span>
        </Link>
        <Link className='nav-link' to="/">
          <FaRegUserCircle className="nav-icon" /> <span>Profile</span>
        </Link>
        <button onClick={handelLogout} className='nav-link'>
          <GiExitDoor className="nav-icon" /> <span>Log Out</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
