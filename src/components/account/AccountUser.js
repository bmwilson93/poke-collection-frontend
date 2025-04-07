import { useState, useContext } from 'react'
import UserContext from '../../contexts/UserContext';
import { useSubmissionError } from '../../hooks/useSubmissionError';

import FormInput from '../FormInput';
import ErrorDisplay from "../ErrorDisplay";

import validator from 'validator';
import { fetchAPI } from '../../utils/fetchAPI';
import { isValidEmail, isValidPassword } from '../../utils/validateInput';

const UserDisplay = ({ setUpdateStage }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-display">
    <div className="email-container">
      <p>{user.email}</p>
      <button 
        className="white-link"
        onClick={() => {setUpdateStage('updatingEmail')}}  
      >Update Email</button>
    </div>

    <div className="password-container">
      <button 
      className="white-link"
      onClick={() => {setUpdateStage('updatingPassword')}}
      >
        Change Password
      </button>
    </div>
  </div>
  )
}

const UpdateEmailDisplay = ({ setUpdateResult, setUpdateStage, setIsResultError }) => {
  const { user, setUser } = useContext(UserContext);
  const {submissionError, submissionErrorMessage, showError, clearError} = useSubmissionError();
  
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    clearError();

    let tempEmail = validator.trim(validator.escape(newEmail));
    let tempPass = validator.trim(validator.escape(password));

    // check the email and password fields are not empty or invalid
    if (isValidEmail(tempEmail)) {
        if (isValidPassword(tempPass)) {

          // build the body for the request 
          // make request to fetchAPI
          let body = JSON.stringify({
            "email": user.email,
            "newEmail": tempEmail,
            "password": tempPass
          });

          const response = await fetchAPI('update-email', 'POST', body);
          
          if (response.user) {
            setUser(response.user)
            setUpdateResult("Email Updated");
            setUpdateStage('result');
          } else {
            showError(response?.error || "There was an error with updating your email. Please try again.")
          }

        } else { 
          // Password Error
          showError("Please enter a valid password");
        }

    } else { 
      // Email Error
      showError("Please enter a valid email address");
    }
  }

  return(
    <div className="update-email-display">
      <p>Current Email:</p>
      <p className="old-email">{user.email}</p>
      <form className='update-email-form'>
        <FormInput 
          type='text'
          value={newEmail}
          setValue={setNewEmail}
          placeholder='New Email'
          autoComplete='off'
          showError={submissionError}
        />
        <FormInput 
          type='password'
          value={password}
          setValue={setPassword}
          placeholder='Password'
          autoComplete='new-password'
          showError={submissionError}
        />
        
        <ErrorDisplay submissionError={submissionError} submissionErrorMessage={submissionErrorMessage} />
        <button className='white-link' onClick={handleSubmit}>Update</button>
      </form>
      <button className='white-link' onClick={() => setUpdateStage('none')}>Cancel</button>
    </div>
  )
}

const UpdatePasswordDisplay = ({ setUpdateResult, setUpdateStage, setIsResultError }) => {
  const { user, setUser } = useContext(UserContext);
  const {submissionError, submissionErrorMessage, showError, clearError} = useSubmissionError();
  
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    clearError();

    let tempNewPass = validator.trim(validator.escape(newPassword));
    let tempPass = validator.trim(validator.escape(password));

    if (isValidPassword(tempPass) && isValidPassword(tempNewPass)) {
      // make request to fetchAPI
      let body = JSON.stringify({
        "email": user.email,
        "newPassword": tempNewPass,
        "password": tempPass
      });

      const response = await fetchAPI('change-password', 'POST', body);
          
      if (response.user) {
        setUser(response.user)
        setUpdateResult("Your password was updated");
        setUpdateStage('result');
      } else {
        showError(response?.error || "There was an error with updating your password. Please try again.")
      }

    } else { 
      // Password Error
      showError("Please enter a valid password");
    }
  }

  return(
    <div className="update-email-display">
      <p>Update your Password</p>
      <form className='update-email-form'>
        <FormInput 
          type='password'
          value={newPassword}
          setValue={setNewPassword}
          placeholder='New Password'
          autoComplete='new-password'
          showError={submissionError}
        />
        <FormInput 
          type='password'
          value={password}
          setValue={setPassword}
          placeholder='Password'
          autoComplete='new-password'
          showError={submissionError}
        />
        {submissionError ? <p className='error-msg'>Please ensure all fields are filled out with valid information</p> : <></>}
        
        <ErrorDisplay submissionError={submissionError} submissionErrorMessage={submissionErrorMessage} />
        <button className='white-link' onClick={handleSubmit}>Update</button>
      </form>
      <button className='white-link' onClick={() => setUpdateStage('none')}>Cancel</button>
    </div>
  )
}

const UpdateResultDisplay = ({ updateResult, setUpdateStage, isResultError, setIsResultError }) => {
  return (
    <div className="update-result-display">
      <p className={isResultError ? 'error-msg' : ''}>{updateResult}</p>
      <button 
        onClick={() => {
          setIsResultError(false);
          setUpdateStage('none');}}
        className="white-link"
      >Okay</button>
    </div>
  )
}

const AccountUser = () => {
  const { user, setUser } = useContext(UserContext);

  const [updateStage, setUpdateStage] = useState("none");
  const [updateResult, setUpdateResult] = useState('');
  const [isResultError, setIsResultError] = useState(false);

  return (
    <div className='account-user-container'>
      <h2>{user.username}</h2>

      {updateStage === 'none'
        ? <UserDisplay user={user} setUpdateStage={setUpdateStage} />
        : 
       updateStage === 'updatingEmail' 
        ? <UpdateEmailDisplay user={user} setUser={setUser} setUpdateResult={setUpdateResult} setUpdateStage={setUpdateStage} setIsResultError={setIsResultError} />
        : 
       updateStage === 'updatingPassword'
        ? <UpdatePasswordDisplay user={user} setUser={setUser} setUpdateResult={setUpdateResult} setUpdateStage={setUpdateStage} setIsResultError={setIsResultError} />
        :
       updateStage === 'result'
        ? <UpdateResultDisplay updateResult={updateResult} setUpdateStage={setUpdateStage} isResultError={isResultError} setIsResultError={setIsResultError}></UpdateResultDisplay>
        : <></>
      }
    </div>
  )
}

export default AccountUser