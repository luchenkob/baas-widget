import React from "react";
import Icon from "../Icon";
import { _p } from "../../defines/config";
import "../Result/Result.scss";

const Badge = ({ ...props }) => {

  const { variant, label, className } = props;

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <Icon variant="times" className={`${_p}mr-1`} />
      case "success":
        return <Icon variant="done" className={`${_p}mr-1`} />
    }
  }

  return (
    <span className={`${_p}badge ${_p}${className} ${_p}badge-${variant}`}>
      {getIcon()}{label}
    </span>
  );
}

export default Badge;
