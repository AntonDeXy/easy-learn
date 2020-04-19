// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, userAuth0 } = useAuth0();

  if (loading || !userAuth0) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={userAuth0.picture} alt="Profile" />
      <h2>{userAuth0.name}</h2>
      <p>{userAuth0.email}</p>
      <code>{JSON.stringify(userAuth0, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;