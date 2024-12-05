import React from 'react'
import './css/Footer.css'

const Footer = ({}) => {
  return (
    <footer>
        <p>Pok&eacute;mon TCG Dex</p>
        <p>All data made available by the <a href="https://pokemontcg.io/" target='_blank'>Pok&eacute;mon TCG API</a></p>
        <small className="small-text">This website is not produced, endorsed, or affiliated with Nintendo or The Pok&eacute;mon Company.</small>
    </footer>
  )
}

export default Footer