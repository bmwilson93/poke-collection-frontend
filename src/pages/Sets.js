import React from 'react'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import SetItem from '../components/SetItem';
import './css/Sets.css'

import { fetchData } from '../utils/fetchData';

const Sets = ({ selectedSort, setSelectedSort, sets, setSets, setCurrentSet, setsScrollValue, setSetsScrollValue }) => {
  const [mappedSets, setMappedSets] = useState([<li></li>]);
  const [series, setSeries] = useState([])
  const [setsFilter, setSetsFilter] = useState('All')

  const fetchSets = async () => {
    const url = "https://api.pokemontcg.io/v2/sets?orderBy=releaseDate";

    let responseData = await fetchData(url);

    if ('error' in responseData) {
      console.log("found an error");
    } else {
      getSeries(responseData.data);
      const orderedData = responseData.data;
      orderedData.reverse(); // sets are giving by release date, reversing puts the newest sets first
      setSets(orderedData);
      setMappedSets(mapSets(orderedData));
    }
  };

  const getSeries = (setList) => {
    let seriesArray = [];
    for (let i = 0; i < setList.length; i++) {
      if (seriesArray.indexOf(setList[i].series) < 0) {
        seriesArray.push(setList[i].series)
      }
    }
    seriesArray.push("All");
    seriesArray.reverse();
    setSeries(seriesArray);
  }


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
        <SetItem set={item} setCurrentSet={setCurrentSet} setSetsScrollValue={setSetsScrollValue} />
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

      

      <div className='list-container'>
        {/* If no sets, display Loading component */}
        {sets.length > 0 
        ? <>
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

            <ul className="sets-list">{mappedSets}</ul> 
          </>
        : <Loading />}
      </div>

    </div>
  )
}

export default Sets