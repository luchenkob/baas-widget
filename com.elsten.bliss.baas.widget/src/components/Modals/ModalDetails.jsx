import React, { useContext } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";

import "./Modals.scss";

const ModalDetails = ({ show, track, onClose }) => {

  const { t } = useTranslation();
  const { config, container } = useContext(Context);

  const filter = (key, content) => {
    switch (key) {
      case "picture":
      case "comment":
        break;
      default:
        return <div key={`${key}`} className="track-detail"><div><strong>{t(key)}</strong></div><div><p>{content}</p></div></div>;
    }
  }

  const renderDetails = () => {
    return <div className="track-details">
      <div className="track-detail"><div><h4 className="text-primary mb-0">{t("Common")}</h4></div></div>
      <div className="track-detail"><div><strong>{t("File name")}</strong></div><div><p>{track.file}</p></div></div>
      {track.common ? Object.keys(track.common).map((key) => (
        filter(key, JSON.stringify(track.common[key]))
      )) : null}
      <div className="track-detail"><div><h4 className="text-primary mb-0">{t("Format")}</h4></div></div>
      {track.format ? Object.keys(track.format).map((key) => (
        filter(key, JSON.stringify(track.format[key]))
      )) : null}
    </div>
  }

  return (
    <Modal className="modal-details" show={show} container={container} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">{t("Track details")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderDetails()}</Modal.Body>
    </Modal>
  );
}

export default ModalDetails;
