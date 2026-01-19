import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import CardContext from '../contexts/CardContext';
import { getTypeImage } from '../utils/getTypeImage';

const CardInfoDetails = ({ card }) => {
  const navigate = useNavigate();
  const { clearCards } = useContext(CardContext);

  // Map each of the card details (attacks, abilities, rules, etc...)
  const abilities = (card?.abilities 
    ? card?.abilities.map((ability) => {
      return (
        <li>
          <div className="ability-container">
            <span className="ability-name">{ability.name}</span>
            {ability.text}
          </div>
        </li>
      )
    }) 
    : null)

  const attacks = (card?.attacks 
    ? card?.attacks.map((attack) => {
      return (
        <li>
          <div className="attack-container">

            <div className="attack-title">
              <div className="align-left">
                <div className="attack-cost-container">
                  {attack.cost.map((cost) => 
                    <img className="type-image" src={getTypeImage(cost)} alt={cost} />
                  )}
                </div>
                <span className="attack-name">{attack.name}</span>
              </div>
              <div className="align-right">
                <span className="attack-damage">{attack.damage}</span>
              </div>
            </div>

            <div className='attack-details'>
              <p>{attack.text}</p>
            </div>

          </div>
        </li>
      )
    }) : null
  )

  const rules = (card?.rules ? card?.rules.map((rule) => {
    return (
      <li className="info-item">{rule}</li>
    )
  }) : null
  )


  return (
    <div className="card-info-details">
          {card?.abilities
          ? <div className="card-abilities info-section">
              <p className="section-title">Abilities</p>
              <ul className="card-info-list">
                {abilities}
              </ul>
            </div>
          : <></>
          }

          {card?.attacks
          ? <div className="card-attacks info-section">
              <p className="section-title">Attacks</p>
              <ul className="card-info-list">
                {attacks}
              </ul>
            </div>
          : <></>
          }

          {card?.rules
          ? <div className="card-rules info-section">
              <p className="section-title">Rules</p>
              <ul className="card-info-list">{rules}</ul>
            </div>
          : <></>
          }
          
          <div className="bottom-border"></div>

          <div className="card-misc-info">
            <div className="info-line1 info-line section-title">
              <div className="weakness-container">
                <p>Weakness</p>
                {card?.weaknesses 
                  ? <ul>{card?.weaknesses.map((item) => <li><img className="type-image" src={getTypeImage(item.type)} alt={item.type}/><span className="type-value">{item.value}</span></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>

              <div className="resistance-container">
                <p>Resistance</p>
                {card?.resistances 
                  ? <ul id="resistance-list">{card?.resistances.map((item) => <li><img className="type-image" src={getTypeImage(item.type)} alt={item.type}/><span className="type-value">{item.value}</span></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>

              <div className="retreat-cost-container">
                <p>Retreat Cost</p>
                {card?.retreat_cost 
                  ? <ul>{card?.retreat_cost.map((item) => <li><img className="type-image" src={getTypeImage(item)} alt={item}/></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>
            </div>

            <div className="info-line2 info-line">
              <div className="center-text">
                <p>Artist</p>
                {card?.artist ? card?.artist : "N/A"}
              </div>
              <div className="center-text">
                <p>Rarity</p>
                {card?.rarity}
              </div>
              <div className="center-text">
                <p>Set</p>
                <div className="card-set-container link"
                  onClick={() => {
                    // clearCards();
                    navigate(`/set/${card?.expansion?.id}`)                  
                  }}
                >
                  <span>{card?.expansion?.name}</span>
                  <img src={card?.expansion?.images?.symbol} alt="" width="30px"/>
                </div>
              </div>
            </div>

            <div>
              <div className="card-number-container center-text">
                <p>Number</p>
                <p>{card?.number} / {card?.expansion?.printed_total}</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CardInfoDetails