import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from "../utils/fetchAPI";
import { getTotalCards, getTotalUniqueCards } from '../utils/collectionStats';
import { getCollectionValue } from '../utils/getCollectionValue';
import './css/Account.css';

const Account = ({ checkingUser, user, setUser }) => {
  const navigate = useNavigate();
  const [collectionValue, setCollectionValue] = useState(0)

  // On load, check if logged in
  useEffect(() => {
    if (!user && !checkingUser) {
      navigate('/login')
    }
  }, [checkingUser])

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

            <div className='account-info-container'>
              <h2>{user.username}</h2>

              <div className="email-container">
                <p>Email:</p>
                <span>{user.email}</span><button>Update</button>
              </div>

              <div className="password-container">
                <span>Change Password:</span>
                <button>Update</button>
              </div>
            </div>

            
            

            <div className='collection-info'>
              <h3>Your Collection:</h3>

              <div>
                <h4>Total Cards:</h4>
                <p>{getTotalCards(user.collection.sets)}</p>
              </div>


              <div>
                <h4>Total Unique Cards:</h4>
                <p>{getTotalUniqueCards(user.collection.sets)}</p>
              </div>


              <div>
                <h4>Calculate your total collection's value</h4>
                <button onClick={async () => setCollectionValue(await getCollectionValue(user.collection))}>Calculate Collection Value</button>
                <p>${collectionValue}</p>
              </div>

            </div>

          </div>



          <div className="logout">
            <a onClick={handleLogout}>Log Out</a>
          </div>
        </div>
      : <></>
    }
    
    </div>
  )
}

export default Account