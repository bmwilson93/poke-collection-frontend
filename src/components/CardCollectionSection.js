import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

import CollectionVariant from './CollectionVariant';

import { variants } from '../utils/variantList';

  
const CardCollectionSection = ({ card }) => {
  const { updateCollection } = useContext(UserContext);

  // runs the call to the backend to update the collection
  const handleCollectionClick = async (action, variant) => {
    updateCollection(card.id, card.set.id, action, variant)
  }  

  // Displays the collected qty
  const displayQuantities = (variant) => {
    if (card.collectedQuantities) {
      for (let i = 0; i < card.collectedQuantities.length; i++) {
        if (Object.hasOwn(card.collectedQuantities[i], variant)) return card.collectedQuantities[i][variant];
      }
    }
    return 0;
  }

  const variantList = Object.keys(card.tcgplayer?.prices || {})
  .sort((a, b) => variants.indexOf(a) - variants.indexOf(b))
  .map(key => (
    <CollectionVariant 
      key={key}
      variant={key}
      handleCollectionClick={handleCollectionClick}
      displayQuantities={displayQuantities} 
    />
  ));

  return (
    <div className="card-collection bottom-border">
      <h2 className='price-header bold'>Your Collection</h2>
      {/* If card has tcgplayer prices, use them to display card variants */}
        {card.tcgplayer
        ? <ul>
            {variantList}
          </ul>
        : <ul>
            {Object.keys({'normal':"", 'holofoil':"", 'reverseHolofoil':""})
            .map(key => (<CollectionVariant 
                key={key}
                variant={key} 
                handleCollectionClick={handleCollectionClick}
                displayQuantities={displayQuantities} 
              />))}
          </ul>
        }
    </div>
  )
}

export default CardCollectionSection