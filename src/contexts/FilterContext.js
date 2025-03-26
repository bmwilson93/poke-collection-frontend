import React from 'react';
import { useState } from 'react';

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [cardsFilter, setCardsFilter] = useState('all'); // Filters for card list (IE: collected/not collected)
  const [cardsSort, setCardsSort] = useState('number'); // Sort options for card list
  // const [setsFilter, setSetsFilter] = useState('All') // Filter for sets by series
  const [seriesFilter, setSeriesFilter] = useState('All')
  const [setsSort, setSetsSort] = useState('newest'); // Sort for sets
  
  return (
    <FilterContext.Provider value={{ 
      cardsFilter,
      setCardsFilter,
      cardsSort,
      setCardsSort,
      seriesFilter, 
      setSeriesFilter,
      setsSort,
      setSetsSort
     }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;