import { useState } from 'react'
import validator from 'validator';
import { fetchAPIRaw } from '../../utils/fetchAPI';

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

const UpdateEmailDisplay = ({ user, setUser, setUpdateResult, setUpdateStage }) => {
  const [newEmail, setNewEmail] = useState('')
  const handleNewEmailChange = e => setNewEmail(e.target.value);
  const [password, setPassword] = useState('')
  const handlePasswordChange = e => setPassword(e.target.value);

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
              setUpdateResult(updateText)
            }
          } else { // response is null
            setUpdateResult("There was an error with updating your email. Please try again.")
          }
          setUpdateStage('result');
        } else { 
          // Password Error
        }

    } else { 
      // Email Error
    }
  }

  return(
    <div className="update-email-display">
      <p>Current Email:</p>
      <p className="old-email">{user.email}</p>
      <form className='update-email-form'>
        <input 
          type='text' 
          value={newEmail}  
          onChange={handleNewEmailChange}
          placeholder='New Email'
          autoComplete='off'
        />
        <input 
          type='password' 
          value={password}  
          onChange={handlePasswordChange}
          placeholder='Password'
          autoComplete='new-password'
      />
      <button className='white-link' onClick={handleSubmit}>Update</button>
    </form>
    <button className='white-link' onClick={() => setUpdateStage('none')}>Cancel</button>
  </div>
  )
}

const UpdateResultDisplay = ({ updateResult, setUpdateStage }) => {
  return (
    <div className="update-result-display">
      <p>{updateResult}</p>
      <button 
        onClick={() => {setUpdateStage('none')}}
        className="white-link"
      >Okay</button>
    </div>
  )
}

const AccountUser = ({ user, setUser }) => {
  const [updateStage, setUpdateStage] = useState("none");
  const [updateResult, setUpdateResult] = useState('');

  return (
    <div className='account-user-container'>
      <h2>{user.username}</h2>

      {updateStage === 'none'
        ? <UserDisplay user={user} setUpdateStage={setUpdateStage} />
        : 
       updateStage === 'updatingEmail' 
        ? <UpdateEmailDisplay user={user} setUser={setUser} setUpdateResult={setUpdateResult} setUpdateStage={setUpdateStage} />
        : 
       updateStage === 'result'
        ? <UpdateResultDisplay updateResult={updateResult} setUpdateStage={setUpdateStage}></UpdateResultDisplay>
        : <></>
      }
    </div>
  )
}

export default AccountUser