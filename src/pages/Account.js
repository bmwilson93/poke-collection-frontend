import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Account.css';

const Account = ({ user }) => {
  const navigate = useNavigate();

  // On load, check if logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='full-height'>

      Account

    </div>
  )
}

export default Account