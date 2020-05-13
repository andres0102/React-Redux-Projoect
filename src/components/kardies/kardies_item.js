import React from 'react';
import { renderImage } from '../../helpers/render_image';
import { Link } from "react-router-dom";

export default function KardiesItem(props) {
  return(
    <li className={ props.timelineInverted } >
      <div className="timeline-badge danger">
        <i className="fa fa-heart" />
      </div>
      <div className="timeline-panel bg-white">
        <div className="timeline-heading">
          <Link to={`users/${props.user.username}`} >
            <img
              className="d-inline-block mr-2 pic-round-xs"
              alt='Profile'
              src={ renderImage(props.user.profile_picture_thumb) }
            />
          </Link>
          <h4 className="d-inline-block timeline-title"> Νέα Καρδιά </h4>
          <p>
            <small className="text-muted">
              <i className="fas fa-clock" />
              { props.user.like_date } πριν
            </small>
          </p>
        </div>
        <div className="timeline-body">
          <p>
            Ο χρήστης <strong>{ props.user.username }</strong> σας έστειλε καρδιά!
          </p>
        </div>
      </div>
    </li>
  );
}
