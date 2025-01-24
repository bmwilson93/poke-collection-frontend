import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import './css/Sets.css'

import { fetchData } from '../utils/fetchData';

const Sets = ({ sets, setSets, setCurrentSet, setsScrollValue, setSetsScrollValue }) => {
  const navigate = useNavigate();
  const [mappedSets, setMappedSets] = useState([<li></li>]);
  const [selectedSort, setSelectedSort] = useState('newest'); // TODO: May need to move to App.js

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
      if (selectedSort == 'oldest') {
        setMappedSets(mapSets(sets.toReversed()));
      } else {
        setMappedSets(mapSets(sets));
      }
    }
    
    setTimeout(() => {window.scrollTo(0, setsScrollValue)}, 10);
  }, []);


  const mapSets = (allSets) => {
    return allSets.map((item) => {
      return (
        <li 
          className="set-li hover-grow" 
          key={item.id} 
          onClick={() => {
            setCurrentSet(item.id); 
            setSetsScrollValue(window.scrollY);
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
  
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value)
    if (e.target.value === "oldest") {
      setMappedSets(mapSets(sets.toReversed()));
    } else {
      setMappedSets(mapSets(sets));
    }
  }

  return (
    <div className='sets-container full-height'>

      <div className='sort-container'>
        <p>Sort by Release Date: {}</p>
        <select
          value={selectedSort}
          onChange={(e) => {handleSortChange(e)}}
        >
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </div>

      <div className='list-container'>
        {/* If no sets, display Loading component */}
        {sets.length > 0 
        ? <ul className="sets-list">{mappedSets}</ul> 
        : <Loading />}
      </div>

    </div>
  )
}

export default Sets