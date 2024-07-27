/* eslint-disable */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from '../../assets/images/logo.svg';


const Footer = () => {
    return (
        <div className="footer4 b-t spacer">
            <Container>
                <div className="f4-bottom-bar">
                    <Row>
                        <Col md="12">
                            <div className="footer-dev">
                                <img className='footer-img' src={logo} alt="wrapkit" />
                                <div className="copyright">جميع الحقوق محفوظة لوزارة الأوقاف والدعوة والإرشاد 2024</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default Footer;
