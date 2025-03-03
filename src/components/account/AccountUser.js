import { useState } from 'react'
import validator from 'validator';
import { fetchAPIRaw } from '../../utils/fetchAPI';

const FormInput = ({ type, value, setValue, placeholder, autoComplete, showError = false }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => setIsTouched(true);

  return (
    <input 
      className = {(isTouched && value.trim() === '') || (showError && value.trim() === '') ? 'error-border' : ''}
      type={type} 
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  )
}

const UserDisplay = ({ user, setUpdateStage }) => {
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

const UpdateEmailDisplay = ({ user, setUser, setUpdateResult, setUpdateStage, setIsResultError }) => {
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submissionError, setSubmissionError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    let tempEmail = validator.trim(validator.escape(newEmail));
    let tempPass = validator.trim(validator.escape(password));

    // check the email and password fields are not empty or invalid
    if (validator.isEmail(tempEmail) 
      && validator.isLength(tempEmail, {min: 3, max: 128})) {

        if (validator.isLength(tempPass, {min: 6, max: 20})) {

          // build the body for the request 
          // make request to fetchAPI
          let body = JSON.stringify({
            "email": user.email,
            "newEmail": tempEmail,
            "password": tempPass
          });

          const response = await fetchAPIRaw('update-email', 'POST', body);
          if (response) {
            if (response?.ok) {
              let newUser = await response.json();
              setUser(newUser)
              setUpdateResult("Email Updated")
            } else {
              let updateText = await response?.text();
              setIsResultError(true);
              setUpdateResult(updateText)
            }
          } else { // response is null
            setIsResultError(true);
            setUpdateResult("There was an error with updating your email. Please try again.")
          }
          setSubmissionError(false);
          setUpdateStage('result');
        } else { 
          // Password Error
          setSubmissionError(true);
        }

    } else { 
      // Email Error
      setSubmissionError(true);
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
        {submissionError ? <p className='error-msg'>Please ensure all fields are filled out with valid information</p> : <></>}
      <button className='white-link' onClick={handleSubmit}>Update</button>
    </form>
    <button className='white-link' onClick={() => setUpdateStage('none')}>Cancel</button>
  </div>
  )
}

const UpdatePasswordDisplay = ({ user, setUser, setUpdateResult, setUpdateStage, setIsResultError }) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [submissionError, setSubmissionError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    let tempNewPass = validator.trim(validator.escape(newPassword));
    let tempPass = validator.trim(validator.escape(password));

    // check the email and password fields are not empty or invalid
    if (validator.isLength(tempPass, {min: 3, max: 128}) && validator.isLength(tempNewPass, {min: 6, max: 20})) {
      // make request to fetchAPI
      let body = JSON.stringify({
        "email": user.email,
        "newPassword": tempNewPass,
        "password": tempPass
      });

      const response = await fetchAPIRaw('change-password', 'POST', body);
      if (response) {
        if (response?.ok) {
          let newUser = await response.json();
          setUser(newUser)
          setUpdateResult("Your password was updated")
        } else {
          let updateText = await response?.text();
          setIsResultError(true);
          setUpdateResult(updateText)
        }
      } else { // response is null
        setIsResultError(true);
        setUpdateResult("There was an error with updating your password. Please try again.")
      }
      setSubmissionError(false);
      setUpdateStage('result');
    } else { 
      // Password Error
      setSubmissionError(true);
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

const AccountUser = ({ user, setUser }) => {
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