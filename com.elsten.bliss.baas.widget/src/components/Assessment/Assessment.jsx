import React, { useContext } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { capitalize } from "../../utils";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import { filterIt, ToBase64 } from "../../utils";
import { _p } from "../../defines/config";
import Accordion from "../Accordion/Accordion";
import sizeOf from "image-size";

import "../Result/Result.scss";
import { useState } from "react";

const Artist = ({ ...props }) => {
  return (
    <div className={`${_p}artist-name`}>{props.name}</div>
  );
}

const Assessment = ({ activeAssessment, ...props }) => {

  const { isProcessing, assessments, errors, origFiles } = props;
  const { dispatch } = useContext(Context);
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          file = filterIt(origFiles, fileName, "file")[0];
          image = file ? file.data : null;
          width = file ? file.width : 0;
          height = file ? file.height : 0;
        }

        title = fileName;
        break;

    }

    return <>{title && <p className={`${_p}text-center ${_p}mt-3 ${_p}pl-2 ${_p}pr-2`}><strong>{title}</strong></p>}
      <div className={`${_p}result-compliance-alternative-art`} style={{ background: `url(${image})` }}></div>
      <p className={`${_p}text-center ${_p}mt-3 ${_p}pl-2 ${_p}pr-2`}><strong>{width} x {height}</strong></p>
    </>
  }

  const renderCompliance = (part) => {

    if (part.responses && part.responses.length > 0) {

      switch (part.responses[0].objectType) {

        case "InstallImageFromUrlResponse":
          return (
            <Row>
              {part.responses && part.responses.map((response, i) => (
                <Col lg={4} key={`alt-${i}`}>
                  <div className={`${_p}result-compliance-alternative`}>
                    {renderArt(response)}
                  </div>
                </Col>
              ))}
            </Row>
          );

        case "Response":
          return (
            part.responses.map((response, i) => (
              <Row key={`resp-${i}`}>
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
            ))
          );

        default:
          return (
            part.responses.map((response, i) => (
              <Row key={`resp-${i}`}>
                <Col>
                  <Container fluid>
                    <Row className={`${_p}border`}>
                      <Col lg={8} className={`${_p}d-flex ${_p}align-items-center ${_p}pt-2 ${_p}pb-2 ${_p}justify-content-lg-start ${_p}justify-content-center`}>
                        <span>{t(response.description)}</span>
                      </Col>
                      <Col lg={4} className={`${_p}d-flex ${_p}align-items-center ${_p}justify-content-lg-end ${_p}justify-content-center`}>
                        <Button variant="primary" className={`${_p}m-2`}>{t('Fix')}</Button>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            ))
          );
      }
    }
  }

  const checkCompliance = (part) => {

    const alt = [];
    const other = [];

    if (part.responses) {

      for (let response of part.responses) {
        if (response.objectType == "InstallImageFromUrlResponse") {
          alt.push(response);
        }
      }
    }

    return alt.length > 0 ?
      <div header="Alternative art" className={`${_p}caccordion-item`}>
        <div className={`${_p}result-compliance`}>
          <div className={`${_p}result-compliance-inner`}>
            <Container fluid className={`${_p}p-0`}>
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

  const checkComplianceOther = (part) => {

    const other = [];

    if (part.responses) {

      for (let response of part.responses) {
        if (response.objectType != "InstallImageFromUrlResponse") {
          other.push(response);
        }
      }
    }

    return other.length > 0 ?
      <div header="Other fixes" className={`${_p}caccordion-item ${_p}pl-0 ${_p}pr-0`}>
        <div className={`${_p}result-compliance`}>
          <div className={`${_p}result-compliance-inner`}>
            <Container fluid className={`${_p}p-0`}>
              {other.map((response, i) => (
                <Row key={`resp-${i}`}>
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
              <Accordion key={`ac-${i}`} className={`${_p}caccordion ${_p}mb-4`} selectedIndex={selectedIndex} onChange={() => { }}>

                <div header={
                  <span className={`${_p}badge ${part.state == "NONCOMPLIANT" ? `${_p}badge-danger` : `${_p}badge-success`}`}>
                    {part.state == "NONCOMPLIANT" ?
                      <><Icon variant="times" className={`${_p}mr-1`} />{t(capitalize(part.summary))}</>
                      :
                      <><Icon variant="done" className={`${_p}mr-1`} />{t("Compliant")}</>
                    }
                  </span>} className={`${_p}caccordion-item`}>
                  <div className={`${_p}result-compliance`}>
                    <div className={`${_p}result-compliance-inner`}>
                      <Container fluid className={`${_p}p-0`}>
                        <Row>
                          <Col>
                            <p className={`${_p}mb-4 ${part.state == "NONCOMPLIANT" ? `${_p}text-danger` : `${_p}text-success`}`}>{t(part.detail)}</p>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>

                {checkCompliance(part)}
                {checkComplianceOther(part)}
              </Accordion>
            ))}
          </div>
        </div>
      )
    }
  }

  const renderAlbums = () => {

    return assessments.map((assessment, i) => (
      <div className={`${_p}result-album ${activeAssessment ? i == activeAssessment ? `${_p}active` : '' : i == 0 ? `${_p}active` : ''}`} key={`a-${i}`} onClick={() => { handleAlbumClick(i) }}>
        <div className={`${_p}result-inline-title`}>
          <h5 className={`${_p}mb-2`}>{assessment.album.title}</h5>
          <div className={`${_p}result-badges`}>
            {complianceNotification(assessment.assessment.compliance)}
          </div>
        </div>
        <div className={`${_p}result-artist`}>{getArtists(assessment.album.artists)}</div>
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
      </div>
      <div className={`${_p}result-content`}>
        <Container fluid className={`${_p}h-100 ${_p}p-0`} fluid>
          <Row className={`${_p}h-100`}>
            <Col md={6} className={`${_p}h-100 ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderAlbums()}
            </Col>
            <Col md={6} className={`${_p}h-100 ${_p}bg-white ${_p}h-md-auto ${_p}overflow-y-auto`}>
              {renderAssessment()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Assessment;
