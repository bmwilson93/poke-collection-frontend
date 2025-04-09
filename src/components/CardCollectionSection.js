import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

import { fetchAPI } from '../utils/fetchAPI';
import CollectionVariant from './CollectionVariant';

import { variants } from '../utils/variantList';

  
const CardCollectionSection = ({ card, setCard }) => {
  const { setUser } = useContext(UserContext);

  // runs the call to the backend to update the collection
  const handleCollectionClick = async (action, variant) => {
    const body = JSON.stringify({
      "card_id": card.id,
      "set_id": card.set.id,
      "variant": variant
    })
    const response = await fetchAPI(`collection/${action}`, 'POST', body)

    if (response.user) setUser(response.user);
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