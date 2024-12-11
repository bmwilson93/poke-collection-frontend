import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import validator from 'validator';
import './css/Login.css';
// import validator from "validator";

const Login = ({ setUser, applyCollected }) => {
  const navigate = useNavigate();

  // Form Error States
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    setEmailError(false);
    setPasswordError(false);
    e.preventDefault();

    let tempEmail = validator.trim(validator.escape(email));;
    let tempPass = validator.trim(validator.escape(password));

    if (validator.isEmail(tempEmail) && validator.isLength(tempEmail, {min: 3, max: 128})) {
      if (validator.isLength(tempPass, {min: 6, max: 20})) {
        setPasswordError(false);

        let body = JSON.stringify({
          "email": tempEmail,
          "password": tempPass
        });
        const response = await fetchAPI('login', 'POST', body);
        setUser(response);
        if (response) {
          setPassword('');
          navigate('/');
        }

      } else { // Issue with password
        setPasswordError(true);
      }

    } else { // Issue with Email
      setEmailError(true);
    }

  }


  return (
    <div className='full-height'>

      <div className="login-container">
        <h2>Log In</h2>
        <form>
          <div>
            <span className={emailError ? 'error' : 'error hidden'}>Email Error</span>
            <input 
              type='email' 
              value={email} 
              onChange={handleEmailChange} 
              placeholder='Email'
            />
          </div>
          <div>
            <span className={passwordError ? 'error' : 'error hidden'}>Password Error</span>
            <input 
              type='password' 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder='Password'
            />
          </div>
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Don't have an account? <a onClick={() => {navigate('/signup')}}>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Login