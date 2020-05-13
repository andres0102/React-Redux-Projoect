import React from 'react';
import image_404 from '../../images/404.png';

const NoMatch = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <img
            className="col-sm-12 col-md-5"
            src={image_404}
            alt="Kardies page not found 404"
          />
        <h4 className="mt-2"> Η σελίδα που ζητήσατε δεν υπάρχει </h4>
          <a href="/" className="button_shadow">Πίσω</a>
        </div>
      </div>
    </div>
  )
}

export default NoMatch;
