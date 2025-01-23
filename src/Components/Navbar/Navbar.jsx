import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUsersSlash, FaUsersViewfinder } from 'react-icons/fa6';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { GiExitDoor, GiThreeFriends } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link className='nav-link' to="/User">
          <FaUsersViewfinder className="nav-icon" /> <span>Users</span>
        </Link>
        <Link className='nav-link' to="#">
          <MdOutlineMessage  className="nav-icon" /> <span>Message</span>
        </Link>
        <Link className='nav-link' to="#">
          <AiOutlineUsergroupAdd className="nav-icon" /> <span>Requests</span>
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
        <button className='nav-link'>
          <GiExitDoor className="nav-icon" /> <span>Log Out</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
