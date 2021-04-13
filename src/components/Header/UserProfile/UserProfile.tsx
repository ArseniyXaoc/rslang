import React, { useState } from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo/UserInfo";
import SignInButton from "../../Authorization/SignInButton/SignInButton";
import { RootState } from "../../../redux/reducer";

function UserProfile({ user }) {
  return (
    <div>
      {user.name
        ? <UserInfo user={user}/>
        : <SignInButton/>
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
