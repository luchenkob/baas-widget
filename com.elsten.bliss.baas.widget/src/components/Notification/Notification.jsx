import React from "react";

import "./Notification.scss";

const Notification = ({ isNotification, notificationMessage, notificationType }) => {

  return (
    <div className={`notification ${isNotification ? "active" : ""}`}>
      <div className={`alert alert-${notificationType}`} role="alert">
        {notificationMessage}
      </div>
    </div>
  );
}

export default Notification;