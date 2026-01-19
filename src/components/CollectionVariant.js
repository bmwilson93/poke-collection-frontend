import { formatLabel } from '../utils/formatLabel';
import mailIcon from '../assets/mail-send-deselect-48.png';
import selectedMailIcon from '../assets/mail-send-regular-48.png';

const CollectionVariant = ({ variant, handleCollectionClick, displayQuantities, card }) => {
  const hasCollected = () => {
    console.log("checking Variant")
    if (card?.collectedQuantities) {
      return card?.collectedQuantities.some(e => Object.hasOwn(e, variant)) 
    }
    return false
  }

  const hasIncoming = () => {
    if (card?.incomingVariants) {
      return card?.incomingVariants.some(e => Object.hasOwn(e, variant)) 
    }
    return false
  }

  const handleIncomingClick = async () => {
    if (hasIncoming()) {
      handleCollectionClick('incoming/remove', variant)
    } else {
      handleCollectionClick('incoming/add', variant);
    }
  }

  const handleAddToCollection = async () => {
    if (hasIncoming()) {
      await handleIncomingClick();
    }
    handleCollectionClick('add', variant);
  }

  return (
    <li key={variant} className='li-variant'>
      <div className='variant variant-name'>
        {formatLabel(variant)}
        {!hasCollected()
        ? <button 
            className='incoming-btn'
            onClick={() => handleIncomingClick()}>
              <img src={hasIncoming() ? selectedMailIcon : mailIcon}/>
          </button>
        : <></>}
        </div>
      <div>

        {
          hasCollected()
          ?
          <button
          className='collection-btn'
          onClick={() => handleCollectionClick('remove', variant)}
          >
          -
        </button>
        :
        <></>
        }

        <span className='variant variant-total'>
          {displayQuantities(variant)}
        </span>

        <button
          className='collection-btn'
          onClick={() => handleAddToCollection()}
        >
          +
        </button>

      </div>
    </li>
  )
}

export default CollectionVariant