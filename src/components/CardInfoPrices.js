import React from 'react'
import { formatLabel } from '../utils/formatLabel'

import { variants } from '../utils/variantList'

const CardInfoPrices = ({ card }) => {
  return (
    <div className="card-info-prices bottom-border">
          <h2 className="price-header bold">Prices</h2>
          {card?.tcgplayer
            ? <a href={card?.tcgplayer?.url} className='bold' target='_blank' rel="noreferrer">Buy Now From TCGPlayer</a>
            : <></>}
          <p className="update-date">Last Updated {card?.tcgplayer?.updatedAt}</p>

          {/* Check if card has TCGplayer section */}
          {card?.tcgplayer?.prices 
            ?<div className="pricing-container">
            {/* Renders the prices for each card price type found */}
            {Object.keys(card?.tcgplayer?.prices || {})
            .sort((a, b) => variants.indexOf(a) - variants.indexOf(b))
            .map(key => (
                <div className={`${key}-price-container prices-container`}>
                  <div>
                    <p className="price-title">{formatLabel(key)} Market</p>
                    <p className="price price-market">
                      ${card?.tcgplayer?.prices[key].market?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Low</p>
                    <p className="price price-low">
                    ${card?.tcgplayer?.prices[key].low?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Mid</p>
                    <p className="price price-mid">
                    ${card?.tcgplayer?.prices[key].mid?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} High</p>
                    <p className="price price-high">
                    ${card?.tcgplayer?.prices[key].high?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            }      
            </div>
            : 
            card?.cardmarket?.prices
            ? <div>
              <p className='price-title'>Average Sell Price</p>
              <p className='price price-market'>${card?.cardmarket?.prices?.averageSellPrice.toFixed(2)}</p>
            </div>
            : <span class="no-prices">No Prices Found</span>
          }
          
        </div>
  )
}

export default CardInfoPrices