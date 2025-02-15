import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from "../utils/fetchAPI";
import { getTotalCards, getTotalUniqueCards } from '../utils/collectionStats';
import { getCollectionValue } from '../utils/getCollectionValue';
import Loading from '../components/Loading';
import './css/Account.css';

const Account = ({ checkingUser, user, setUser }) => {
  const navigate = useNavigate();
  const [collectionValue, setCollectionValue] = useState(-1)
  const [calculating, setCalculating] = useState(false)
  

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
                          setCollectionValue((await getCollectionValue(user.collection)).toFixed(2));
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
                  {collectionValue > -1 ? <p className='num-display'>${collectionValue}</p> : <></>}
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