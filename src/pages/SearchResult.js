import { useContext } from 'react'
import CardContext from '../contexts/CardContext'
import CardList from '../components/CardList'
import PageNavigation from '../components/PageNavigation'
import Loading from '../components/Loading'

const SearchResult = ({ 
  cardSort, setCardSort, filterState, setFilterState, scrollValue, setScrollValue, recentSearch }) => {
  const { cardCount } = useContext(CardContext);

  return (
    <div className="search-results-container full-height">

      {(() => {
      if (cardCount == -1) {
        return <Loading />
        } else if (cardCount == 0) {
          return <div className="not-found-message">No Cards Found...</div>
          } else {
          return (
            <>
              <CardList cardSort={cardSort} setCardSort={setCardSort} filterState={filterState} setFilterState={setFilterState} scrollValue={scrollValue} setScrollValue={setScrollValue} />
              <PageNavigation recentSearch={recentSearch}/>
            </>
          )
        }
      })()}
      
    </div>
  )
}

export default SearchResult