import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {
    const [Governates, setGovernates] = useState([]);
    const [SelectGovernates, setSelectGovernates] = useState([]);
    const [Directorates, setDirectorates] = useState([]);

    const [formData, setFormData] = useState({
        directorateId: 1,
        directorateName: null,
        governateId: 1,
        governateName: null,
        regionId: 0,
        regionName: null
    });
    const organizationId = localStorage.getItem('organizationId');
    useEffect(() => {
        getGovernates();
    }, []);

    const getGovernates = async () => {
        try {
            const response = await Api.fetch({ url: 'Governates/getGovernates' });
            if (response) {
                console.log(response);
                setGovernates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDirectorates();
    }, [SelectGovernates]);
    const getDirectorates = async () => {
        try {
            const response = await Api.fetch({ url: `Directorates/GetDirectorateBase?governateId=${SelectGovernates}` });
            if (response) {
                console.log(response);
                setDirectorates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addDirectorate = async () => {
        try {
            const response = await Api.fetch({
                url: 'Regions/addRegion',
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
            toast.error("حدث خطا ما");
            console.error('Network error:', error.message);
        }
    }

    return (
        <>
            {props.show && (
                <Modal onClose={props.onHide} title={'اضافة منطقة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-8 col-md-8">
                                            <Input type="text" className="form-control" id="regionId" name='regionId' placeholder="رقم مديرية" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-8 col-md-6">
                                            <select id="governateId" name="governateId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setSelectGovernates(e.target.value);
                                                }}>
                                                <option>اختر المحافطة</option>
                                                {Governates.map((item, index) => (
                                                    <option key={index} value={item.governateId}>{item.governateIname}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-6">
                                            <select id="directorateId" name="directorateId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر المديرية</option>
                                                {Directorates.map((item, index) => (
                                                    <option key={index} value={item.directorateId}>{item.directorateName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Input
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addDirectorate();
                                                }
                                            }}
                                             type="text" className="form-control" id="regionName" name='regionName' placeholder="اسم المنطقة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addDirectorate}>حفظ</Button>
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
