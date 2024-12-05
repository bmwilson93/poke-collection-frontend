import React from 'react'
import './css/Loading.css'


const Loading = () => {
  return (
    <div className="loading"
      style={{
        height: '80vh',
      }}
    >
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading