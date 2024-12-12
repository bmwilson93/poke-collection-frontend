import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import validator from "validator";
import './css/Login.css';

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  // Form Error States
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  // Form Input States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  const handleEmailChange = e => setEmail(e.target.value);
  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    e.preventDefault();

    let tempEmail = validator.trim(validator.escape(email));
    let tempUsername = validator.trim(validator.escape(username));
    let tempPass = validator.trim(validator.escape(password));

    if (validator.isEmail(tempEmail) && validator.isLength(tempEmail, {min: 3, max: 128})) {
      if (validator.isLength(tempUsername, {min: 1, max: 64})) {
        if (validator.isLength(tempPass, {min: 6, max: 20})) { 

          let body = JSON.stringify({
            "email": tempEmail,
            "username": tempUsername,
            "password": tempPass
          })
          const response = await fetchAPI('register', 'POST', body);
          setUser(response);
          if (response) {
            setPassword('');
            navigate('/');
          }

        } else {
          setPasswordError(true)
        }

      } else {
        setUsernameError(true);
      }

    } else {
      setEmailError(true);
    }

    
  }


  return (
    <div className='full-height'>

      <div className="signup-container">
        <h2>Sign Up</h2>
        <form autoComplete="off">
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
          <span className={usernameError ? 'error' : 'error hidden'}>Username Error</span>
            <input 
              type='text' 
              value={username}
              onChange={handleUsernameChange} 
              placeholder='Username'
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

          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <p>Already have an account? <a onClick={() => {navigate('/login')}}>Log In</a></p>
      </div>
      
    </div>
  )
}

export default Signup