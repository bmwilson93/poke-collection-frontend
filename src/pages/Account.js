import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

import { fetchAPI } from "../utils/fetchAPI";
import { getTotalCards, getTotalUniqueCards, getCompletedSets } from '../utils/collectionStats';
import { getCollectionValue } from '../utils/getCollectionValue';

import AccountUser from '../components/account/AccountUser';
import Loading from '../components/Loading';

import './css/Account.css';

const Account = () => {
  const { user, setUser, checkingUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [collectionValue, setCollectionValue] = useState(-1)
  const [calculating, setCalculating] = useState(false)
  const [collectedSets, setcollectedSets] = useState(0)
  

  // On load, check if logged in
  useEffect(() => {
    if (!user && !checkingUser) {
      navigate('/login')
    }
  }, [checkingUser])

  useEffect(() => {
    const fetchCompletedSets = async () => {
      if (user) {
        const setsCount = await getCompletedSets(user.collection.sets);
        setcollectedSets(setsCount); // Set state with the resolved value
      }
    };
  
    fetchCompletedSets();
  }, [user]); // Add `user` to dependency array

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
            <AccountUser/>

            <div className='collection-info'>
              <h3>Your Collection</h3>

              <div className='collection-item bottom-border'>
                <h4>Total Cards:</h4>
                <span className='num-display'>{getTotalCards(user.collection.sets)}</span>
              </div>


              <div className='collection-item bottom-border'>
                <h4>Unique Cards:</h4>
                <span className='num-display'>{getTotalUniqueCards(user.collection.sets)}</span>
              </div>

              <div className='collection-item bottom-border'>
                <h4>Sets in Collection:</h4>
                <span className='num-display'>{user.collection.sets.length}</span>
              </div>

              <div className='collection-item bottom-border'>
                <h4>Completed Sets:</h4>
                <span className='num-display'>{collectedSets}</span>
              </div>


              {/* Collection Value */}
              <div className='collection-item'>
                <h4>Collection value</h4>
                <div className='collection-value'>
                  {collectionValue < 0 && !calculating ?
                    <>
                      <button 
                        className="value-btn white-link" 
                        onClick={async () => {
                          setCalculating(true);
                          setCollectionValue((await getCollectionValue(user.collection)));
                          setCalculating(false);
                        }}
                      >
                        Calculate Collection Value
                      </button>
                      <small>*This may take several minutes*</small>
                    </>

                    : <></>
                  }
                  {calculating ? <Loading size={'small'}/> : <></>}
                  {typeof collectionValue === 'number' && collectionValue > -1 
                    ? (
                      <p className='num-display'>
                        {collectionValue.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    ) 
                    : null}
                </div>
              </div>

            </div>

          </div>



          <div className="logout">
            <button onClick={handleLogout} className="white-link">Log Out</button>
          </div>
        </div>
      : <></>
    }
    
    </div>
  )
}

export default Account