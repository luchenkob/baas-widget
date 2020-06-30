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
import Badge from "../Badge/Badge";
import "../Result/Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className={`${_p}artist-name`}>{props.name}</div>
  );
}

const Assessment = ({ activeAssessment, ...props }) => {

  const { isProcessing, assessments, errors, origFiles } = props;
  const { dispatch, config, container } = useContext(Context);
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [complianceDetail, setComplianceDetail] = useState("");
  const [isComplDetail, setIsComplDetail] = useState(false);
  const [isArtDetail, setIsArtDetail] = useState(false);
  const [mPart, setmPart] = useState(null);
  const [artType, setArtType] = useState(null);
  const [isFixModal, setIsFixModal] = useState(null);

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
            badges.push(<Badge key={`b-${i}`} className="mr-2" variant={"danger"} label={t(`_comp_${part.source.category.toLowerCase()}_${part.source.policyDescriptor.toLowerCase()}_title`)} />);
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
      case "file:":
      case "baas:":
        const arrUrl = response.split("#")[0].split("/");
        const fileName = arrUrl[arrUrl.length - 1];

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
        const arrUrl = response.url.split("#")[0].split("/");
        const fileName = arrUrl[arrUrl.length - 1];
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

  const getBadge = (locationType, label) => {
    return <Badge className="mr-2" variant={locationType.state == "NONCOMPLIANT" ? "danger" : "success"} label={label} />
  }

  const getDetails = (locationType) => {
    if (locationType.missing.length > 0) {
      if (locationType.type == "embedded") return <span className={`${_p}text-monospace ${_p}text-code ${_p}cut-text`}>{locationType.missing[0].split(":/")[1].split("#coverart")[0]}</span>
      if (locationType.type == "image-file") return <span className={`${_p}text-monospace ${_p}text-code ${_p}cut-text`}>{locationType.missing[0].split(":/")[1]}</span>
    } else {
      if (locationType.type == "embedded") return <span className={`${_p}text-monospace ${_p}text-code ${_p}cut-text`}>{locationType.extant[0].location.split(":/")[1].split("#coverart")[0]}</span>
      if (locationType.type == "image-file") return <span className={`${_p}text-monospace ${_p}text-code ${_p}cut-text`}>{locationType.extant[0].location.split(":/")[1]}</span>
    }
  }

  const renderArtStorageCompliance = (part) => {

    if (part.locationTypes) {
      return part.locationTypes.map((locationType, i) => (
        <div className={`${_p}mb-3 ${_p}d-flex ${_p}justify-content-between ${_p}align-items-center`} key={`cmpl-${i}`}>
          <div className={`${_p}result-me`}>
            {getBadge(locationType, t(`_comp_${part.source.category.toLowerCase()}_${part.source.policyDescriptor.toLowerCase()}_${locationType.type.toLowerCase()}_title`))}
            <span className={`${_p}result-me-inner`}><span className={`${_p}mr-2`}>{t(`_comp_${part.source.category.toLowerCase()}_${part.source.policyDescriptor.toLowerCase()}_${locationType.type.toLowerCase()}_${locationType.state}_description`)}</span> {getDetails(locationType)}</span>
          </div>
          <div>
            <span className={`${_p}btn-dots`} onClick={() => showArtDetail(part, locationType)}>...</span>
          </div>
        </div>
      ))
    }
  }

  const showArtDetail = (part, locationType) => {
    setmPart(part);
    setArtType(locationType);
    setIsArtDetail(true);
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

    switch (part.objectType) {
      case "ArtStorageCompliance":
      case "Compliance":
        return <div className={`${_p}caccordion-item`}>
          <div className={`${_p}result-compliance`}>
            <div className={`${_p}result-compliance-inner`}>
              {part.objectType != "ArtStorageCompliance" &&
                <div>
                  <Badge
                    variant={part.state == "NONCOMPLIANT" ? "danger" : "success"}
                    label={t(`_comp_${part.state}`)}
                  />
                  <span className={`${_p}ml-1 ${_p}mr-1`}> - </span>
                  <span>{t(`_comp_${part.source.category.toLowerCase()}_${part.source.policyDescriptor.toLowerCase()}_${part.state}_description`)}</span>
                </div>

              }
              <Container fluid className={`${_p}p-0`}>
                {part.objectType == "ArtStorageCompliance" &&
                  <Row className={`${_p}mb-4`}>
                    <Col md={12}>
                      {renderArtStorageCompliance(part)}
                    </Col>
                  </Row>
                }
                {alt.length > 0 && <>
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
                </>
                }
              </Container>
            </div>
          </div>
        </div>
    }
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

  const openFixModal = (part) => {
    setmPart(part);
    setIsFixModal(true);
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
                          <Button variant="primary" className={`${_p}m-2`} onClick={() => openFixModal(part)}>{t('Fix')}</Button>
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
                    <div>
                      <Badge
                        variant={part.state == "NONCOMPLIANT" ? "danger" : "success"}
                        label={t(`_comp_${part.source.category.toLowerCase()}_${part.source.policyDescriptor.toLowerCase()}_title`)}
                      />
                    </div>
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

  const handleLinktoBliss = () => {
    setIsFixModal(false);
    window.location = config.completeLink;
  }

  return (
    <div className={`${_p}result ${isProcessing ? `${_p}processing` : ''}`}>
      <div className={`${_p}result-title`}>
        <div className={`${_p}d-flex ${_p}align-items-center`}>
          <h4 className={`${_p}mb-0`}>{t('Assessment')}</h4>
          <div className={`${_p}result-title-icon ${_p}ml-2`} onClick={() => setIsHelpModal(true)}><Icon variant="help" /></div>
        </div>
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

        <Modal container={container.current} title={t(config.assessmentStepHelpTitleHtml)} className={`${_p}small`} show={isHelpModal} onClose={() => setIsHelpModal(false)}>
          <p className={`${_p}mb-0 ${_p}text-regular`} dangerouslySetInnerHTML={{ __html: t(config.assessmentStepHelpContentHtml) }}></p>
        </Modal>

        <Modal container={container.current} title={t("The compliance details")} className={`${_p}small`} show={isComplDetail} onClose={() => setIsComplDetail(false)}>
          <p className={`${_p}mb-0 ${_p}text-regular`} dangerouslySetInnerHTML={{ __html: complianceDetail }}></p>
        </Modal>

        <Modal container={container.current} show={isFixModal} className={`${_p}small`} onClose={() => setIsFixModal(false)}>
          <h3 className={`${_p}text-center ${_p}w-100`}>{mPart && t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_title`)}</h3>
          <div className={`${_p}text-center ${_p}text-regular`}>{mPart && t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_fix_description`)},</div>
          <div className={`${_p}text-center ${_p}text-regular ${_p}mb-4`} dangerouslySetInnerHTML={{ __html: t(config.fixHtml) }}></div>
          <div className={`${_p}text-center`}><Button variant="primary" onClick={handleLinktoBliss} dangerouslySetInnerHTML={{ __html: t(config.completeLabel) }}></Button></div>
        </Modal>

        <Modal container={container.current} title={mPart && artType && t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_${artType.type.toLowerCase()}_title`)} className={`${_p}small`} show={isArtDetail} onClose={() => setIsArtDetail(false)}>
          {artType && artType.missing.length > 0 &&
            <div>
              <h6 className={`${_p}pt-2 ${_p}pb-1 ${_p}d-flex ${_p}align-items-center`}>
                <span className={`${_p}mr-2`}>
                  <Badge variant={"danger"} label={t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_detail_NONCOMPLIANT_title`)} />
                </span>
                {t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_${artType.type.toLowerCase()}_NONCOMPLIANT_detail_description`)}
              </h6>
              <ul>
                {artType.missing.map((item, i) => (
                  <li key={`ntf-${i}`} className={`${_p}p-1`}><span className={`${_p}text-monospace ${_p}lh-1-3 ${_p}text-code`}>{item.split(":/")[1].split("#coverart")[0]}</span></li>
                ))
                }
              </ul>
            </div>
          }
          {artType && artType.extant.length > 0 &&
            <div>
              <h6 className={`${_p}pt-2 ${_p}pb-1 ${_p}d-flex ${_p}align-items-center`}>
                <span className={`${_p}mr-2`}>
                  <Badge variant={"success"} label={t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_detail_COMPLIANT_title`)} />
                </span>{t(`_comp_${mPart.source.category.toLowerCase()}_${mPart.source.policyDescriptor.toLowerCase()}_${artType.type.toLowerCase()}_COMPLIANT_detail_description`)}
              </h6>
              <ul>
                {artType.extant.map((item, i) => (
                  <li key={`fc-${i}`} className={`${_p}p-1`}><span className={`${_p}text-monospace ${_p}lh-1-3 ${_p}text-code`}>{item.location.split(":/")[1].split("#coverart")[0]}</span></li>
                ))
                }
              </ul>
            </div>
          }
        </Modal>
      </div>
    </div>
  );
}

export default Assessment;
