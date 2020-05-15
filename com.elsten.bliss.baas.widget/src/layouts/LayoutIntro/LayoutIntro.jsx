import React, {useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { _p } from "../../defines/config";

import "./LayoutIntro.scss"

const LayoutIntro = ({ slots, isDisabledIntro }) => {

  return (
    <div className={`${_p}layout-intro ${isDisabledIntro ? `${_p}disabled-intro` : ""}`}>
      <div className={`${_p}layout-intro-top`}>
        <Container fluid>
          <Row>
            <Col>
              {slots[0]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${_p}layout-intro-bottom`}>
        <Container className={`${_p}h-100`} fluid>
          <Row className={`${_p}h-100`}>
            <Col className={`${_p}h-100`}>
              {slots[1]}
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${_p}layout-copyright`}>Powered by <a href="https://www.blisshq.com" style={{fontWeight:"bold",fontFamily:'Raleway',color:"#3697d9"}}>bliss</a></div>
    </div>
  );
}

export default LayoutIntro;