import React from 'react'
import logo from '../../src/images/header-logo.svg'; 



export default function Header() {
  return (
    <div className="header">
    <div className="header__logo">
    <img alt='Место Россия' src={logo}/>
    </div>
    </div>
  )
}
