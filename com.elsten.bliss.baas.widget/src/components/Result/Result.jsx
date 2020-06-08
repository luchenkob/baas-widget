import React, { useContext, useState } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../utils";
import converter from 'number-to-words';
import Icon from "../Icon";
import ModalDetails from "../Modals/ModalDetails";
import { filterIt } from "../../utils";
import { _p } from "../../defines/config";
import Modal from "../Modals/Modal";

import "./Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className={`${_p}artist-name`}>{props.name}</div>
  );
}

const Result = ({ activeAlbum, ...props }) => {

  const { files, origFiles, errors } = props;
  const { dispatch, config } = useContext(Context);
  const { t } = useTranslation();
  const [details, setDetails] = useState({ isActive: false, track: {} });
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isErrorsModal, setIsErrorsModal] = useState(false);

  const getUniqueArtists = (traks) => {
    let temp = [];
    if (traks) {
      return traks.map((track, i) => {
        if (temp.indexOf(track.artist) === -1) {
          temp.push(track.artist);
          return <Artist key={`artist-${i}`} name={track.artist} />;
        }
      });
    }
  }

  const handleAlbumClick = (i) => {
    dispatch({ type: "SET_ACTIVE_ALBUM", data: { activeAlbum: i } })
  }

  const onShowDetails = (track) => {
    const file = filterIt(origFiles, track.file, "file")[0];
    setDetails({ isActive: true, track: file });
  }

  const getDiscCount = (files) => {
    let c = 1;

    files.forEach((file)=>{
      file.disk.no > c ? c = file.disk.no : null;
    });

    return c;
  }

  const renderList = () => {

    let active = activeAlbum;
    let res = [];

    if (!isEmpty(files)) {

      active ? active == activeAlbum : active = Object.keys(files)[0];

      if (files[active] && files[active][0].disk.no) {

        for (let i = 1; i < getDiscCount(files[active])+1; i++) {
          res.push(
            <div key={`d-${i}`}>
              <h4 className={`${i > 1 ? `${_p}mt-2` : ""}`}>{`${t("Disk")} ${i}`}</h4>
              <div className={`${_p}result-album-inner`}>
                <div className={`${_p}result-tittle`}>
                  <div>{t('№')}</div>
                  <div>{t('Name')}</div>
                  <div></div>
                </div>
                {files[active] && files[active].map((track, z) => (
                  track.disk.no == i &&
                  <div className={`${_p}result-track`} key={`t-${z}`}>
                    <div>{`${track.no ? track.no : "-"}`}</div>
                    <div>{`${track.title ? track.title : "-"}`}</div>
                    <div><div onClick={() => onShowDetails(track)}><Icon className={`${_p}icon-primary`} variant="info" /></div></div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        return res;

      } else {
        if (files[active]) {
          return (
            <div className={`${_p}result-album-inner`}>
              <div className={`${_p}result-tittle`}>
                <div>{t('№')}</div>
                <div>{t('Name')}</div>
                <div></div>
              </div>
              {files[active] && files[active].map((track, i) => (
                <div className={`${_p}result-track`} key={`t-${i}`}>
                  <div>{`${track.no ? track.no : "-"}`}</div>
                  <div>{`${track.title ? track.title : "-"}`}</div>
                  <div><div onClick={() => onShowDetails(track)}><Icon className={`${_p}icon-primary`} variant="info" /></div></div>
                </div>
              ))}
            </div>
          )
        }
      }
    }
  }

  const renderAlbums = () => {

    if (files) {
      return Object.keys(files).map((file, i) => (
        <div className={`${_p}result-album ${activeAlbum ? file == activeAlbum ? `${_p}active` : '' : i == 0 ? `${_p}active` : ''}`} key={`a-${i}`} onClick={() => { handleAlbumClick(file) }}>
          <div className={`${_p}w-100`}>
            <h5 className={`${_p}mb-2`}>{file}</h5>
            <div className={`${_p}result-artist`}>{getUniqueArtists(files[file])}</div>
          </div>
        </div>
      ));
    }
  }

  return (
    <div className={`${_p}result`}>
      {errors.length > 0 && (
        <div className={`${_p}result-errors ${_p}cursor-pointer`} onClick={() => setIsErrorsModal(true)}><span className={`${_p}d-none ${_p}d-md-block`}>{t('Errors (wrong files)')}:</span><div className={`${_p}result-errors-count`}>{errors.length}</div></div>
      )}
      <div className={`${_p}result-title`}>
        <div className={`${_p}d-flex ${_p}align-items-center`}>
          <h4 className={`${_p}mb-0`}>{t('Found')} {converter.toWords(Object.keys(files).length)} {Object.keys(files).length > 1 ? t('albums') : t('album')}</h4>
          <div className={`${_p}result-title-icon ${_p}ml-2`} onClick={() => setIsHelpModal(true)}><Icon variant="help" /></div>
        </div>
      </div>
      <div className={`${_p}result-content`}>
        <Container fluid className={`${_p}h-100 ${_p}p-0`} fluid>
          <Row className={`${_p}h-100`}>
            <Col md={6} className={`${_p}h-100 ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderAlbums()}
            </Col>
            <Col md={6} className={`${_p}h-100 ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderList()}
            </Col>
          </Row>
        </Container>
      </div>
      <Modal title={t('Track details')} show={details.isActive} onClose={() => setDetails(previuos => ({ ...previuos, isActive: false }))}>
        <ModalDetails track={details.track} />
      </Modal>

      <Modal title={t(config.previewStepHelpTitleHtml)} className={`${_p}small`} show={isHelpModal} onClose={() => setIsHelpModal(false)}>
        <p className={`${_p}mb-0 ${_p}text-regular`} dangerouslySetInnerHTML={{ __html: t(config.previewStepHelpContentHtml) }}></p>
      </Modal>

      <Modal title={t("The following files will be ignored when assessing your music")} className={`${_p}small`} show={isErrorsModal} onClose={() => setIsErrorsModal(false)}>
        {errors.length > 0 && errors.map((error, i) => (
          <div key={`e-${i}`} className={`${_p}border-bottom ${_p}text-danger ${_p}p-2`}>{error}</div>
        ))}
      </Modal>
    </div>
  );
}

export default Result;
