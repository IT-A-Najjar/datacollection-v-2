import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {
    const [dirctorate, setDirctorate] = useState([])
    const [selectDirctorate, setselectDirctorate] = useState(0)

    const [formData, setFormData] = useState({
        organizationId: 0,
        organizationName: null
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addOrganization = async () => {
        try {
            console.log(formData);
            const response = await Api.fetch({
                url: 'Organizations/addOrganization',
                body: formData,
                method: 'POST',
            });
            console.log(response);
            if (response.ok) {
                toast.success("تمت الاضافة بنجاح");
                props.onHide();
                props.onUpdat();
            } else {
                toast.error("حدث خطا ما");
                const errorBody = await response.json();
                console.error('Request failed:', errorBody.title);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    }

    return (
        <>
            {props.show && (
                <Modal onClose={props.onHide} title={'اضافة جهة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="organizationId">رقم الجهة</Label>
                                            <Input type="text" className="form-control" id="organizationId" name='organizationId' placeholder="رقم الجهة" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="organizationName">الاسم الجهة</Label>
                                            <Input 
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addOrganization();
                                                }
                                            }}
                                             type="text" className="form-control" id="organizationName" name='organizationName' placeholder="اسم الجهة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addOrganization}>حفظ</Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default ModalCreate;
