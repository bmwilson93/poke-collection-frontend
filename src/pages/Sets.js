import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import './css/Sets.css'

import { fetchData } from '../utils/fetchData';

const Sets = ({ sets, setSets, setCurrentSet }) => {
  const navigate = useNavigate();
  const [mappedSets, setMappedSets] = useState([<li></li>]);

  const fetchSets = async () => {
    const url = "https://api.pokemontcg.io/v2/sets?orderBy=releaseDate";

    let responseData = await fetchData(url);

    if ('error' in responseData) {
      console.log("found an error");
    } else {
      const orderedData = responseData.data;
      orderedData.reverse(); // sets are giving by release date, reversing puts the newest sets first
      setSets(orderedData);
      setMappedSets(mapSets(orderedData));
    }
  };


  // Fetch all sets on load if not already fetched
  useEffect(() => {
    if (sets.length < 1) {
      fetchSets();
    } else {
      setMappedSets(mapSets(sets));
    }
  }, []);


  const mapSets = (allSets) => {
    console.log('test')
    return allSets.map((item) => {
      return (
        <li 
          className="set-li hover-grow" 
          key={item.id} 
          onClick={() => {
            setCurrentSet(item.id); 
            navigate(`/set/${item.id}`, {state:{set: item}});
          }}
        >
          <div className="set-image-container">
            <img className="set-img" src={item.images.logo} alt={item.name} width="100px"/>
          </div>
          <div className='info-container'>
            <div className="name-container">
              <div>
                <img className='set-icon' src={item.images.symbol} alt=""/>
              </div>
              <div className="set-name">
                <p>{item.name}</p>
              </div>
            </div>
            <span className="release-date">Released {item.releaseDate}</span>
          </div>
        </li>
      )
    });
  }

  // let allSets = mapSets(sets);
  // setMappedSets(mapSets(sets));
  

  return (
    <div className='sets-container'>

      <div>
        <button onClick={() => {setMappedSets(mapSets(sets.reverse()))}}>CLick</button>
      </div>

      {/* If no sets, display Loading component */}
      {sets.length > 0 
      ? <ul className="sets-list">{mappedSets}</ul> 
      : <Loading />}

    </div>
  )
}

export default Sets