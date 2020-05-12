import React, { useContext } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col, Accordion, Button, Card } from "react-bootstrap";
import { capitalize } from "../../utils";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import { filterIt, ToBase64 } from "../../utils";

import "../Result/Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className="artist-name">{props.name}</div>
  );
}

const Assessment = ({ activeAssessment, ...props }) => {

  const { isProcessing, assessments, errors, origFiles } = props;
  const { dispatch } = useContext(Context);
  const { t } = useTranslation();

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
            badges.push(<span key={`b-${i}`} className="badge badge-danger"><Icon variant="times" className="mr-1" />{t(capitalize(part.summary))}</span>);
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

    switch (type) {
      case "http:":
      case "https:":
        image = response.url;
        break;
      case "baas:":
        const fileName = response.url.split("#")[0].split("/")[1];
        if (fileName) {
          const file = filterIt(origFiles, fileName, "file")[0];
          image = file ? file.common.picture[0].data : null;
        }
        if (image) image = ToBase64(image);
        title = t('Use existing art');
        break;

    }

    return <>{title && <p className="text-center mt-3 pl-2 pr-2"><strong>{title}:</strong></p>}
      <div className="result-compliance-alternative-art" style={{ background: `url(${image})` }}></div>
      <p className="text-center mt-3 pl-2 pr-2"><strong>{response.width} x {response.height}</strong></p>
    </>
  }

  const renderCompliance = (part, i) => {

    if (part.responses && part.responses.length > 0) {

      switch (part.responses[0].objectType) {

        case "InstallImageFromUrlResponse":
          return (
            <div className="row">
              {part.responses && part.responses.map((response, i) => (
                <div className="col-lg-4" key={`alt-${i}`}>
                  <div className="result-compliance-alternative">
                    {renderArt(response)}
                  </div>
                </div>
              ))}
            </div>
          );

        case "Response":
          return (
            part.responses.map((response, i) => (
              <div className="row" key={`resp-${i}`}>
                <div className="col">
                  <div className="container-fluid">
                    <div className="row border">
                      <div className="col-lg-8 d-flex align-items-center pt-2 pb-2 justify-content-lg-start justify-content-center">
                        <span>{t(response.description)}</span>
                      </div>
                      <div className="col-lg-4 d-flex align-items-center justify-content-lg-end justify-content-center">
                        <button className="btn btn-primary m-2">{t('Fix')}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          );

        default:
          return (
            part.responses.map((response, i) => (
              <Row key={`resp-${i}`}>
                <Col>
                  <Container fluid>
                    <Row className="border">
                      <Col lg={8} className="d-flex align-items-center pt-2 pb-2 justify-content-lg-start justify-content-center">
                        <span>{t(response.description)}</span>
                      </Col>
                      <Col lg={4} className="d-flex align-items-center justify-content-lg-end justify-content-center">
                        <Button variant="primary" className="m-2">{t('Fix')}</Button>
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

  const renderAssessment = () => {

    let active = activeAssessment;

    if (assessments.length > 0) {
      active ? active == activeAssessment : active = 0;

      return (
        <div className="result-assessment">
          <div className="result-compliances">
            {
              <Accordion defaultActiveKey={0}>
                {assessments[active].assessment.compliance.parts.map((part, i) => (
                  <Card key={`ac-${i}`}>

                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                      <Card.Header className="text-left">
                        <span className={`badge ${part.state == "NONCOMPLIANT" ? "badge-danger" : "badge-success"}`}>
                          {part.state == "NONCOMPLIANT" ?
                            <><Icon variant="times" className="mr-1" />{t(capitalize(part.summary))}</>
                            :
                            <><Icon variant="done" className="mr-1" />{t("Compliant")}</>
                          }
                        </span>
                      </Card.Header>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={i}>
                      <Card.Body>
                        <div className="result-compliance">
                          <div className="result-compliance-inner">
                            <Container fluid className="p-0">
                              <Row>
                                <Col>
                                  <p className={`mb-4 ${part.state == "NONCOMPLIANT" ? "text-danger" : "text-success"}`}>{t(part.detail)}</p>
                                </Col>
                              </Row>
                              {renderCompliance(part, i)}
                            </Container>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>


                ))}
              </Accordion>
            }
          </div>
        </div>
      )
    }
  }

  const renderAlbums = () => {

    return assessments.map((assessment, i) => (
      <div className={`result-album ${activeAssessment ? i == activeAssessment ? "active" : '' : i == 0 ? "active" : ''}`} key={`a-${i}`} onClick={() => { handleAlbumClick(i) }}>
        <div className="result-inline-title">
          <h5 className="mb-2">{assessment.album.title}</h5>
          <div className="result-badges">
            {complianceNotification(assessment.assessment.compliance)}
          </div>
        </div>
        <div className="result-artist">{getArtists(assessment.album.artists)}</div>
      </div>
    ));
  }

  return (
    <div className={`result ${isProcessing ? "processing" : ''}`}>
      {errors.length > 0 && (
        <div className="result-errors"><span>{t('Errors (wrong files)')}:</span><div className="result-errors-count">{errors.length}</div></div>
      )}
      <div className="result-title">
        <h4>{t('Assessment')}</h4>
      </div>
      <div className="result-content">
        <Container fluid className="h-100 p-0" fluid>
          <Row className="h-100">
            <Col md={6} className="h-100 h-md-auto overflow-y-auto">
              {renderAlbums()}
            </Col>
            <Col md={6} className="h-100 h-md-auto overflow-y-auto">
              {renderAssessment()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Assessment;
