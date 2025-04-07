import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useSubmissionError } from "../hooks/useSubmissionError";

import { fetchAPI } from "../utils/fetchAPI";
import { isValidEmail, isValidPassword } from "../utils/validateInput";

import FormInput from "../components/FormInput";
import ErrorDisplay from "../components/ErrorDisplay";

import validator from 'validator';
import './css/Login.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form Error States
  const {submissionError, submissionErrorMessage, showError, clearError} = useSubmissionError();

  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    clearError();
    e.preventDefault();

    let tempEmail = validator.trim(validator.escape(email));;
    let tempPass = validator.trim(validator.escape(password));

    if (isValidEmail(tempEmail)) {
      if (isValidPassword(tempPass)) {

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
          showError(response.error || "There was an error. Please try again.")
        }

      } else { // Issue with password
        showError("Please enter a valid password");
      }

    } else { // Issue with Email
      showError("Please enter a valid email address");
    }

  }


  return (
    <div className='full-height'>

      <div className="login-container">
        <h2>Log In</h2>
        <form>
          <div>
            <FormInput 
              type='email'
              value={email}
              setValue={setEmail}
              placeholder='Email'
              autoComplete=''
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
              autoComplete=''
              showError={submissionError}
              // setShowError={setSubmissionError}
            />
          </div>

          <ErrorDisplay submissionError={submissionError} submissionErrorMessage={submissionErrorMessage} />
          
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Don't have an account? <a onClick={() => {navigate('/signup')}}>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Login