import React from "react";
import { _p } from "../../defines/config";

import "./Icon.scss";

const Icon = ({ variant, className }) => {

  const renderIcon = () => {
    switch (variant) {
      case "times":
        return (<svg className={`${_p}app-icon ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19.4,16l11-11c0.3-0.3,0.3-0.8,0-1l-2.4-2.4c-0.3-0.3-0.8-0.3-1,0l-11,11L5,1.6c-0.3-0.3-0.8-0.3-1,0L1.6,3.9c-0.3,0.3-0.3,0.8,0,1l11,11l-11,11c-0.3,0.3-0.3,0.8,0,1l2.4,2.4c0.3,0.3,0.8,0.3,1,0l11-11l11,11c0.3,0.3,0.8,0.3,1,0l2.4-2.4c0.3-0.3,0.3-0.8,0-1L19.4,16z" /></svg>);
      case "loader":
        return (<svg className={`${_p}circular`} viewBox="25 25 50 50"><circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10" /></svg>)
      case "done":
        return (<svg className={`${_p}app-icon ${className}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35.2px" height="26.8px" viewBox="0 0 35.2 26.8"><path d="M11.2,21.2l-8.3-8.3L0,15.7l11.2,11.2l24-24L32.3,0L11.2,21.2z"/></svg>)
      case "info":
        return (<svg className={`${_p}app-icon ${className}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="417px" height="417px" viewBox="0 0 417 417"><g><path d="M356,61.2C274.6-20.3,142.6-20.4,61.2,61c-81.5,81.4-81.6,213.4-0.2,294.9c81.4,81.5,213.4,81.6,294.8,0.2C437.3,274.6,437.4,142.6,356,61.2z M237.6,340.8c0,3.2-2.6,5.8-5.8,5.8h-46.6c-3.2,0-5.8-2.6-5.8-5.8V167.9c0-3.2,2.6-5.8,5.8-5.8h46.6c3.2,0,5.8,2.6,5.8,5.8V340.8z M208.5,137.9c-18.6,0-33.8-15.1-33.8-33.8c0-18.6,15.1-33.8,33.8-33.8s33.8,15.1,33.8,33.8C242.3,122.8,227.1,137.9,208.5,137.9z"/></g></svg>)
      }
  }

  return (
    renderIcon()
  );
}

export default Icon;