import { useState } from 'react';
import './SingUp.css';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  createUserWithEmailAndPassword, 
  sendEmailVerification 
} from 'firebase/auth';
import { BeatLoader } from 'react-spinners';

const SingUp = () => {
  const [formData, setFormData] = useState({
    Name: '',
    NameError: '',
    Email: '',
    EmailError: '',
    Password: '',
    PasswordError: '',
  });

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Firebase Authentication Setup
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // ✅ Handle Google Sign-Up (Fix for Mobile)
  const handleGoogleSignUp = () => {
    setLoading(true);

    if (window.innerWidth <= 768) {
      // Use Redirect on Mobile
      signInWithRedirect(auth, googleProvider);
    } else {
      // Use Popup on Desktop
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const user = result.user;
          toast.success(`Welcome, ${user.displayName}!`, { theme: 'dark' });
          Navigate('/Home');
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Google Sign-Up Error:', error);
          toast.error('Google Sign-Up failed. Please try again.', { theme: 'dark' });
        });
    }
  };

  //   Email Sign-Up
  const handleSubmit = () => {
    if (!formData.Name) {
      setFormData((prev) => ({ ...prev, NameError: '!border-red-500' }));
    }
    if (!formData.Email) {
      setFormData((prev) => ({ ...prev, EmailError: '!border-red-500' }));
    }
    if (!formData.Password) {
      setFormData((prev) => ({ ...prev, PasswordError: '!border-red-500' }));
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, formData.Email, formData.Password)
        .then((userCredential) => {
          const user = userCredential.user;

          sendEmailVerification(user).then(() => {
            Navigate('/SingIn');
            setLoading(false);
            toast.info('Verification email has been sent.', { theme: 'dark' });
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;

          if (errorCode === 'auth/email-already-in-use') {
            toast.warn('Email already in use.', { theme: 'dark' });
          } else if (errorCode === 'auth/weak-password') {
            toast.warn('Use a stronger password.', { theme: 'dark' });
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-box">
          <div className="login-form">
            {/*======================= Form Section =======================*/}
            <div className="form_container">
              <h1 className="title">Sign up</h1>
              <div className="button_container">
                <button onClick={handleGoogleSignUp} className="button-google">
                  <div className="button-icon">
                    <FcGoogle className="text-[25px]" />
                  </div>
                  <span>Sign Up with Google</span>
                </button>
                <button className="button-github">
                  <div className="button-icon">
                    <ImGithub className="text-[25px]" />
                  </div>
                  <span>Sign Up with GitHub</span>
                </button>
              </div>
              <div className="divider">
                <div className="divider-text">Or sign up with e-mail</div>
              </div>
              <div className="input_container">
                {/*========== Name Input  ===========*/}
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, Name: e.target.value }));
                    setFormData((prev) => ({ ...prev, NameError: '' }));
                  }}
                  className={`${formData.NameError} input-field`}
                  type="text"
                  placeholder="Name"
                />
                {/*========== Email Input  ===========*/}
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, Email: e.target.value }));
                    setFormData((prev) => ({ ...prev, EmailError: '' }));
                  }}
                  className={`${formData.EmailError} input-field`}
                  type="email"
                  placeholder="Email"
                />
                {/*========== Password Input  ===========*/}
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, Password: e.target.value }));
                    setFormData((prev) => ({ ...prev, PasswordError: '' }));
                  }}
                  className={`${formData.PasswordError} input-field`}
                  type="password"
                  placeholder="Password"
                />
                {/*---------------- Button ----------------*/}
                {loading ? (
                  <button className="signup-button">
                    <BeatLoader color={'#fff'} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="signup-button">
                    <svg className="signup-icon" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                    </svg>
                    <span>Sign Up</span>
                  </button>
                )}
                <p className="terms">
                  Already have an Account ? <Link to="/SingIn" className="terms-link">Log in</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-image">
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
              alt="Designer Life"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingUp;
