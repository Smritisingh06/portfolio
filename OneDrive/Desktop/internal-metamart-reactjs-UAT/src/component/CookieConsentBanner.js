import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      buttonClasses="btn btn-primary"
      containerClasses="alert alert-warning col-lg-12"
      contentClasses="text-capitalize"
      cookieName="Nexarise_NFT"
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
