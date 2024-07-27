import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [Organization, setOrganization] = useState([])
    const [selectOrganization, setselectOrganization] = useState(0)
    const [Governate, setGovernate] = useState([])
    const [selectGovernate, setselectGovernate] = useState(0)
    const [Directorate, setDirectorate] = useState([])
    const [selectDirectorate, setselectDirectorate] = useState(0)
    const [Regions, setRegions] = useState([])
    const [selectRegions, setselectRegions] = useState(0)
    const [Towns, setTowns] = useState([])
    const [selectTowns, setselectTowns] = useState(0) 
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props.itemid);
        setFormData(
            {
                organizationId: props.itemid.organizationId,
                governateId: props.itemid.governateId,
                directorateId: props.itemid.directorateId,
                centerId: props.itemid.centerId,
                centerName: props.itemid.centerName
            }
        )
        setselectGovernate(props.itemid.governateId);
        setselectOrganization(props.itemid.organizationId);
        setselectDirectorate(props.itemid.directorateID);
    }, [props.itemid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        getGovernate();
        getOrganization();
    }, []);
    const getGovernate = async () => {
        try {
            const response = await Api.fetch({ url: `Governates/getGovernate?organizationId=${selectOrganization}` });
            if (response) {
                setGovernate(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getOrganization = async () => {
        try {
            const response = await Api.fetch({ url: 'Organizations/getOrganizations' });
            if (response) {
                setOrganization(response)
            }
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDirectorate();
        getRegions();
        getTowns();
        
    }, [props.itemid]);
    const getDirectorate = async () => {
        try {
            const response = await Api.fetch({ url: `Directorates/GetDirectorateBase?governateId=${props.itemid.governateId}` });
            if (response) {
                setDirectorate(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRegions = async () => {
        try {
            const response = await Api.fetch({ url: `Regions/GetRegionBase?directorateId=${props.itemid.directorateId}&governateId=${props.itemid.governateId}` });
            if (response) {
                console.log(response);
                setRegions(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getTowns = async () => {
        try {
            const response = await Api.fetch({ url: `Towns/GetTownBase?regionId=${props.itemid.regionId}&directorateId=${props.itemid.directorateId}&governateId=${props.itemid.governateId}` });
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

    const editeData = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Centers/updateCenter?directorateId=${formData.directorateId}&governateId=${formData.governateId}&regionId=${formData.regionId}&townId=${formData.townId}&organizationId=${formData.organizationId}&centerId=${formData.centerId}`,
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
                <Modal onClose={props.onHide} title={'تعديل مركز'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                    <FormGroup className="col-lg-6 col-md-6">
                                                <select disabled={true} id="organizationId" name="organizationId" className="form-control" value={formData.organizationId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectOrganization(e.target.value);
                                                    }}>
                                                    <option>اختر الجهة</option>
                                                    {Organization.map((item, index) => (
                                                        <option key={index} value={item.organizationId}>{item.organizationName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                            <select disabled={true} id="governateId" name="governateId" className="form-control" value={formData.governateId}
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
                                            <select disabled={true}
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             id="directorateId" name="directorateId" className="form-control" value={formData.directorateId}
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
                                        {/* <FormGroup className="col-lg-6 col-md-6">
                                            <select disabled={true} id="regionId" name="regionId" className="form-control" value={formData.regionId}
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
                                                <select disabled={true} id="townId" name="townId" className="form-control" value={formData.townId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectTowns(e.target.value);
                                                    }}>
                                                    <option>اختر البلدة</option>
                                                    {Towns.map((item, index) => (
                                                        <option key={index} value={item.townId}>{item.townName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <Input type="text" className="form-control" id="centerName" name='centerName' value={formData.centerName} placeholder="اسم مديرية" onChange={handleInputChange} />
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
