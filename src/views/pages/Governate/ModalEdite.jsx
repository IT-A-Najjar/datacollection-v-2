import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input,  Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        setFormData(
            {
                governateId: props.itemid.id,
                governateIname: props.itemid.governateIname
            }
        )
    }, [props.itemid]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const editeData = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Governates/editGovernate?id=${formData.governateId}`,
                body: formData,
                method: 'PUT',
            });

            if (response.ok) {
                toast.success("تمت التعديل بنجاح");
                props.onHide();
                props.onUpdat();
            } else {
                toast.error("حدث خطا ما");
                const errorBody = await response.json();
                console.error('Request failed:', errorBody.title);
            }
        } catch (error) {
            toast.error("حدث خطا ما");
            console.error('Network error:', error.message);
        }
    }
    return (
        <>
             {props.show && (
                <Modal onClose={props.onHide} title={'تعديل المحافطة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="governateIname">الاسم المحافطة</Label>
                                            <Input
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             type="text" className="form-control" id="governateIname" name='governateIname' value={formData.governateIname} placeholder="اسم المحافطة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={editeData}>حفظ</Button>
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

export default ModalEdite;
