import React from "react";
import { _p } from "../../defines/config";

import "./Notification.scss";

const Notification = ({ isNotification, notificationMessage, notificationType }) => {

  return (
    <div className={`${_p}notification ${isNotification ? `${_p}active` : ""}`}>
      <div className={`${_p}alert ${_p}alert-${notificationType}`} role="alert">
        {notificationMessage}
      </div>
    </div>
  );
}

export default Notification;