import { useSelector } from 'react-redux'
import './Profile.css'


const Profile = () => {

    // =============== Redux
        const currentUser =useSelector((state)=>state.authUser.value)
        console.log(currentUser);
        
            

    return (
    <>
        <div className="card">
        <div className="image">
            <img src={currentUser?.photoURL} alt="img" className='w-full'/>
        </div>
        <div className="card-info">
            <span>{currentUser?.displayName}</span>
            <p>{currentUser?.email}</p>
        </div>
        <a className="button" href="#">Folow</a>
        </div>
    </>
  )
}

export default Profile
