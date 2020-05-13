import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { renderImage } from '../../helpers/render_image';
import sendHeart from '../../services/send_heart';
import { alertError } from '../../redux/actions/alerts';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heartIcon: null
    }
  }

  genderType(gender) {
    if (gender === "male") {
      return <i className="fa fa-male male"></i>
    } else if (gender === "female") {
      return <i className="fa fa-female female"></i>
    } else if (gender === "other") {
      return <i className="fa fa-transgender other"></i>
    } else {
      return <i className="fa fa-male male"></i>
    }
  }

  openModal = (e) => {
    e.preventDefault();
    let profile_picture = this.props.user.profile_picture_thumb;
    let username = this.props.user.username;

    if (typeof this.props.openModal === 'function') {
      this.props.openModal(username, profile_picture);
    }
  }

  renderHeartIcon = () => {
    if(this.state.heartIcon !== null) {
      return <i className={`fa ${this.state.heartIcon} faa-pulse faa-fast`} />
    }

    if(this.props.user.like === true) {
      return <i className="fa fa-heart faa-pulse faa-fast" />
    } else {
      return <i className="fa fa-heart-o faa-pulse faa-fast" />
    }
  }

  sendHeart = (e) => {
    e.preventDefault()
    let username = this.props.user.username;

    sendHeart(username)
      .then(res => {
        this.setState({heartIcon: res.heart})
      }, error => {
        this.props.dispatch(alertError(error.toString()))
      })
      .catch(error => { this.props.dispatch(alertError('Κάτι πήγε στραβά')) })
  }

  clearResults = () => {
    this.props.clearResults()
  }

  render() {
    return(
      <div className="card effect1 my-4">
        <div className="card-img-top">
          <div className="float-left" />
          <Link
            to={`/users/${this.props.user.username}`}
            onClick={this.clearResults}
          >
            <div
              className="card-bg"
              style={{
                display: 'block',
                backgroundImage: `url(${renderImage(this.props.user.profile_picture_medium)})`
              }}
            >
              {
                this.props.user.is_signed_in &&
                <div className="pull-left m-1">
                  <span className="online-now" />
                </div>
              }
            </div>
          </Link>
        </div>
        <div className="card-block">
          <div className="card-title">
            <div className="row mt-3">
              <div className="col-10">
                <p className="orange-text text-left pl-2">
                  <strong>{ this.props.user.username }</strong>
                </p>
              </div>
              <div className="col-2 pl-1">
                <div className='row'>
                  { this.genderType(this.props.user.user_detail.gender) }
                  <small className="ml-2">
                    { this.props.user.user_detail.age }
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text text-left pl-2">
            <p>
              <i className="fa fa-map-marker mr-1 dark-gray-text" />
              { this.props.user.user_detail.state }
            </p>
          </div>
          <div className="card-footer">
            <span className="message">
              <a
                className="icon-round-message"
                href="/users"
                onClick={this.openModal}
              >
                <i className="fa fa-comment-o" />
              </a>
            </span>
            <span className="like">
              <a
                className="icon-round-like like-link faa-parent animated-hover"
                href=''
                onClick={ this.sendHeart }
              >
                { this.renderHeartIcon() }
              </a>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Card);
