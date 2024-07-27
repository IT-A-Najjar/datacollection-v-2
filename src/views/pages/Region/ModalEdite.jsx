import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [Governates, setGovernates] = useState([]);
    const [SelectGovernates, setSelectGovernates] = useState(props.itemid.governateId);
    const [Directorates, setDirectorates] = useState([]);

    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props);
        getGovernates();
        setFormData(
            {
                governateId: props.itemid.governateId,
                directorateId: props.itemid.directorateId,
                regionId: props.itemid.regionId,
                regionName: props.itemid.regionName
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
                console.log(response);
                setGovernates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDirectorates();
    }, [props.itemid.governateId]);
    const getDirectorates = async () => {
        try {
            const response = await Api.fetch({ url: `Directorates/GetDirectorateBase?governateId=${props.itemid.governateId}` });
            if (response) {
                console.log(response);
                setDirectorates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const editeData = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Regions/editRegion?directorateId=${formData.directorateId}&governateId=${formData.governateId}&regionId=${formData.regionId}`,
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
                <Modal onClose={props.onHide} title={'تعديل المنطقة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                    <FormGroup className="col-lg-8 col-md-6">
                                            <select disabled={true} id="governateId" name="governateId" className="form-control" value={formData.governateId}
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
                                            <select disabled={true} id="directorateId" name="directorateId" className="form-control" value={formData.directorateId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر المنطقة</option>
                                                {Directorates.map((item, index) => (
                                                    <option key={index} value={item.directorateId}>{item.directorateName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Input 
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             type="text" className="form-control" id="regionName" name='regionName' value={formData.regionName} placeholder="اسم مديرية" onChange={handleInputChange} />
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
