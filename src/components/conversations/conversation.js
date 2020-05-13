import React, { Component, Fragment } from 'react';
import { renderImage } from '../../helpers/render_image';

export default class Conversation extends Component {
  handleGetConversationClick = () => {
    const conversation = this.props.conversation;

    if (typeof this.props.handleGetConversationClick === 'function') {
      this.props.handleGetConversationClick(conversation.id);
    }
  }

  handleDeleteClick = () => {
    const conversation = this.props.conversation;

    if (typeof this.props.handleDeleteConversationClick === 'function') {
      this.props.handleDeleteConversationClick(conversation.id);
    }
  }

  render() {
    const conversation = this.props.conversation;
    const participants = conversation.participants;

    return(
      <Fragment>
        { participants &&
          <li className='conversations'>
            <div className="d-flex my-2">
              <div className="d-inline-block align-self-center m-1">
                <div
                  className="pic-round-xs pointer-mouse"
                  style={{ backgroundImage: `url(${renderImage(participants.profile_picture_thumb)})` }}
                  onClick={this.handleGetConversationClick}
                  />
              </div>
              <div className="d-inline-block align-self-center m-1">
                <a className="get-convo align-self-center d-inline-block">
                  <strong>{participants.username}</strong>
                </a>
                <p className="small">
                  {
                    !conversation.is_read &&
                    <span className="badge badge-pill badge-light">Νέο μήνυμα</span>
                  }
                </p>
              </div>
              <div className="d-inline-block align-self-center m-1 ml-auto">
                <button
                  onClick={this.handleDeleteClick}
                  className="delete-convo btn btn-outline-light red-text"
                  >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
          </li>
        }
      </Fragment>
    );
  }
}
