import React from 'react'
import CardList from '../components/CardList'
import PageNavigation from '../components/PageNavigation'
import Loading from '../components/Loading'

const SearchResult = ({ cards, currentPage, pages, getCards, recentSearch, cardCount}) => {
  return (
    <div className="search-results-container">
      <CardList cards={cards}/>
      
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