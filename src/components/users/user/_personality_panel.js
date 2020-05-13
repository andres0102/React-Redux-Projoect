import React, { Component } from 'react';

export default class PersonalityPanel extends Component {
  renderPersonalityDetails = () => {
    const userDetail = this.props.userDetail;

    if(userDetail && userDetail.personality_type) {
      return (
        <div>
          <i className="d-inline-block aluminium-text fa fa-flask fa-2x pull-left" />
          <h3 className='d-inline'> Προσωπικότητα: </h3>
          <span className="wrapper">
            <h2 className="d-inline orange-text personality-header">
              {this.props.userDetail.personality_type}
            </h2>
          </span>
          <hr />
          <p> { this.props.userDetail.personality_detail } </p>
        </div>
      )
    } else {
      return (
        <h4 className="aluminium-text">
          Ο χρήστης δεν έχει κάνει το τέστ προσωπικότητας.
        </h4>
      )
    }

  }

  render() {
    return(
      <div id="personality_type" className="col-lg-4 p-4 text-center">
        { this.renderPersonalityDetails() }
      </div>
    );
  }
}
