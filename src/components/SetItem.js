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
      <div className="set-image-container">
        <img className="set-img" src={set.images.logo} alt={set.name} width="100px"/>
      </div>
      <div className='info-container'>
        <div className="name-container">
          <div>
            <img className='set-icon' src={set.images.symbol} alt=""/>
          </div>
          <div className="set-name">
            <p>{set.name}</p>
          </div>
        </div>
        <span className="release-date">Released {set.releaseDate}</span>
      </div>
    </li>
  )
}

export default SetItem