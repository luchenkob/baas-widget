import React, { useContext } from "react";
import { Context } from "../../context/context";
import { Container, Row, Col } from "react-bootstrap";

import "../Result/Result.scss";

const Artist = ({ ...props }) => {
  return (
    <div className="artist-name">{props.name}</div>
  );
}

const Assessment = ({ activeAssessment, ...props }) => {

  const { isProcessing, assessments, errors } = props;
  const { dispatch } = useContext(Context);

  const getArtists = (artists) => {
    return artists.map(((artist, i) => (
      <Artist key={`artist-${i}`} name={artist} />
    )));
  }

  const handleAlbumClick = (i) => {
    dispatch({ type: "SET_ACTIVE_ASSESSMENT", data: { activeAssessment: i } })
  }

  const isCompliance = (compliance) => {
    if (compliance) {
      if (compliance.parts) {
        compliance.parts.forEach((part) => {
          if (part.state == "NONCOMPLIANT") return false;
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  const getDetail = (data, i) => {
    return data.split(",")[i] ? data.split(",")[i] : "-";
  }

  const renderAssessment = () => {

    let active = activeAssessment;

    if (assessments.length > 0) {
      active ? active == activeAssessment : active = 0;

      return (
        <div className="result-assesment">
          <h2>Assessment: {assessments[active].assessment.cost}</h2>
          <div className="result-compliances">
            {
              assessments[active].assessment.compliance.parts.map((part, i) => (
                <div className="result-compliance" key={`com-${i}`}>
                  <div className="result-compliance-inner">
                    <div className="container-fluid p-0">
                      <div className="row">
                        <div className="col">
                          <h5 className="text-danger mb-4">{part.summary}</h5>
                        </div>
                      </div>
                      <div className="row">
                        {part.responses.map((response, i) => (
                          <div className="col-md-4" key={`alt-${i}`}>
                            <div className="result-compliance-alternative">
                              <div className="result-compliance-alternative-title">{getDetail(part.detail, i)}</div>
                              <p className="text-center mt-3"><strong>Alternative:</strong></p>
                              <div className="result-compliance-alternative-art" style={{ background: `url(${response.url})` }}>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
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
          <h2 className="mb-1">{assessment.album.title}</h2>
          {isCompliance(assessment.assessment.compliance) ? <span className="badge badge-success">Done</span> : <span className="badge badge-danger">Missed</span>}
        </div>
        <div className="result-artist">{getArtists(assessment.album.artists)}</div>
      </div>
    ));
  }

  return (
    <div className={`result ${isProcessing ? "processing" : ''}`}>
      {errors.length > 0 && (
        <div className="result-errors"><span>Errors (wrong files):</span><div className="result-errors-count">{errors.length}</div></div>
      )}
      <div className="result-title">
        <h2>Assessing</h2>
      </div>
      <div className="result-content">
        <Container fluid className="h-100 p-0" fluid>
          <Row className="h-100">
            <Col md={6} className="h-100 h-md-auto overflow-auto">
              {renderAlbums()}
            </Col>
            <Col md={6} className="h-100 h-md-auto overflow-auto">
              {renderAssessment()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Assessment;
