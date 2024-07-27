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
                organizationId: props.itemid.id,
                organizationName: props.itemid.destinationName
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
                url: `Organizations/editOrganization?id=${formData.organizationId}`,
                body: formData,
                method: 'PUT',
            });

            if (response.ok) {
                toast.success("تمت التعديل بنجاح");
                props.onHide();
                props.onUpdat();
            } else {
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
                <Modal onClose={props.onHide} title={'تعديل جهة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="organizationName">الاسم الجهة</Label>
                                            <Input 
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             type="text" className="form-control" id="organizationName" name='organizationName' value={formData.organizationName} placeholder="اسم الجهة" onChange={handleInputChange} />
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
