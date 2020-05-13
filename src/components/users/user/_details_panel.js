import React, { Component } from 'react';

export default class DetailsPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      about: {
        job: null,
        hobby: null,
        relationship_status: null,
        looking_for: null,
        description: null
      }
    }
  }

  componentDidMount() {
    this.setState({about: this.props.about})
  }

  renderNoEntry = () => {
    return (
      <span className="aluminium-text">
        Ο χρήστης δεν έχει αναρτήσει κάτι ακόμα
      </span>
    )
  }

  renderDetails = (field) => {
    if(this.state.about === undefined || this.state.about === null) {
      return (
        <p>
          <em>
            {this.renderNoEntry()}
          </em>
        </p>
      )
    } else {
      return (
        <p>
          <em>
            { (this.state.about[field] === null || this.state.about[field] === '') ?
              this.renderNoEntry() :
              this.state.about[field] }
          </em>
        </p>
      )
    }
  }

  render() {
    return(
      <div id="details-panel" className="col-lg-5 p-4 bg-white">
        <div className="media">
          <blockquote>
            <p className="quotation-mark">“</p>
          </blockquote>
          <div className="media-body break-word">
            { this.renderDetails('description') }
          </div>
        </div>
        <hr />
        <dl className="row">
          <dt className="col-sm-4">Επάγγελμα</dt>
          <dd className="col-sm-8">
            { this.renderDetails('job') }
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-4">Χόμπυ</dt>
          <dd className="col-sm-8">
            { this.renderDetails('hobby') }
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-4">Κατάσταση σχέσης</dt>
          <dd className="col-sm-8">
            { this.renderDetails('relationship_status') }
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-4">Αναζητώ...</dt>
          <dd className="col-sm-8">
            { this.renderDetails('looking_for') }
          </dd>
        </dl>
      </div>
    );
  }
}
