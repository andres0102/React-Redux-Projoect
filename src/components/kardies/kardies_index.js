import React from 'react';
import KardiesList from './kardies_list';

export default function KardiesIndex() {
  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <KardiesList />
        </div>
      </div>
    </div>
  );
}
