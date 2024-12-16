import { UserContext } from "src/context/User";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function AuthGuard(props) {
  const { children } = props;
  const auth = useContext(UserContext);
  if (!auth.isLogin) {
    return <Redirect to='/' />;
  }

  return <>{children}</>;
}
