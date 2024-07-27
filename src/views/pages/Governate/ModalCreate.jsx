import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {
    const [formData, setFormData] = useState({
        governateId: 0,
        governateIname: null
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addGovernate = async () => {
        try {
            const response = await Api.fetch({
                url: 'Governates/addGovernate',
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
                <Modal onClose={props.onHide} title={'اضافة المحافطة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="governateId">رقم المحافطة</Label>
                                            <Input type="text" className="form-control" id="governateId" name='governateId' placeholder="رقم المحافطة" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="governateIname">الاسم المحافطة</Label>
                                            <Input
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addGovernate();
                                                }
                                            }}
                                             type="text" className="form-control" id="governateIname" name='governateIname' placeholder="اسم المحافطة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addGovernate}>حفظ</Button>
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
