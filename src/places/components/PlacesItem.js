import React, { useState, useContext, createContext } from 'react';

import Card from "../../users/components/UIElements/Card";
import Button from "../../shared/component/FormElements/Button";
import Modal from "../../users/components/UIElements/Modal";
import './PlacesItem.css';
import { AuthContext } from '../../shared/context/authContext';

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHanlder = ()=> setShowConfirmModal(true);

  const cancelDeleteWarningHandler = ()=> setShowConfirmModal(false);

  const confirmDeleteHandler = ()=>{console.log(">>>>>> DELETING")};
  const auth = createContext(AuthContext);
  

  return (
    
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.title}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>
      <Modal show={showConfirmModal} onCancel={cancelDeleteWarningHandler} header="Are you sure?" footerClass="place-item__modal-actions" footer={
       <React.Fragment>
       <Button onClick={cancelDeleteWarningHandler} inverse>CANCEL </Button>
       <Button onClick={confirmDeleteHandler} danger>DELETE</Button>
     </React.Fragment>
      }>
        <p>Are you sure you want to proceed and delete ?</p>
        
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
             { auth.isLoggedIn && <Button  onClick={showDeleteWarningHanlder} danger>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;