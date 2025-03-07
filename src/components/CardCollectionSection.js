import { fetchAPI } from '../utils/fetchAPI';
import CollectionVariant from './CollectionVariant';

import { variants } from '../utils/variantList';

  
const CardCollectionSection = ({ card, setUser, setCard }) => {

  // runs the call to the backend to update the collection
  const handleCollectionClick = async (action, variant) => {
    const body = JSON.stringify({
      "card_id": card.id,
      "set_id": card.set.id,
      "variant": variant
    })
    const response = await fetchAPI(`collection/${action}`, 'POST', body)
    setUser(response);

    //update the card state
    setCard(prevCard => {

      if (!prevCard.collected) {

        prevCard.collected = true;
        prevCard.collectedQuantities = [{[variant]: 1}]

      } else {

        let found = false;
        for (let i = 0; i < prevCard.collectedQuantities.length; i++) {
          if (Object.hasOwn(prevCard.collectedQuantities[i], variant)) {
            found = true;
            if (action === "add" ) {
              prevCard.collectedQuantities[i][variant]++;
            } else { // remove
              prevCard.collectedQuantities[i][variant]--;
              if (prevCard.collectedQuantities[i][variant] === 0) prevCard.collectedQuantities.splice(i, 1)
              if (prevCard.collectedQuantities.length < 1) {
                delete prevCard.collected;
              }
            }
          }
        }

        if (!found && action === "add") { // variant not found, add it to the collectedQuantities array
          prevCard.collectedQuantities.push({[variant]: 1})
        }
      }


      return prevCard;
    })
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