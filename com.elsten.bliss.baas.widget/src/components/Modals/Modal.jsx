import React from "react";
import ReactDOM from "react-dom";
import Icon from "../Icon";
import { _p } from "../../defines/config";

import "./Modals.scss";

const Modal = ({ show, onClose, children, title, className, container }) => {

  return ReactDOM.createPortal(<div className={`${_p}cmodal ${className ? className : ""} ${show ? `${_p}active` : ""}`}>
    <div className={`${_p}cmodal-overlay`} onClick={() => onClose()}></div>
    <div className={`${_p}cmodal-content`}>
      <div className={`${_p}cmodal-close`} onClick={() => onClose()}><Icon variant="times" /></div>
      <div className={`${_p}cmodal-content-title`}>{title && <h4>{title}</h4>}</div>
      <div className={`${_p}cmodal-content-inner`}>{children}</div>
    </div>
  </div>, container)
}

export default Modal;
