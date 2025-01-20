import { FcGoogle } from 'react-icons/fc'
import '../SingUp/SingUp.css'
import { ImGithub } from 'react-icons/im'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Bounce, toast, ToastContainer } from 'react-toastify'


const SingIn = () => {
  
  // ===================== Custom Varibales
  const [fromData , setfromData] =useState({Email:'', EmailError:'',Password:'',PasswordError:''})
  const Navigate =useNavigate()

  // ===================== Firebase Varibales
  const auth = getAuth();

  
  
  // ===================== All Functions

  const handelSubmit=()=>{
    if(!fromData.Email){
      setfromData((prev)=>({...prev , EmailError:'!border-red-500'}))
    }
    if(!fromData.Password){
      setfromData((prev)=>({...prev , PasswordError:'!border-red-500'}))
    }
    else{
      console.log(fromData)
      signInWithEmailAndPassword(auth, fromData.Email, fromData.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user.emailVerified === false){
          toast.warn('Verify your email!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          });
        }
        else{
          Navigate("/Home")
        }

        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/invalid-credential'){
          toast.error('Something went wrong', {
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
    }
  }



  return (
    <>
      <div className='container'>
      <div className='login-box'>
        <div className='login-form'>
          
          <div className='form_container'>
            <h1 className='title'>Sign In</h1>
            <div className='button_container'>
              <button className='button-google'>
                <div className='button-icon'>
                <FcGoogle  className='text-[25px]'/>
                </div>
                <span>Sign In with Google</span>
              </button>
              <button className='button-github'>
                <div className='button-icon'>
                <ImGithub className='text-[25px]'/>
                </div>
                <span>Sign In with GitHub</span>
              </button>
            </div>
            <div className='divider'>
              <div className='divider-text'>Or sign In with e-mail</div>
            </div>
{/*===================== Input Part =====================*/}
            <div className='input_container'>
              {/*----------- Email */}
              <input onChange={(e)=>{setfromData((prev)=>({...prev , Email:e.target.value})), setfromData((prev)=>({...prev , EmailError:""})) }} className={`${fromData.EmailError} input-field`} type='email' placeholder='Email' />

              {/*----------- Password */}
              <input  onChange={(e)=>{setfromData((prev)=>({...prev , Password:e.target.value})), setfromData((prev)=>({...prev , PasswordError:""})) }} className={`${fromData.PasswordError} input-field`} type='password' placeholder='Password' />

              {/*  */}
              <button onClick={handelSubmit} className='signup-button'>
                <svg className='signup-icon' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                  <circle cx='8.5' cy='7' r='4' />
                </svg>
                <span>Sign In</span>
              </button>

              <p className='terms'>
              Already have an Account ? <Link to='/' className='terms-link'>Sing Up</Link> 
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
    <ToastContainer />
    </>
  )
}

export default SingIn
