import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import './css/Sets.css'

import { fetchData } from '../utils/fetchData';

const Sets = ({ sets, setSets, setCurrentSet }) => {
  const navigate = useNavigate();

  const fetchSets = async () => {
    const url = "https://api.pokemontcg.io/v2/sets?orderBy:releaseDate";

    let responseData = await fetchData(url);

    if ('error' in responseData) {
      console.log("found an error");
    } else {
      const orderedData = responseData.data;
      orderedData.reverse();
  
      setSets(orderedData);
    }
  };

  useEffect(() => {

    if (sets.length < 1) {
      fetchSets();
    }
  }, []);


  const allSets = sets.map((item) => {
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

  return (
    <div className='sets-container'>

      {/* If no sets, display Loading component */}
      {sets.length > 0 
      ? <ul className="sets-list">{allSets}</ul> 
      : <Loading />}

    </div>
  )
}

export default Sets