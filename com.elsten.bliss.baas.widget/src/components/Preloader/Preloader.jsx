import React from "react";
import Icon from "../Icon";
import "./Preloader.scss";

const Preloader = ({isProcessing, processingMessage}) => {

  return (
    <div className={`preloader ${isProcessing ? 'active' : ''}`}><span><Icon variant="loader"/>{processingMessage}</span></div>
  );
}

export default Preloader;