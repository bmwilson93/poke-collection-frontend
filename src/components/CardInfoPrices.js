import React from 'react'
import { formatLabel } from '../utils/formatLabel'

import { variants } from '../utils/variantList'

const CardInfoPrices = ({ card }) => {
  return (
    <div className="card-info-prices bottom-border">
      <h2 className="price-header bold">Prices</h2>
      
      {card?.variants && card.variants.length > 0 ? (
        <div className="pricing-container">
          {card.variants.map((variant, index) => {
            // Find NM condition price (most common for card pricing)
            const nmPrice = variant.prices?.find(p => p.condition === "NM");
            // Or get the first available price
            const firstPrice = variant.prices?.[0];
            const displayPrice = nmPrice || firstPrice;
            
            return (
              <div key={`${variant.name}-${index}`} className={`${variant.name}-price-container prices-container`}>
                <div>
                  <p className="price-title">{formatLabel(variant.name)} Market</p>
                  <p className="price price-market">
                    ${displayPrice?.market?.toFixed(2) || 'N/A'}
                  </p>
                </div>
                {displayPrice?.low && (
                  <div>
                    <p className="price-title">{formatLabel(variant.name)} Low</p>
                    <p className="price price-low">
                      ${displayPrice.low.toFixed(2)}
                    </p>
                  </div>
                )}
                {displayPrice && (
                  <div>
                    <p className="price-title">Condition</p>
                    <p className="price price-condition">
                      {formatLabel(displayPrice.condition)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <span className="no-prices">No Prices Found</span>
      )}
    </div>
  )
}

export default CardInfoPrices