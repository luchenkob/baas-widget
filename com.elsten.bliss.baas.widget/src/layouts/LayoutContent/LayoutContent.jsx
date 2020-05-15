import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { _p } from "../../defines/config";

import "./LayoutContent.scss"

const LayoutContent = ({ slots }) => {

  return (
    <div className={`${_p}layout-content`}>
      <div className={`${_p}layout-content-inner`}>
        <Container className={`${_p}h-100`} fluid>
          <Row className={`${_p}h-100`}>
            <Col className={`${_p}h-100`}>
              {slots[0]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${_p}layout-content-nav`}>
        <Container fluid>
          <Row>
            <Col className={`${_p}text-md-right ${_p}text-center`}>
              {slots[1]}
              {slots[2]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${_p}layout-copyright`}>Powered by <a href="https://www.blisshq.com" style={{ fontWeight: "bold", fontFamily: 'Raleway', color: "#3697d9" }}>bliss</a></div>
    </div>
  );
}

export default LayoutContent;