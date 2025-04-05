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

        if (response.user) {
          setUser(response.user);
          setPassword('');
          navigate('/');
        } else {
          // TODO access response.error to display error message from server
        }

      } else { // Issue with password
        setSubmissionError(true);
      }

    } else { // Issue with Email
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
          </div>
          {submissionError ? <p className='error-msg'>Please ensure all fields are filled out with valid information</p> : <></>}
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Don't have an account? <a onClick={() => {navigate('/signup')}}>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Login