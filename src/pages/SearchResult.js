import React from 'react'
import CardList from '../components/CardList'
import PageNavigation from '../components/PageNavigation'
import Loading from '../components/Loading'

const SearchResult = ({ filterState, setFilterState, scrollValue, setScrollValue, cards, currentPage, pages, getCards, recentSearch, cardCount, user}) => {
  return (
    <div className="search-results-container">
      <CardList filterState={filterState} setFilterState={setFilterState} scrollValue={scrollValue} setScrollValue={setScrollValue}cards={cards} user={user}/>
      
      {(() => {
        if (cardCount == -1) {
          return <Loading />
        } else if (cardCount == 0) {
          return <div className="not-found-message">No Cards Found...</div>
        } else {
          return <PageNavigation currentPage={currentPage} pages={pages} getCards={getCards} recentSearch={recentSearch}/>
        }
      })()}

      
    </div>
  )
}

export default SearchResult