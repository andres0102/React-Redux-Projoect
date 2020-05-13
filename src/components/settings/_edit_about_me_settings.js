import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editAboutSettings } from '../../redux/actions/settings';
import PageLoader from '../page_loader';

class EditAboutMeSettings extends Component {
  constructor(props) {
    super(props)

    const currentUser = this.props.currentUser;

    this.state = {
      job: currentUser.about ? currentUser.about.job : '',
      hobby: currentUser.about ? currentUser.about.hobby : '',
      relationship_status: currentUser.about ? currentUser.about.relationship_status : '',
      looking_for: currentUser.about ? currentUser.about.looking_for : '',
      description: currentUser.about ? currentUser.about.description : ''
    }
  }

  handleJobChange = (e) => {
    const job = e.target.value
    return this.setState({job});
  }

  handleHobbyChange = (e) => {
    const hobby = e.target.value
    return this.setState({hobby});
  }

  handleRelationShipStatusChange = (e) => {
    const relationship_status = e.target.value
    return this.setState({relationship_status});
  }

  handleLookingForChange = (e) => {
    const looking_for = e.target.value
    return this.setState({looking_for});
  }

  handleDescriptionChange = (e) => {
    const description = e.target.value
    return this.setState({description});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let data = { about: {}};
    data.about = this.state

    this.props.editAboutSettings(data);
  }

  render() {
    return(
      <div className="col p-4">
        { this.props.isEditingSettings ? <PageLoader /> : null }
        <div className="dark-gray-text">
          <h2 className="pull-left">Για μένα</h2>
        </div>
        <div className="clearfix" />
        <form onSubmit={this.handleSubmit}>
          <hr className="colorgraph" />

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Επάγγελμα</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.job}
                  onChange={this.handleJobChange}
                  name="about[job]"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Χόμπυ</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.hobby}
                  onChange={this.handleHobbyChange}
                  name="about[hobby]"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Κατάσταση σχέσης</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.relationship_status}
                  onChange={this.handleRelationShipStatusChange}
                  name="about[relationship_status]"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Αναζητώ...</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.looking_for}
                  onChange={this.handleLookingForChange}
                  name="about[looking_for]"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Λίγα πράγματα για μένα</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <textarea
                className="form-control form-control-lg"
                rows="4"
                onChange={this.handleDescriptionChange}
                name="about[description]"
                value={this.state.description}
              />
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary btn-block"
                type="submit"
              >
                Αποθήκευση
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      editAboutSettings
    }, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.result,
    isEditingSettings: state.settings.isEditingSettings
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAboutMeSettings);
