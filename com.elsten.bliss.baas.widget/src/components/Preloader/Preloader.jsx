import React from "react";

import "./Preloader.scss";

const Preloader = ({isProcessing, processingMessage}) => {

  return (
    <div className={`preloader ${isProcessing ? 'active' : ''}`}><span>{processingMessage}</span></div>
  );
}

export default Preloader;