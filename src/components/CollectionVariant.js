import { formatLabel } from '../utils/formatLabel';

const CollectionVariant = ({ variant, handleCollectionClick, displayQuantities }) => {

  return (
    <li key={variant} className='li-variant'>
      <span className='variant'>{formatLabel(variant)}</span>
      <div>
        <button
          className='collection-btn'
          onClick={() => handleCollectionClick('remove', variant)}
        >
          -
        </button>
        <span className='variant variant-total'>
          {displayQuantities(variant)}
        </span>
        <button
          className='collection-btn'
          onClick={() => handleCollectionClick('add', variant)}
        >
          +
        </button>
      </div>
    </li>
  )
}

export default CollectionVariant