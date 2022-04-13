import React from "react";
import { app } from "../helper/connection";
import * as Realm from 'realm-web';
function UserDisplay({ user }){
  return (
    <div>
      <h2>Logged in with anonymous id: {user.id}</h2>
    </div>
  );
}

function Login({setUser}){
  const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    console.log(user);
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
}

export {UserDisplay,Login};