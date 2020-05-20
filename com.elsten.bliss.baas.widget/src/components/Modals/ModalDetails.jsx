import React, { useContext } from "react";
import { Context } from "../../context/context";
import { useTranslation } from "react-i18next";
import { _p } from "../../defines/config";

import "./Modals.scss";

const ModalDetails = ({ show, track, onClose }) => {

  const { t } = useTranslation();
  const { config, container } = useContext(Context);

  const filter = (key, content) => {
    switch (key) {
      case "picture":
      case "comment":
      case "artist":
      case "disk":
        break;
      case "track":
        let result = "";

        content.no ? content.of ? result = `${content.no}/${content.of}` : result = content.no : null;

        return result && <div key={`${key}`} className={`${_p}track-detail`}>
          <div><strong>{t(key)}</strong></div>
          <div>
            <p>{result}</p>
          </div>
        </div>
      default:

        return JSON.stringify(content).length > 2 &&
          <div key={`${key}`} className={`${_p}track-detail`}>
            <div><strong>{t(key)}</strong></div>
            <div>
              {
                typeof content == "string" || typeof content == "number" || typeof content == "boolean" ?
                  typeof content == "boolean" ? <p>{content ? t("yes") : t("no")}</p> : <p>{content}</p>
                  : typeof content == "object"
                    ? Object.keys(content).map((item, i) => (<p key={`it-${i}`}>{content[item]}</p>))
                    : null
              }
            </div>
          </div>;
    }
  }

  const renderDetails = () => {
    return <div className={`${_p}track-details`}>
      <div className={`${_p}track-detail`}><div><h4 className={`${_p}text-primary ${_p}mb-0`}>{t("Common")}</h4></div></div>
      <div className={`${_p}track-detail`}><div><strong>{t("File name")}</strong></div><div><p>{track.file}</p></div></div>
      {track.common ? Object.keys(track.common).map((key) => (
        filter(key, track.common[key])
      )) : null}
      <div className={`${_p}track-detail`}><div><h4 className={`${_p}text-primary ${_p}mb-0`}>{t("Format")}</h4></div></div>
      {track.format ? Object.keys(track.format).map((key) => (
        filter(key, track.format[key])
      )) : null}
    </div>
  }

  return (
    renderDetails()
  );
}

export default ModalDetails;
