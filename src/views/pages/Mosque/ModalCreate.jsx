import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {

    const [Governate, setGovernate] = useState([])
    const [selectGovernate, setselectGovernate] = useState(0)
    const [Directorate, setDirectorate] = useState([])
    const [selectDirectorate, setselectDirectorate] = useState(0)
    const [Regions, setRegions] = useState([])
    const [selectRegions, setselectRegions] = useState(0)
    const [Towns, setTowns] = useState([])
    const [selectTowns, setselectTowns] = useState(0)
    const organizationId = localStorage.getItem('organizationId');

    const [formData, setFormData] = useState({
        governateId: 0,
        directorateId: 0,
        regionId: 0,
        townId: 0,
        mosqueId: 0,
        mosqueName: "string"
    });

    useEffect(() => {
        getGovernate();
    }, []);

    const getGovernate = async () => {
        try {
            const response = await Api.fetch({ url: 'Governates/getGovernates' });
            if (response) {
                setGovernate(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDirectorate();
        getRegions();
        getTowns();
    }, [selectGovernate, selectDirectorate, selectRegions]);
    const getDirectorate = async () => {
        try {
            const response = await Api.fetch({ url: `Directorates/getDirectorateBase?governateId=${selectGovernate}` });
            if (response) {
                setDirectorate(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRegions = async () => {
        try {
            const response = await Api.fetch({ url: `Regions/getRegionBase?directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
            if (response) {
                setRegions(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getTowns = async () => {
        try {
            const response = await Api.fetch({ url: `Towns/getTownBase?regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
            if (response) {
                // console.log('====================================');
                // console.log(response);
                // console.log('====================================');
                setTowns(response)
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
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: 'Mosques/addMosque',
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
                <Modal onClose={props.onHide} title={'اضافة مسجد'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-6 col-md-6">
                                            <Input type="text" className="form-control" id="mosqueId" name='mosqueId' placeholder="رقم مركز" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-6">
                                            {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                            <select id="governateId" name="governateId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectGovernate(e.target.value);
                                                }}>
                                                <option>اختر المحافظة</option>
                                                {Governate.map((item, index) => (
                                                    <option key={index} value={item.governateId}>{item.governateIname}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                            <select id="directorateId" name="directorateId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectDirectorate(e.target.value);
                                                }}>
                                                <option>اختر المديرية</option>
                                                {Directorate.map((item, index) => (
                                                    <option key={index} value={item.directorateId}>{item.directorateName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select id="regionId" name="regionId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectRegions(e.target.value);
                                                }}>
                                                <option>اختر المنطقة</option>
                                                {Regions.map((item, index) => (
                                                    <option key={index} value={item.regionId}>{item.regionName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select id="townId" name="townId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectTowns(e.target.value);
                                                }}>
                                                <option>اختر البلدة</option>
                                                {Towns.map((item, index) => (
                                                    <option key={index} value={item.townId}>{item.townName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <Input 
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addDirectorate();
                                                }
                                            }}
                                             type="text" className="form-control" id="mosqueName" name='mosqueName' placeholder="اسم المسجد" onChange={handleInputChange} />
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
