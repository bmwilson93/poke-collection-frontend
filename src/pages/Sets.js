import React from 'react'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import SetItem from '../components/SetItem';
import './css/Sets.css'

import { fetchData } from '../utils/fetchData';

const Sets = ({ selectedSort, setSelectedSort, sets, setSets, setCurrentSet, setsScrollValue, setSetsScrollValue }) => {
  const [mappedSets, setMappedSets] = useState([<li></li>]);
  const [series, setSeries] = useState([])
  const [seriesFilter, setSeriesFilter] = useState('All')

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

  // Update the mapped Sets when sort or filter is updated
  useEffect(() => {
    handleDisplaySets();
  }, [selectedSort, seriesFilter])

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

  const handleSeriesFilterChange = (e) => {
    setSeriesFilter(e.target.value)
    // filter the mapped sets by the series
    setMappedSets()
  }

  const handleDisplaySets = () => {
    // filter then sort and map
    let filteredSets = [];

    if (seriesFilter != "All") {
      filteredSets = sets.filter(set => set.series === seriesFilter);
    } else {
      filteredSets.push(...sets)
    }

    if (selectedSort === 'oldest') {
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
            <div className='sort-container'>
              <p>Sort by Release Date: </p>
              <select
                value={selectedSort}
                onChange={(e) => {setSelectedSort(e.target.value)}}
              >
                <option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
              </select>
            </div>

            <div className='sort-container series-filter-container'>
              <p>Filter by Series: </p>
              <select
                value={seriesFilter}
                onChange={(e) => {setSeriesFilter(e.target.value)}}
              >
                {series.map(serie => (<option value={serie}>{serie}</option>))}
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