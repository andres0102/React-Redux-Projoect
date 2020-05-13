import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FbLoginButton extends Component {
  responseFacebook = response => {
    this.props.responseFacebook(response);
  }

  render() {
    return(
      <FacebookLogin
        appId={process.env.REACT_APP_FB_ID}
        autoLoad={false}
        fields="name,email,picture.type(large)"
        textButton="Σύνδεση με Facebook"
        callback={this.responseFacebook}
        cssClass="btn btn-primary btn-sm btn-block"
        icon="fa-facebook-official mr-1"
      />
    )
  }
}
