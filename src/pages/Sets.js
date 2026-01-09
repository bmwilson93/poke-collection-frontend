import React from 'react'
import { useEffect, useState, useContext } from 'react';
import FilterContext from '../contexts/FilterContext';
import Loading from '../components/Loading';
import SetItem from '../components/SetItem';
import './css/Sets.css'

import { getSets } from '../utils/fetchData';

const Sets = ({ sets, setSets, setCurrentSet, setsScrollValue, setSetsScrollValue }) => {
  const { setsSort, setSetsSort, seriesFilter, setSeriesFilter } = useContext(FilterContext);
  const [mappedSets, setMappedSets] = useState([<li></li>]);
  const [series, setSeries] = useState([])

  const fetchSets = async () => {
    let response = await getSets();

    if ('error' in response) {
      console.log("Error getting the sets");
    } else {
      getSeries(response);
      setSets(response);
      setMappedSets(mapSets(response));
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
      getSeries(sets.toReversed());
      handleDisplaySets();
    }
    
    setTimeout(() => {window.scrollTo(0, setsScrollValue)}, 10);
  }, []);

  // Update the mapped Sets when sort or filter is updated
  useEffect(() => {
    handleDisplaySets();
  }, [setsSort, seriesFilter])

  const mapSets = (allSets) => {
    return allSets.map((item) => {
      return (
        <SetItem set={item} setCurrentSet={setCurrentSet} setSetsScrollValue={setSetsScrollValue} />
      )
    });
  }
  

  const handleDisplaySets = () => {
    // filter then sort and map
    let filteredSets = [];

    if (seriesFilter != "All") {
      filteredSets = sets.filter(set => set.series === seriesFilter);
    } else {
      filteredSets.push(...sets)
    }

    if (setsSort === 'oldest') {
      setMappedSets(mapSets(filteredSets.toReversed()));
    } else {
      setMappedSets(mapSets(filteredSets));
    }
  }

  return (
    <div className='sets-container full-height'>

      

      <div className='list-container'>
        {/* If no sets, display Loading component */}
        {sets.length > 0 
        ? <>
          <div className="sort-container">

            <div className='sort-item'>
                <p>Sort by Release Date: </p>
                <select
                  value={setsSort}
                  onChange={(e) => {setSetsSort(e.target.value)}}
                >
                  <option value='newest'>Newest</option>
                  <option value='oldest'>Oldest</option>
                </select>
              </div>

              <div className='sort-item series-filter-container'>
                <p>Filter by Series: </p>
                <select
                  value={seriesFilter}
                  onChange={(e) => {setSeriesFilter(e.target.value)}}
                >
                  {series.map(serie => (<option value={serie}>{serie}</option>))}
                </select>
              </div>

          </div>
            

            <ul className="sets-list">{mappedSets}</ul> 
          </>
        : <Loading />}
      </div>

    </div>
  )
}

export default Sets