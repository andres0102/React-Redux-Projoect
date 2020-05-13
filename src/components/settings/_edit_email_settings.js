import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editEmailSettings } from '../../redux/actions/settings';

class EditEmailSettings extends Component {
  constructor(props) {
    super(props)

    const currentUser = this.props.currentUser;

    this.state = {
      likes: (currentUser.email_preference || true).likes,
      messages: (currentUser.email_preference || true).messages,
      news: (currentUser.email_preference || true).news
    }
  }

  handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.checked;

    return this.setState({ [field]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let data = { email_preference: {}};
    data.email_preference = this.state

    this.props.editEmailSettings(data);
  }

  render() {
    return(
      <div className="col p-4">
        <div className="dark-gray-text">
          <h2 className="mb-4 pull-left">Ειδοποιήσεις Email</h2>
        </div>
        <div className="clearfix" />
        <form className="edit_email_preference" onSubmit={this.handleSubmit}>
          <hr className="colorgraph" />

          <div className="form-group">
            <label className="switch">
              <input
                defaultValue={this.state.likes}
                checked={this.state.likes}
                onChange={this.handleChange}
                name="likes"
                type="checkbox"
              />
              <span className="slider round" />
            </label>
            <h5 className='pull-right pl-2'>
              Να λαμβάνω emails όταν μου στέλνουν καρδιές
            </h5>
          </div>
          <hr />

          <div className="form-group">
            <label className="switch">
              <input
                defaultValue={this.state.messages}
                checked={this.state.messages}
                onChange={this.handleChange}
                name="messages"
                type="checkbox"
              />
              <span className="slider round" />
            </label>
            <h5 className='pull-right pl-2'>
              Να λαμβάνω emails όταν μου στέλνουν μηνύματα
            </h5>
          </div>
          <hr />

          <div className="form-group">
            <label className="switch">
              <input
                defaultValue={this.state.news}
                checked={this.state.news}
                onChange={this.handleChange}
                name="news"
                type="checkbox"
              />
              <span className="slider round" />
            </label>
            <h5 className='pull-right pl-2'>
              Να λαμβάνω emails για γενικά νέα
            </h5>
          </div>
          <hr />

          <input
            value="Αποθήκευση"
            className="btn btn-primary btn-block"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      editEmailSettings
    }, dispatch)
  };
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser.result }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmailSettings);
