import { FcGoogle } from 'react-icons/fc';
import '../SingUp/SingUp.css';
import { ImGithub } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,} from 'firebase/auth';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {  UserLoginData } from '../../Slice/authSlice';
import { getDatabase, push, ref, set } from "firebase/database";
 

const SingIn = () => {
  const [fromData, setFromData] = useState({Email: '',EmailError: '',Password: '',PasswordError: '',});
  const navigate = useNavigate();
// ============= Firebase
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const db = getDatabase();

  
// ==============================================================================
  // ------------ Redux
    const  Dispatch =useDispatch()


// ------ Google ====================
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success(`Welcome ${user.displayName}!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        navigate('/');  
        Dispatch(UserLoginData(result.user))
        localStorage.setItem("currentUser", JSON.stringify(result.user));
         // Realtime data store =========
         set(push(ref(db, 'allUsers/')), {
          userName: result.user.displayName,
          userPhoto: result.user.photoURL,
        });

    
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
        toast.error('Google Sign-In failed!', {
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
      });
  };
// ------ input ====================

  const handleSubmit = () => {
    if (!fromData.Email) {
      setFromData((prev) => ({ ...prev, EmailError: '!border-red-500' }));
    }
    if (!fromData.Password) {
      setFromData((prev) => ({ ...prev, PasswordError: '!border-red-500' }));
    } else {
      signInWithEmailAndPassword(auth, fromData.Email, fromData.Password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
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
          } else {
            navigate('/');
            Dispatch(UserLoginData(userCredential.user))
            localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
            
            // Realtime data store =========
            set(push(ref(db, 'allUsers/')), {
              userName: userCredential.user.displayName,
              userPhoto: userCredential.user.photoURL,
            });
            

          }
        })
        .catch((error) => {
          console.error('Error signing in:', error);
          toast.error('Invalid credentials!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          });
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-box">
          <div className="login-form shadow-[inset_-18px_-30px_85px_49px_rgba(0,_0,_0,_0.1)]">
            <div className="form_container">
              <h1 className="title">Sign In</h1>
              <div className="button_container">
                <button onClick={handleGoogleSignIn} className="button-google">
                  <div className="button-icon">
                    <FcGoogle className="text-[25px]" />
                  </div>
                  <span>Sign In with Google</span>
                </button>
                <button className="button-github">
                  <div className="button-icon">
                    <ImGithub className="text-[25px]" />
                  </div>
                  <span>Sign In with GitHub</span>
                </button>
              </div>
              <div className="divider">
                <div className="divider-text">Or sign in with e-mail</div>
              </div>
              <div className="input_container">
                <input onChange={(e) => setFromData((prev) => ({...prev,Email: e.target.value, EmailError: '',}))} className={`${fromData.EmailError} input-field`} type="email"placeholder="Email"/>
                <input onChange={(e) =>setFromData((prev) => ({...prev,Password: e.target.value,PasswordError: '',}))}className={`${fromData.PasswordError} input-field`} type="password"placeholder="Password"/>
                  <Link to={'/ResetPass'}className="mt-2 ml-[62%] text-[15px]">
                    Forgot password?
                  </Link>
                <button onClick={handleSubmit} className="signup-button">
                  <svg className="signup-icon"fill="none"stroke="currentColor"strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                  </svg>
                  <span>Sign In</span>
                </button>
                <p className="terms">
                  Don't have an account?{' '}
                  <Link to="/SingUp" className="terms-link">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-image">
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"alt="Designer Life"/>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingIn;
