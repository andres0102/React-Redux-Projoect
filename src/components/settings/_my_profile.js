import React from 'react';
import { renderImage } from '../../helpers/render_image';
import { Link } from "react-router-dom";

export default function MyProfile(props){
  const currentUser = props.currentUser;

  return(
    <div className="mb-4 my-profile text-center">
      <Link to={`users/${currentUser.username}`}>
        <div
          className="profile-pic-round-lg mb-2"
          style={{ backgroundImage: `url(${renderImage(currentUser.profile_picture_medium)})` }}
        />
      </Link>
      <strong className='white-text-bs'>
        {currentUser.username} / {currentUser.user_detail ? currentUser.user_detail.age : null}
      </strong>
    </div>
  );
}
