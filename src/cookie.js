import React from 'react';
import CookieConsent from "react-cookie-consent";

export default function Cookie() {
  return(
    <CookieConsent
      location="bottom"
      buttonText="Συμφωνώ"
      style={{ background: 'rgba(52, 64, 81, 0.88)' }}
      cookieName="kardiesConsentCookie"
    >
      Τα cookies μας βοηθούν να προσφέρουμε τις υπηρεσίες μας.
      Με την χρησιμοποίηση των υπηρεσιών μας, συμφωνείτε στην χρήση των cookies.
      <a className="white-text" href='/terms#cookies'> Μάθετε περισσότερα </a>
    </CookieConsent>
  )
}
