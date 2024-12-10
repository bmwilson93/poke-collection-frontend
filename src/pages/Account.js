import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from "../utils/fetchAPI";
import { getTotalCards, getTotalUniqueCards } from '../utils/collectionStats';
import './css/Account.css';

const Account = ({ user, setUser }) => {
  const navigate = useNavigate();

  // On load, check if logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetchAPI('logout', 'POST', "");
    setUser(null)
    navigate('/');
  }

  return (
    <div className='full-height'>
    {user 
      ? <div className='account-container'>
          <div className='account-info'>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>

          <div className='collection-info'>
            <h3>Your Collection:</h3>

            <h4>Total Cards:</h4>
            <p>{getTotalCards(user.collection.sets)}</p>

            <h4>Total Unique Cards:</h4>
            <p>{getTotalUniqueCards(user.collection.sets)}</p>

          </div>

          <div>
            <p onClick={handleLogout}>Log OUt</p>
          </div>
        </div>
      : <></>
    }
    
    </div>
  )
}

export default Account