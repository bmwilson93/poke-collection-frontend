import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import './css/NoPage.css'

const NoPage = () => {
  let navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, []);

  // Should automatically redirect to the Home page, but returns a page just in case
  return (
    <div className="no_page_container">
      <div>
        <h1>Oh No!</h1>
        <p>Sorry, looks like this page doesn't exist...</p>
      </div>
    </div>
  )
}

export default NoPage