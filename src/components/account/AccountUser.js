import { useState } from 'react'

const UserDisplay = ({ user, setUpdateEmailStage }) => {
  return (
    <div className="user-display">
    <div className="email-container">
      <p>{user.email}</p>
      <button className="white-link">Update Email</button>
    </div>

    <div className="password-container">
      <button className="white-link">Change Password</button>
    </div>
  </div>
  )
}

const UpdateEmailDisplay = () => {
  return(
    <div>
    <form>
      <input type='text' />
    </form>
  </div>
  )
}

const UpdateResultDisplay = () => {
  return (
    <div>
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
        ? <UpdateEmailDisplay />
        : 
       updateEmailStage == 'result'
        ? <UpdateResultDisplay></UpdateResultDisplay>
        : <></>
      }
    </div>
  )
}

export default AccountUser