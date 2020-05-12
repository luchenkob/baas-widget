import React, { useContext, useState } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../utils";
import converter from 'number-to-words';
import Icon from "../Icon";
import ModalDetails from "../Modals/ModalDetails";
import { filterIt } from "../../utils";

import "./Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className="artist-name">{props.name}</div>
  );
}

const Result = ({ activeAlbum, ...props }) => {

  const { files, origFiles, errors } = props;
  const { dispatch } = useContext(Context);
  const { t } = useTranslation();
  const [ details, setDetails] = useState({isActive: false, track: {}});

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
    setDetails({isActive: true, track: file});
  }

  const renderList = () => {

    let active = activeAlbum;

    if (!isEmpty(files)) {

      active ? active == activeAlbum : active = Object.keys(files)[0];

      return (
        <div className="result-album-inner">
          <div className="result-tittle">
            <div>{t('№')}</div>
            <div>{t('Name')}</div>
            <div></div>
          </div>
          {files[active].map((track, i) => (
            <div className="result-track" key={`t-${i}`}>
              <div>{`${track.no ? track.no : "-"}`}</div>
              <div>{`${track.title ? track.title : "-"}`}</div>
              <div><div onClick={()=>onShowDetails(track)}><Icon className="icon-primary" variant="info"/></div></div>
            </div>
          ))}
        </div>
      )
    }
  }

  const renderAlbums = () => {

    if (files) {
      return Object.keys(files).map((file, i) => (
        <div className={`result-album ${activeAlbum ? file == activeAlbum ? "active" : '' : i == 0 ? "active" : ''}`} key={`a-${i}`} onClick={() => { handleAlbumClick(file) }}>
          <h5 className="mb-2">{file}</h5>
          <div className="result-artist">{getUniqueArtists(files[file])}</div>
        </div>
      ));
    }
  }

  return (
    <div className={`result`}>
      {errors.length > 0 && (
        <div className="result-errors"><span>{t('Errors (wrong files)')}:</span><div className="result-errors-count">{errors.length}</div></div>
      )}
      <div className="result-title">
      <h4>{t('Found')} {converter.toWords(Object.keys(files).length)} {Object.keys(files).length > 1 ? t('albums') : t('album')}</h4>
      </div>
      <div className="result-content">
        <Container fluid className="h-100 p-0" fluid>
          <Row className="h-100">
            <Col md={6} className="h-100 h-md-auto overflow-y-auto">
              {renderAlbums()}
            </Col>
            <Col md={6} className="h-100 h-md-auto overflow-y-auto">
              {renderList()}
            </Col>
          </Row>
        </Container>
      </div>
      <ModalDetails show={details.isActive} track={details.track} onClose={()=>setDetails(previuos => ({...previuos, isActive: false}))} />
    </div>
  );
}

export default Result;
