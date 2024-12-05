import React from 'react'

const PageNavigation = ({ currentPage, pages, getCards, recentSearch }) => {

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