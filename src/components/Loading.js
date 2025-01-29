import React from 'react'
import './css/Loading.css'


const Loading = ({ size = "large"}) => {
  return (
    <div className="loading">
      <div className={size == 'small' ? "lds-ring small" : "lds-ring"}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading