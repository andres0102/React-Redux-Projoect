import React from 'react';
import Loader from 'react-loader-spinner';

export default function PageLoader() {
  return(
    <div id='preloader'>
      <div className="center text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
        <p className="white-text-bs">Παρακαλώ Περιμένετε...</p>
      </div>
    </div>
  )
}
