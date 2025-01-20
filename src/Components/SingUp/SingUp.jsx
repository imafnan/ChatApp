import { useState } from 'react';
import './SingUp.css'
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { BeatLoader } from 'react-spinners';




const SingUp = () => {



  // ===================== Custom Varibales
  const [fromData , setfromData] = useState({Name:'',NameError:'',Email:'',EmailError:'',Password:'',PasswordError:''})
  


  // =========== Button Loding 
  const [loding , setloding] =useState(false)


  // ===================== Firebase Varibales
  const auth = getAuth();
  
  // ===================== All Functions
  const handelSubmit =()=>{
    if(!fromData.Name ){
        setfromData((prev)=>({...prev , NameError:'!border-red-500'}))
    }
    if(!fromData.Email ){
        setfromData((prev)=>({...prev , EmailError:'!border-red-500'}))
    }
    if(!fromData.Password ){
        setfromData((prev)=>({...prev , PasswordError:'!border-red-500'}))
    }
    else{
      createUserWithEmailAndPassword(auth, fromData.Email, fromData.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.info('Verification code has been sent to your email addressnpm', {
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
            setloding(false)

        });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/email-already-in-use'){
          toast.warn('Your email already use', {
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
          if(errorCode=='auth/weak-password'){
            toast.warn('Enter a strong password', {
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
          
      });
      setloding(true)
    }
   
  }



  return (
    <>
    <div className='container'>
      <div className='login-box'>
        <div className='login-form'>
{/*----------------------- form Part ============ */}
          <div className='form_container'>
            <h1 className='title'>Sign up</h1>
            <div className='button_container'>
              <button className='button-google'>
                <div className='button-icon'><FcGoogle  className='text-[25px]'/></div>
                <span>Sign Up with Google</span>
              </button>
              <button className='button-github'>
                <div className='button-icon'><ImGithub className='text-[25px]'/></div>
                <span>Sign Up with GitHub</span>
              </button>
            </div>
            <div className='divider'>
              <div className='divider-text'>Or sign up with e-mail</div>
            </div>
            <div className='input_container'>

            {/*========== Name Input  ===========*/}
              <input onChange={(e)=>{setfromData((prev)=>({...prev , Name:e.target.value})), setfromData((prev)=>({...prev , NameError:""})) }} className={`${fromData.NameError} input-field`} type='text' placeholder='Name' />

            {/*========== Email Input  ===========*/}
              <input onChange={(e)=>{setfromData((prev)=>({...prev , Email:e.target.value})), setfromData((prev)=>({...prev , EmailError:""})) }}   className={`${fromData.EmailError} input-field`} type='email' placeholder='Email' />

            {/*========== Password Input  ===========*/}
              <input onChange={(e)=>{setfromData((prev)=>({...prev , Password:e.target.value})), setfromData((prev)=>({...prev , PasswordError:""})) }}    className={`${fromData.PasswordError} input-field`} type='password' placeholder='Password' />

            {/*---------------- Button Start ---------------*/}
            {
              loding?
              <button onClick={handelSubmit} className='signup-button'>
              <BeatLoader   color={'#fff'}/>
              </button>
              :
              <button onClick={handelSubmit} className='signup-button'>
                <svg className='signup-icon' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                  <circle cx='8.5' cy='7' r='4' />
                </svg>
                <span>Sign Up</span>
              </button>
            }
              <p className='terms'>
              Already have an Account ? <Link to='/SingIn' className='terms-link'>Log in</Link> 
              </p>
            </div>
          </div>
        </div>
        <div className="bg-image">
        <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt="Designer Life"/>
        </div>


      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default SingUp
