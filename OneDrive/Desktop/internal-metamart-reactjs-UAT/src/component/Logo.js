import React from "react";

const Logo = (props) => {
  return (
    <img
      className="logoimageBox"
      src="/images/Mobiloitte_blue_logo.png" //logo.png
      alt="Logo"
      {...props}
      style={{ width: "auto", maxWidth: "190px" }}
    />
  );
};

export default Logo;
