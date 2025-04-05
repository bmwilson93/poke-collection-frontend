import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FormInput from "../components/FormInput";

import { fetchAPI } from "../utils/fetchAPI";
import validator from "validator";

import './css/Login.css';

const pwregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form Error States
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  // Form Input States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [submissionError, setSubmissionError] = useState(false)

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
        if (validator.isLength(tempPass, {min: 8, max: 20})) { 

          try {
            let body = JSON.stringify({
              "email": tempEmail,
              "username": tempUsername,
              "password": tempPass
            })
  
            const response = await fetchAPI('register', 'POST', body);

            if (response.user) {
              setUser(response.user);
              setPassword('');
              navigate('/');
            } else {
              if (response?.error) {
                alert(response.error); // Show server error
              }
            }
          } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
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
        <p>With a Poke-Collect account you can save cards to track your collection</p>
        <form autoComplete="off">
          <div>
          <span className={emailError ? 'error' : 'error hidden'}>Email Error</span>
            
            <FormInput 
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='Email'
              autoComplete='off'
              showError={submissionError}
              setShowError={setSubmissionError}
            />
          </div>

          <div>
          <span className={usernameError ? 'error' : 'error hidden'}>Username Error</span>
            
          <FormInput 
              type='text'
              value={username}
              setValue={setUsername}
              placeholder='Username'
              autoComplete='off'
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
              autoComplete='new-password'
              showError={submissionError}
              setShowError={setSubmissionError}
            />
          </div>

          <div className='pw-req-container'>
            <p>Passwords must contain:</p>
            <ul className="pw-req-ul">
              <li>a lowercase letter</li>
              <li>an uppercase letter</li>
              <li>a number</li>
              <li>8 - 20 characters</li>
            </ul>
          </div>

          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <p>Already have an account? <a onClick={() => {navigate('/login')}}>Log In</a></p>
      </div>
      
    </div>
  )
}

export default Signup