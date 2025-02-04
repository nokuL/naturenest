import React from "react";

import './UsersList.css'
import UserItem from "./UserItem";
import Card from "./UIElements/Card";

const UsersList = props =>{
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    if(props.items.length === 0){
        return (<div className=".centre">
            <Card>
            <h2>No users found</h2>
            </Card>
            

        </div>);
    }
    return (
        <ul>
        {props.items.map(user => (
            <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image= {user.image}
            placesCount = {user.places}
            />

        ))}
        </ul>
       
    )
};

export default UsersList;