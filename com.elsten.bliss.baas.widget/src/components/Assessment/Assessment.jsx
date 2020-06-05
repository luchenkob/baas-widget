import React, { useContext, useState } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { capitalize } from "../../utils";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import { filterIt, ToBase64 } from "../../utils";
import { _p } from "../../defines/config";
import Modal from "../Modals/Modal";
import Collapsible from 'react-collapsible';
import sizeOf from "image-size";
import "../Result/Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className={`${_p}artist-name`}>{props.name}</div>
  );
}

const Assessment = ({ activeAssessment, ...props }) => {

  const { isProcessing, assessments, errors, origFiles } = props;
  const { dispatch, config } = useContext(Context);
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [complianceDetail, setComplianceDetail] = useState("");
  const [isComplDetail, setIsComplDetail] = useState(false);


  const getArtists = (artists) => {
    return artists.map(((artist, i) => (
      <Artist key={`artist-${i}`} name={artist} />
    )));
  }

  const handleAlbumClick = (i) => {
    dispatch({ type: "SET_ACTIVE_ASSESSMENT", data: { activeAssessment: i } })
  }

  const complianceNotification = (compliance) => {
    let badges = [];

    if (compliance) {
      if (compliance.parts) {
        for (const [i, part] of Object.entries(compliance.parts)) {
          if (part.state == "NONCOMPLIANT") {
            badges.push(<span key={`b-${i}`} className={`${_p}badge ${_p}badge-danger`}><Icon variant="times" className={`${_p}mr-1`} />{t(capitalize(part.summary))}</span>);
          }
        }
        if (badges.length > 0) {
          return badges;
        }
      }
    }
  }

  const getArt = (response) => {
    const type = response.split("/")[0];
    let file = 0;
    let image = null;

    switch (type) {
      case "http:":
      case "https:":
        image = response;
        break;
      case "baas:":
        const fileName = response.split("#")[0].split("/")[1];

        if (fileName) {
          const ext = fileName.split(".")[1];
          file = filterIt(origFiles, fileName, "file")[0];

          switch (ext) {
            case "jpg":
            case "png":
            case "bmp":
              image = file ? file.data : null;
              break;
            default:
              image = file ? ToBase64(file.common.picture[0].data) : null;
              break;
          }
        }
        break;
    }

    return image;

  }

  const renderArt = (response) => {

    const type = response.url.split("/")[0];
    let image = null;
    let title = "";
    let file = 0;
    let width = 0;
    let height = 0;

    switch (type) {
      case "http:":
      case "https:":
        image = response.url;
        width = response.width;
        height = response.height;
        break;
      case "baas:":
        const fileName = response.url.split("#")[0].split("/")[1];
        if (fileName) {
          const ext = fileName.split(".")[1];
          file = filterIt(origFiles, fileName, "file")[0];

          switch (ext) {
            case "jpg":
            case "png":
            case "bmp":
              image = file ? file.data : null;
              width = file ? file.width : 0;
              height = file ? file.height : 0;
              break;
            default:
              image = file ? ToBase64(file.common.picture[0].data) : null;
              width = file ? sizeOf(file.common.picture[0].data).width : 0;
              height = file ? sizeOf(file.common.picture[0].data).height : 0;
              break;
          }


        }

        title = fileName;
        break;

    }

    return <>{title && <p className={`${_p}text-center ${_p}mt-3 ${_p}pl-2 ${_p}pr-2`}><strong>{title}</strong></p>}
      <div className={`${_p}result-compliance-alternative-art`} style={{ background: `url(${image})` }}></div>
      <p className={`${_p}text-center ${_p}mt-3 ${_p}pl-2 ${_p}pr-2`}><strong>{width} x {height}</strong></p>
    </>
  }

  const checkCompliance = (part, isTitle) => {

    const alt = [];

    if (part.responses) {

      for (let response of part.responses) {
        if (response.objectType == "InstallImageFromUrlResponse") {
          alt.push(response);
        }
      }
    }

    return alt.length > 0 ?
      <div className={`${_p}caccordion-item`}>
        <div className={`${_p}result-compliance`}>
          <div className={`${_p}result-compliance-inner`}>
            <Container fluid className={`${_p}p-0`}>
              {isTitle && <Row><Col><h5 className={`${_p}mb-4 ${_p}pb-2 ${_p}border-bottom`}>{t('Alternative art')}</h5></Col></Row>}
              <Row>
                {alt.map((response, i) => (
                  <Col lg={4} key={`alt-${i}`}>
                    <div className={`${_p}result-compliance-alternative`}>
                      {renderArt(response)}
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div> : <></>
  }

  const isHasAlternativeArt = (part) => {

    if (part.responses) {

      for (let response of part.responses) {
        if (response.objectType == "InstallImageFromUrlResponse") {
          return true;
        }
      }
    }
  }

  const checkComplianceOther = (part, isTitle) => {

    const other = [];

    if (part.responses) {

      for (let response of part.responses) {
        if (response.objectType != "InstallImageFromUrlResponse") {
          other.push(response);
        }
      }
    }

    return other.length > 0 ?
      <div className={`${_p}caccordion-item ${_p}pl-0 ${_p}pr-0`}>
        <div className={`${_p}result-compliance`}>
          <div className={`${_p}result-compliance-inner`}>
            <Container fluid className={`${_p}p-0`}>
              {isTitle && <Row><Col><h5 className={`${_p}mb-4 ${_p}pb-2 ${_p}border-bottom`}>{t('Other fixes')}</h5></Col></Row>}
              {other.map((response, i) => (
                <Row className={`${_p}mb-2`} key={`resp-${i}`}>
                  <Col>
                    <Container fluid>
                      <Row className={`${_p}border`}>
                        <Col lg={8} className={`${_p}d-flex ${_p}align-items-center ${_p}pt-2 ${_p}pb-2 ${_p}justify-content-lg-start ${_p}justify-content-center`}>
                          <span>{t(response.description)}</span>
                        </Col>
                        <Col lg={4} className={`${_p}d-flex ${_p}align-items-center ${_p}pt-2 ${_p}pb-2 ${_p}justify-content-lg-end ${_p}justify-content-center`}>
                          <Button variant="primary" className={`${_p}m-2`}>{t('Fix')}</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              ))}
            </Container>
          </div>
        </div>
      </div>
      : <></>

  }

  const renderAssessment = () => {

    let active = activeAssessment;

    if (assessments.length > 0) {
      active ? active == activeAssessment : active = 0;
      return (
        <div className={`${_p}result-assessment`}>
          <div className={`${_p}result-compliances`}>
            {assessments[active].assessment.compliance.parts.map((part, i) => (
              <Collapsible
                className={`${_p}collapsible`}
                openedClassName={`${_p}collapsible`}
                triggerClassName={`${_p}collapsible__trigger`}
                triggerOpenedClassName={`${_p}collapsible__trigger`}
                contentOuterClassName={`${_p}collapsible__contentOuter`}
                contentInnerClassName={`${_p}collapsible__contentInner`}
                triggerDisabled={true}
                key={`ac-${i}`} open={selectedIndex == i}
                onTriggerClosing={(e) => setSelectedIndex(-1)}
                onTriggerOpening={(e) => setSelectedIndex(i)}
                easing="ease" trigger={
                  <>
                    <div className={`${_p}collapsible-trigger-bg`} onClick={() => setSelectedIndex(selectedIndex == i ? -1 : i)}></div>
                    <span className={`${_p}badge ${part.state == "NONCOMPLIANT" ? `${_p}badge-danger` : `${_p}badge-success`}`}>
                      {part.state == "NONCOMPLIANT" ?
                        <><Icon variant="times" className={`${_p}mr-1`} />{t(capitalize(part.summary))}</>
                        :
                        <><Icon variant="done" className={`${_p}mr-1`} />{t(capitalize(part.summary))}</>
                      }
                    </span>
                    <Button variant="outline-primary" onClick={() => { setComplianceDetail(`<span class=${part.state == "NONCOMPLIANT" ? `${_p}text-danger` : `${_p}text-success`}>${part.detail}</span>`); setIsComplDetail(true) }}><Icon className={`${_p}mr-1`} variant="info" />{t("More")}</Button>
                  </>
                }>
                <div className={`${_p}result-compliance`}>
                  <div className={`${_p}result-compliance-inner`}>
                    {checkCompliance(part, true)}
                    {checkComplianceOther(part, isHasAlternativeArt(part))}
                  </div>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      )
    }
  }

  const renderCover = (assessment) => {
    let cover = null;

    assessment.assessment.compliance.parts.forEach((part) => {
      if (part.objectType == "ExtantArtCompliance") {
        cover = getArt(part.images[0].location);
      }
    })

    return cover ? <div style={{ background: `url(${cover})` }}></div> : <Icon variant="empty" />;
  }

  const renderAlbums = () => {

    return assessments.map((assessment, i) => (
      <div className={`${_p}result-album ${activeAssessment ? i == activeAssessment ? `${_p}active` : '' : i == 0 ? `${_p}active` : ''}`} key={`a-${i}`} onClick={() => { handleAlbumClick(i); setSelectedIndex(0) }}>
        <div className={`${_p}result-album-cover`}>
          {renderCover(assessment)}
        </div>
        <div className={`${_p}w-100`}>
          <div className={`${_p}result-inline-title`}>
            <h5 className={`${_p}mb-2`}>{assessment.album.title}</h5>
            <div className={`${_p}result-badges`}>
              {complianceNotification(assessment.assessment.compliance)}
            </div>
          </div>
          <div className={`${_p}result-artist`}>{getArtists(assessment.album.artists)}</div>
        </div>
      </div>
    ));
  }

  return (
    <div className={`${_p}result ${isProcessing ? `${_p}processing` : ''}`}>
      {errors.length > 0 && (
        <div className={`${_p}result-errors`}><span>{t('Errors (wrong files)')}:</span><div className={`${_p}result-errors-count`}>{errors.length}</div></div>
      )}
      <div className={`${_p}result-title`}>
        <h4>{t('Assessment')}</h4>
        <div className={`${_p}result-title-icon`} onClick={() => setIsHelpModal(true)}><Icon variant="help" /></div>
      </div>
      <div className={`${_p}result-content`}>
        <Container fluid className={`${_p}h-100 ${_p}p-0`} fluid>
          <Row className={`${_p}h-100`}>
            <Col md={6} className={`${_p}h-100 ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderAlbums()}
            </Col>
            <Col md={6} className={`${_p}h-100-m ${_p}assesment-column ${_p}bg-white ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderAssessment()}
            </Col>
          </Row>
        </Container>

        <Modal title={t(config.assessmentStepHelpTitleHtml)} className={`${_p}small`} show={isHelpModal} onClose={() => setIsHelpModal(false)}>
          <p className={`${_p}mb-0 ${_p}text-regular`} dangerouslySetInnerHTML={{ __html: t(config.assessmentStepHelpContentHtml) }}></p>
        </Modal>

        <Modal title={t("The compliance details")} className={`${_p}small`} show={isComplDetail} onClose={() => setIsComplDetail(false)}>
          <p className={`${_p}mb-0 ${_p}text-regular`} dangerouslySetInnerHTML={{ __html: complianceDetail }}></p>
        </Modal>
      </div>
    </div>
  );
}

export default Assessment;
