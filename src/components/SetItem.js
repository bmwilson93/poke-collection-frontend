import { useNavigate } from 'react-router-dom';

const SetItem = ({ set, setCurrentSet, setSetsScrollValue }) => {
  const navigate = useNavigate();

  return (
    <li 
      className="set-li hover-grow" 
      key={set.id} 
      onClick={() => {
        setCurrentSet(set.id); 
        setSetsScrollValue(window.scrollY);
        navigate(`/set/${set.id}`, {state:{set: set}});
      }}
    >
      <div>
        <img className='set-icon' src={set.symbol} alt=""/>
      </div>
      <div className="set-image-container">
        <img className="set-img" src={set.logo} alt={set.name} width="100px"/>
      </div>
      <div className='info-container'>
        <div className="name-container">
          <div className="set-name">
            <p>{set.name}</p>
          </div>
        </div>
        <span className="release-date">Released {set.release_date}</span>
        <span>Printed Total: {set.printed_total}</span>
        <span>Total: {set.total}</span>
      </div>
    </li>
  )
}

export default SetItem