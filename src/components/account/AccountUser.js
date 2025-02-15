import React from 'react'

const AccountUser = ({ user }) => {
  return (
    <div className='account-info-container'>
      <h2>{user.username}</h2>



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

export default AccountUser