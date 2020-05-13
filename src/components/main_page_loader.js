import React from 'react';
import logo from '../images/kardies-logo-original.png';

export default function MainPageLoader() {
  return(
    <div id='preloader'>
      <div className="center text-center">
        <img src={logo} className="logo heartbeat" alt='logo'/>
      </div>
    </div>
  )
}
