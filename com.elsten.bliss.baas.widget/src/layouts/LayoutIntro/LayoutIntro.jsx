import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./LayoutIntro.scss"

const LayoutIntro = ({ slots }) => {

  return (
    <div className="layout-intro">
      <div className="layout-intro-top">
        <Container fluid>
          <Row>
            <Col>
              {slots[0]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="layout-intro-bottom">
        <Container className="h-100" fluid>
          <Row className="h-100">
            <Col className="h-100">
              {slots[1]}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LayoutIntro;