import { useContext } from 'react'
import CardContext from '../contexts/CardContext'

const PageNavigation = ({ recentSearch }) => {
  const { pages, currentPage, getCards } = useContext(CardContext);

  const handleClick = (nextPage) => {
    getCards(recentSearch, nextPage)
  }

  return (

    <div className='page-navigation-container'>

      {currentPage > 1 
      ? <button onClick={() => handleClick(currentPage - 1)}>Prev</button> 
      : null}

      {currentPage !== pages 
      ? <button onClick={() => handleClick(currentPage + 1)}>Next</button>
      : null}

    </div>
  )
}

export default PageNavigation