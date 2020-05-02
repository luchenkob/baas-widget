import React from "react";

import "./Icon.scss";

const Icon = ({ variant, className }) => {

  const renderIcon = () => {
    switch (variant) {
      case "times":
        return (<svg className={`app-icon ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19.4,16l11-11c0.3-0.3,0.3-0.8,0-1l-2.4-2.4c-0.3-0.3-0.8-0.3-1,0l-11,11L5,1.6c-0.3-0.3-0.8-0.3-1,0L1.6,3.9c-0.3,0.3-0.3,0.8,0,1l11,11l-11,11c-0.3,0.3-0.3,0.8,0,1l2.4,2.4c0.3,0.3,0.8,0.3,1,0l11-11l11,11c0.3,0.3,0.8,0.3,1,0l2.4-2.4c0.3-0.3,0.3-0.8,0-1L19.4,16z" /></svg>);
      case "loader":
        return (<svg className="circular" viewBox="25 25 50 50"><circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10" /></svg>)
      case "done":
        return (<svg className={`app-icon ${className}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35.2px" height="26.8px" viewBox="0 0 35.2 26.8"><path d="M11.2,21.2l-8.3-8.3L0,15.7l11.2,11.2l24-24L32.3,0L11.2,21.2z"/></svg>)
    }
  }

  return (
    renderIcon()
  );
}

export default Icon;