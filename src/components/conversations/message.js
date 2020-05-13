import React from 'react';
import { renderImage } from '../../helpers/render_image';
import { Link } from "react-router-dom";

const renderMessage = (message, currentUser) => {
  if(message.sender.username === currentUser.username) {
    return (
      <div className="ml-3 message-blue">
        {message.body}
      </div>
    )
  } else {
    return (
      <div className="ml-3 message-white">
        {message.body}
      </div>
    )
  }
}

const Message = (props) => {
  const message = props.message;
  const currentUser = props.currentUser;

  return (
    <li className="message-bubble">
      <div className="row">
        <div className="col-1">
          <Link to={`/users/${message.sender.username}`}>
            <img
              src={renderImage(message.sender.profile_picture_thumb)}
              alt='profile'
              className="pic-round-xs"
            />
          </Link>
        </div>
        <div className="col-11">
          { renderMessage(message, currentUser) }
          <div className="ml-3 time">
            <small> {message.created_at} </small>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Message;
