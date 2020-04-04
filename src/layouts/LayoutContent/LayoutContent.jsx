import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./LayoutContent.scss"

const LayoutContent = ({ slots }) => {

  return (
    <div className="lauout-content">
      <div className="lauout-content-inner">
        <Container className="h-100" fluid>
          <Row className="h-100">
            <Col className="h-100">
              {slots[0]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="lauout-content-nav">
        <Container fluid>
          <Row>
            <Col className="text-md-right text-center">
              {slots[1]}
              {slots[2]}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LayoutContent;