import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useSubmissionError } from "../hooks/useSubmissionError";

import FormInput from "../components/FormInput";
import ErrorDisplay from "../components/ErrorDisplay";

import { fetchAPI } from "../utils/fetchAPI";
import { isValidEmail, isValidPassword, isValidUsername } from "../utils/validateInput";
import validator from "validator";

import './css/Login.css';


const Signup = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form Error States
  const {submissionError, submissionErrorMessage, showError, clearError} = useSubmissionError();

  // Form Input States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let tempEmail = validator.trim(validator.escape(email));
    let tempUsername = validator.trim(validator.escape(username));
    let tempPass = validator.trim(validator.escape(password));

    if (isValidEmail(tempEmail)) {
      if (isValidUsername(tempUsername)) {
        if (isValidPassword(tempPass)) { 

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
              showError(response.error || "There was an error. Please try again.");
            }
          } catch (error) {
            console.error('Registration failed:', error);
            showError('Registration failed. Please try again.');
          }

        } else {
          showError("Please enter a valid password");
        }

      } else {
        showError("Please enter a valid username");
      }

    } else {
      showError("Please enter a valid email address");
    }

    
  }


  return (
    <div className='full-height'>

      <div className="signup-container">
        <h2>Sign Up</h2>
        <p>With a Poke-Collect account you can save cards to track your collection</p>
        <form autoComplete="off">
          <div>        
            <FormInput 
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='Email'
              autoComplete='off'
              showError={submissionError}
              // setShowError={setSubmissionError}
            />
          </div>

          <div>
          <FormInput 
              type='text'
              value={username}
              setValue={setUsername}
              placeholder='Username'
              autoComplete='off'
              showError={submissionError}
              // setShowError={setSubmissionError}
            />
          </div>

          <div>
          <FormInput 
              type='password'
              value={password}
              setValue={setPassword}
              placeholder='Password'
              autoComplete='new-password'
              showError={submissionError}
              // setShowError={setSubmissionError}
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

          <ErrorDisplay submissionError={submissionError} submissionErrorMessage={submissionErrorMessage} />

          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <p>Already have an account? <a onClick={() => {navigate('/login')}}>Log In</a></p>
      </div>
      
    </div>
  )
}

export default Signup