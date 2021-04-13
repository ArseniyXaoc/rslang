import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import userInfoStyles from "./UserInfoStyles";

import userLogo from "../../../../assets/icons/user_default_logo.svg";

function UserInfo({ user }) {
  const { userInfo } = userInfoStyles();

  return (
    <div className={userInfo}>
      <Link component={RouterLink} to="/profile">{user.name}</Link>
      <img src={userLogo} alt="" />
    </div>
  );
}

export default UserInfo;
