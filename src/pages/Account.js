import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

import { fetchAPI } from "../utils/fetchAPI";
import { getTotalCards, getTotalUniqueCards, getCompletedSets } from '../utils/collectionStats';
import { getCollectionValue } from '../utils/getCollectionValue';
import { getSets } from '../utils/fetchData';

import AccountUser from '../components/account/AccountUser';
import Loading from '../components/Loading';

import './css/Account.css';

const Account = ({ sets, setSets }) => {
  const { user, setUser, checkingUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [collectionValue, setCollectionValue] = useState(-1)
  const [calculating, setCalculating] = useState(false)
  const [collectedSets, setcollectedSets] = useState(0)

  const fetchSets = async () => {
      let response = await getSets();
  
      if ('error' in response) {
        console.log("Error getting the sets");
      } else {
        setSets(response);
        return response;
      }
    };
  

  // On load, check if logged in
  useEffect(() => {
    if (!user && !checkingUser) {
      navigate('/login')
    }
  }, [checkingUser])

  useEffect(() => {
    const fetchCompletedSets = async () => {
      if (user && user.collection) {
        if (sets.length > 0) {
          const setsCount = await getCompletedSets(user.collection.sets, sets);
          setcollectedSets(setsCount); // Set state with the resolved value
        } else { // No sets current fetched, fetch the sets before running the completed sets
          const allSets = await fetchSets();
          const setsCount = await getCompletedSets(user.collection.sets, allSets);
          setcollectedSets(setsCount); // Set state with the resolved value
        }
      }
    };
  
    fetchCompletedSets();

    if (user?.collection?.collection_value) {
      setCollectionValue(user.collection.collection_value)
    }
  }, [user]); // Add `user` to dependency array
  
  const handleLogout = async (e) => {
    e.preventDefault();
    await fetchAPI('logout', 'POST', "");
    setUser(null)
    navigate('/');
  }

  const generateCollectionValue = async (collection) => {
    const result = await getCollectionValue(collection);
    if (result.user) setUser(result.user);
    setCollectionValue(result.value);
  }

  const displayValue = () => {
    if (collectionValue > -1) {
      return (
        <div className='value-container'>
          <p className='num-display'>
            {collectionValue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <div className='value-btn-container'>
            <button 
              className="value-btn white-link" 
              onClick={async () => {
                setCalculating(true);
                await generateCollectionValue(user.collection);
                setCalculating(false);
              }}
            >
              Recalculate Collection Value
            </button>
            <small>*This may take several minutes*</small>
          </div>
        </div>
      )
    } else { // no value, show only button
      return (
        <div>
          <button 
            className="value-btn white-link" 
            onClick={async () => {
              setCalculating(true);
              await generateCollectionValue(user.collection);
              setCalculating(false);
            }}
          >
            Calculate Collection Value
          </button>
          <small>*This may take several minutes*</small>
        </div>
      )
    }
  }


  return (
    <div className='full-height'>
    {user 
      ? <div className='account-container'>

          <div className='account-info'>
            <AccountUser/>

            <div className='collection-info'>
              <div className='split'>
              <h3>Your Collection</h3>
              <button 
                className='view-all-btn white-link'
                onClick={() => navigate('/account/incoming')}
              >View All Incoming Cards</button>
              </div>

              <div className='collection-item bottom-border'>
                <h4>Total Cards:</h4>
                <span className='num-display'>{user?.collection?.sets ? getTotalCards(user.collection.sets).toLocaleString('en-US') : '0'}</span>
              </div>


              <div className='collection-item bottom-border'>
                <h4>Unique Cards:</h4>
                <span className='num-display'>{user?.collection?.sets ? getTotalUniqueCards(user.collection.sets).toLocaleString('en-US') : '0'}</span>
              </div>

              <div className='collection-item bottom-border'>
                <h4>Sets in Collection:</h4>
                <span className='num-display'>{user?.collection?.sets?.length}</span>
              </div>

              <div className='collection-item bottom-border'>
                <h4>Completed Sets:</h4>
                <span className='num-display'>{collectedSets}</span>
              </div>


              {/* Collection Value */}
              <div className='collection-item'>
                <h4>Collection value</h4>
                <div className='collection-value'>

                  {calculating
                    ? <Loading size={'small'}/>
                    : displayValue()
                  }

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