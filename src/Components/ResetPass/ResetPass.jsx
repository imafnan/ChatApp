
import { IoMdArrowRoundBack } from 'react-icons/io'
import './ResetPassw.css'
import { Link,  useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';


const ResetPass = () => {

    const [Email , SetEmail] =useState()
    const Navigate =useNavigate()
    
    // =========== Firebase
    const auth = getAuth();

    const handelOTP =()=>{
        if(!Email){
            toast.info('Enter Your Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        }
        else{
            sendPasswordResetEmail(auth, Email)
            .then(() => {
                toast.success('Please check your email.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
                    Navigate('/SingIn')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode)
            });
        }

    }





  return (
    <>
    <div className="h-screen max-sm:px-7 flex justify-center items-center">

        <div className="cards ">
        <div className="BG">
            <svg viewBox="0 0 512 512" className="ionicon" xmlns="http://www.w3.org/2000/svg" >
            <path d="M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z"></path>
            </svg>
        </div>
        <div className="content relative">
            <p className="sub-heading">forgot password</p>
            <p className="sub-sub-heading">Type your email to recover</p>
            <span></span>
            <input onChange={(e)=>SetEmail(e.target.value)} className="email" placeholder="Email" type="email" />
            <button onClick={handelOTP} className="card-btn">Reset Password</button>
        </div>
        <Link to={'/SingIn'} className='text-2xl text-red-500 absolute mt-3 ml-3' >
            <IoMdArrowRoundBack/>
        </Link>
        </div>
    </div>
    </>
  )
}

export default ResetPass
