import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [Governates, setGovernates] = useState([]);
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props);
        getGovernates();
        setFormData(
            {
                governateId: props.itemid.governateId,
                directorateId: props.itemid.directorateId,
                directorateName: props.itemid.directorateName
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
    const getGovernates = async () => {
        try {
            const response = await Api.fetch({ url: 'Governates/getGovernates' });
            if (response) {
                // console.log(response);
                setGovernates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const editeData = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Directorates/editDirectorate?directorateId=${formData.directorateId}&governateId=${formData.governateId}`,
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
                <Modal onClose={props.onHide} title={'تعديل المديرية'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <FormGroup className="col-lg-8 col-md-6">
                                            <select disabled={true} id="governateId" name="governateId" className="form-control" value={formData.governateId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر المحافطة</option>
                                                {Governates.map((item, index) => (
                                                    <option key={index} value={item.governateId}>{item.governateIname}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Label htmlFor="directorateName">الاسم المديرية</Label>
                                            <Input
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             type="text" className="form-control" id="directorateName" name='directorateName' value={formData.directorateName} placeholder="اسم المحافطة" onChange={handleInputChange} />
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
