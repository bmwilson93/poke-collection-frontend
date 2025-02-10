import React from 'react'

const CollectionVariant = ({ key }) => {
  return (
    <li key={key} className='li-variant'>
      <span className='variant'>{formatLabel(key)}</span>
      <div>
        <button
          className='collection-btn'
          onClick={() => handleCollectionClick('remove', key)}
        >
          -
        </button>
        <span className='variant variant-total'>
          {displayQuantities(key)}
        </span>
        <button
          className='collection-btn'
          onClick={() => handleCollectionClick('add', key)}
        >
          +
        </button>
      </div>
    </li>
  )
}

export default CollectionVariant