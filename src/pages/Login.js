import { useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { fetchAPI } from "../utils/fetchAPI";
import FormInput from "../components/FormInput";
import validator from 'validator';
import './css/Login.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form Error States
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [submissionError, setSubmissionError] = useState(false);

  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  // const handleEmailChange = e => setEmail(e.target.value);
  // const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    setEmailError(false);
    setPasswordError(false);
    e.preventDefault();

    let tempEmail = validator.trim(validator.escape(email));;
    let tempPass = validator.trim(validator.escape(password));

    if (validator.isEmail(tempEmail) 
      && validator.isLength(tempEmail, {min: 3, max: 128})) {
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
        // setPasswordError(true);
        setSubmissionError(true);
      }

    } else { // Issue with Email
      // setEmailError(true);
      setSubmissionError(true);
    }

  }


  return (
    <div className='full-height'>

      <div className="login-container">
        <h2>Log In</h2>
        <form>
          <div>
            <span className={emailError ? 'error' : 'error hidden'}>Email Error</span>
            <FormInput 
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='Email'
              autoComplete=''
              showError={submissionError}
              setShowError={setSubmissionError}
            />
            {/* <input 
              type='email' 
              value={email} 
              onChange={handleEmailChange} 
              placeholder='Email'
            /> */}
          </div>
          <div>
            <span className={passwordError ? 'error' : 'error hidden'}>Password Error</span>
            <FormInput 
              type='password'
              value={password}
              setValue={setPassword}
              placeholder='Password'
              autoComplete=''
              showError={submissionError}
              setShowError={setSubmissionError}
            />
            {/* <input 
              type='password' 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder='Password'
            /> */}
          </div>
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Don't have an account? <a onClick={() => {navigate('/signup')}}>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Login