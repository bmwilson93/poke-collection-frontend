import { useState } from 'react'

const UserDisplay = ({ user, setUpdateEmailStage }) => {
  return (
    <div className="user-display">
    <div className="email-container">
      <p>{user.email}</p>
      <button 
        className="white-link"
        onClick={() => {setUpdateEmailStage('updating')}}  
      >Update Email</button>
    </div>

    <div className="password-container">
      <button className="white-link">Change Password</button>
    </div>
  </div>
  )
}

const UpdateEmailDisplay = ({ user, setUpdateEmailStage }) => {
  const [newEmail, setNewEmail] = useState('')
  const handleNewEmailChange = e => setNewEmail(e.target.value);
  const [password, setPassword] = useState('')
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleSubmit = async e => {
    // TODO Make call to API, and update the email stage accordingly
  }

  return(
    <div className="update-email-display">
      <p>{user.email}</p>
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
      <button className='white-link'>Update</button>
    </form>
    <button className='white-link' onClick={() => setUpdateEmailStage('none')}>Cancel</button>
  </div>
  )
}

const UpdateResultDisplay = () => {
  return (
    <div className="update-result-display">
      <p>result</p>
    </div>
  )
}

const AccountUser = ({ user, setUser }) => {
  const [updateEmailStage, setUpdateEmailStage] = useState("none")

  return (
    <div className='account-user-container'>
      <h2>{user.username}</h2>

      {updateEmailStage == 'none'
        ? <UserDisplay user={user} setUpdateEmailStage={setUpdateEmailStage} />
        : 
       updateEmailStage == 'updating' 
        ? <UpdateEmailDisplay user={user} setUpdateEmailStage={setUpdateEmailStage} />
        : 
       updateEmailStage == 'result'
        ? <UpdateResultDisplay setUpdateEmailStage={setUpdateEmailStage}></UpdateResultDisplay>
        : <></>
      }
    </div>
  )
}

export default AccountUser