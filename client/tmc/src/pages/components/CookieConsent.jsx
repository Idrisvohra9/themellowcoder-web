import React, {useRef} from "react";
import { setCookie } from "../../tools/cookies";

export default function CookieConsent() {
  const toast = useRef();
  function cookieAccepted(){
    toast.current.className = toast.current.className.replace(" show", "");
    setCookie("cookie-consent","true");
  }
  function cookieDeclined(){
    toast.current.className = toast.current.className.replace(" show","");
    setCookie("cookie-consent","false");
  }
  return (
    <div
      className="toast align-items-center bg-primary border-0 fade show cookie-consent"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref={toast}
    >
      <div className="d-flex">
        <div className="toast-body w-75 d-flex justify-content-between">
          <div style={{fontSize:"40px", marginRight: "4px"}}>🍪</div>
          This website uses cookies or similar technologies, to enhance your
          browsing experience and provide personalized recommendations. By
          continuing to use our website, you agree to our{" "}
          <a style={{ color: "#115cfa" }} href="/privacy-policy">
            Privacy Policy
          </a>
        </div>
        <div className="d-flex justify-content-between w-25 mt-2 mb-2 me-2">
          <button className="btn btn-success" onClick={()=> cookieAccepted()}>Accept ✅</button>
          <button className="btn btn-danger" onClick={()=> cookieDeclined()}>Decline ❌</button>
        </div>
      </div>
    </div>
  );
}
