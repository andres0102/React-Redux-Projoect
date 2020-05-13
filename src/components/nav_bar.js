import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import { logout } from '../redux/actions/auth';
import { renderImage } from '../helpers/render_image';
import logo from '../images/kardies-logo-small.png';

class NavBar extends Component {
  handleSignOut = () => {
    this.props.logout();
  }

  render() {
    return(
      <nav className="navbar navbar-expand-md navbar-dark bg-orange">
        <div className="container">
          <button
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler navbar-toggler-right"
            data-target="#navbarNav"
            data-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-brand">
            <Link className="nav-link" to="/users">
              <img className="logo-small shake-bottom" src={logo} alt="Kardies logo small" />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link underline" to="/users" id="users">
                  <i className="fa fa-users mr-1" />
                  Μέλη
                </Link>
              </li>
              <li className="nav-item" id="likes">
                <Link className="nav-link underline" to="/likes">
                  <i className="fa fa-heart mr-1" />
                  Καρδιές
                </Link>
              </li>
              <li className="nav-item" id="conversations">
                <Link className="nav-link underline" to="/conversations">
                  <i className="fa fa-envelope mr-1" />
                  Μηνύματα
                </Link>
              </li>
              <li className="nav-item" id="personalities">
                <Link className="nav-link underline" to="/personality">
                  <i className="fa fa-flask mr-1" />
                  Προσωπικότητα
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  aria-expanded="false"
                  aria-haspopup="true"
                  className="profile-pic-round-xs btn btn-secondary nav-item"
                  data-toggle="dropdown"
                  id="navbarDropdownMenu"
                  alt='Profile Picture'
                  style={{ backgroundImage: `url(${renderImage(this.props.currentUser.profile_picture_thumb)})` }}
                />
                <div aria-labelledby="navbarDropdownMenu" className="dropdown-menu">
                  <Link className="dropdown-item" to="/settings">
                    <i className="fa fa-cogs mr-1" />
                    Ρυθμίσεις
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item red-text"
                    rel="nofollow"
                    data-method="delete"
                    onClick={this.handleSignOut}
                  >
                    <i className="fa fa-power-off mr-1" />
                    Αποσύνδεση
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.result
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
