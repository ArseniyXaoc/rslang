import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import SignInButtonStyle from "./SignInButtonStyles";

function SignInButton() {
  const { white } = SignInButtonStyle();
  return <Link className={white} component={RouterLink} to="/signin">{"Sign In"}</Link>;
}

export default SignInButton;
