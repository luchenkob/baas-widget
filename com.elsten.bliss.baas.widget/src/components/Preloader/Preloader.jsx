import React from "react";
import Icon from "../Icon";
import "./Preloader.scss";
import { _p } from "../../defines/config";

const Preloader = ({isProcessing, processingMessage}) => {

  return (
    <div className={`${_p }preloader ${isProcessing ? `${_p }active` : ''}`}><span><Icon variant="loader"/>{processingMessage}</span></div>
  );
}

export default Preloader;