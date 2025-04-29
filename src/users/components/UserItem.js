import React from "react";

import './UserItem.css'
import'./UIElements/Avatar.js'
import Avatar from "./UIElements/Avatar.js";
import { Link } from "react-router-dom";
import Card from "./UIElements/Card.js";
const UserItem = props => {
    return (
      <li className="user-item">
          <Card className="user-item__content">
            <Link to= {`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={`http:localhost:5000/${props.image}`} alt={props.name}></Avatar>
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.placesCount} {props.placesCount === 1 ? 'place' : 'places'}</h3>
          </div>
          </Link>
          </Card>
      </li>
    );
  };
export default UserItem;