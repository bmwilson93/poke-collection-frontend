import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardContext from '../contexts/CardContext';

import CardList from '../components/CardList';
import Loading from '../components/Loading';
import './css/Set.css';

import { getSets } from '../utils/fetchData';

const Set = ({ sets, setSets, scrollValue, setScrollValue }) => {
  const { cards, getAllSetCards } = useContext(CardContext);
  const { id } = useParams();
  // const location = useLocation();
  const [expansionData, setExpansionData] = useState({})
  const [error, setError] = useState(false);

  const fetchSets = async () => {
    let response = await getSets();

    if ('error' in response) {
      console.log("Error getting the sets");
    } else {
      setSets(response);
      return response;
    }
  };

  useEffect(() => {
    const findExpansion = async () => {
      // console.log('Running the findExpansion function in the useEffect.', {
      //   'expansionId: ': id,
      //   'expansionData: ': expansionData
      // })

      if (sets.length > 0) {
        
        // console.log("Sets have been found. Search for the correct set by id: ", id)
        
        const expansion = sets.find(expansion => expansion?.id === id);

        // console.log(`found expansion result: `, expansion)

        if (expansion) {
          setExpansionData(expansion);
          if (cards.length == expansion.total) {
            if (cards?.[0]?.expansion?.id !== expansion?.id) {
              setScrollValue(0);
              getAllSetCards(expansion?.id);
            }
          } else {
            setScrollValue(0);
            getAllSetCards(expansion?.id);
          }
        } else { // Couldn't find the expansion
          // show an error
          // console.log("Couldn't find the set")
          setError(true);
        }

      } else { // No sets fetched, fetch all sets

        // console.log("So sets have been fetched. Fetch the sets.")

        const fetchedSets = await fetchSets();

        // console.log("Fetched sets.")
        // console.log(sets)

        const expansion = fetchedSets.find(expansion => expansion?.id === id);
        if (expansion) {
          setExpansionData(expansion);
          if (cards.length > 0) {
            if (cards?.[0]?.expansion?.id !== expansion?.id) {
              setScrollValue(0);
              getAllSetCards(expansion?.id);
            }
          } else {
            setScrollValue(0);
            getAllSetCards(expansion?.id);
          }
        } else { // Couldn't find the expansion
          // show an error
          // console.log("Couldn't find the set")
          setError(true);
        }

      }
    }

    findExpansion();
  }, []);


  return (
    <div className="set-container full-height">

      
      <div className="set-image-container">
        <img src={expansionData?.logo} alt={expansionData?.name} width='340px'/>
      </div>

      <div className="set-info-container">

        <div className="set-name-container">
          <h1>{expansionData?.name}</h1>
          <p>Release Date: {expansionData?.release_date}</p>
        </div>


        <div className="set-details">
          <p>Series: {expansionData?.series}</p>
          <p>Printed Total: {expansionData?.printed_total}</p>
          <p>Total: {expansionData?.total}</p>
          <img src={expansionData?.symbol} alt={expansionData?.name + " symbol"} width='40px' />
        </div>

      </div>


      <div className="card-list-container2">
        {error 
        ? <p>There was an error with dispaying the expansion.</p>
        :
        cards.length > 0 
        ? <CardList scrollValue={scrollValue} setScrollValue={setScrollValue}/>
        : <Loading />
        }
        
      </div>

      <button className="back-to-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to Top</button>
    </div>
  )
}

export default Set