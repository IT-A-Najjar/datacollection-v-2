import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {
    const [Levels, setLevels] = useState([])
    const [Classes, setClasses] = useState([])
    const [Institutes, setInstitutes] = useState([])
    const [Genders, setGenders] = useState([])
    const [selectGenders, setselectGenders] = useState(0)
    const [Governate, setGovernate] = useState([])
    const [selectGovernate, setselectGovernate] = useState(0)
    const [Organization, setOrganization] = useState([])
    const [selectOrganization, setselectOrganization] = useState(0)
    const [SupervisorsAndTeachers, setSupervisorsAndTeachers] = useState([])
    const [selectSupervisorsAndTeachers, setselectSupervisorsAndTeachers] = useState(0)
    const [Directorate, setDirectorate] = useState([])
    const [selectDirectorate, setselectDirectorate] = useState(0)
    const [Regions, setRegions] = useState([])
    const [selectRegions, setselectRegions] = useState(0)
    const [Towns, setTowns] = useState([])
    const [selectTowns, setselectTowns] = useState(0)
    const [Centers, setCenters] = useState([])
    const [selectCenters, setselectCenters] = useState(0)
    const organizationId = localStorage.getItem('organizationId');

    const [formData, setFormData] = useState({
        organizationId: organizationId,
        governateId: 0,
        directorateId: 0,
        regionId: 0,
        townId: 0,
        centerId: 0,
        instituteId: 0,
        quraanicClassId: 0,
        quraanicClassName: "",
        quraanicClassLevelId: 0,
        classId: 0,
        genderId: 0,
        supervisorOrTeacherId: 0
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        getLevels();
        getClasses();
        getGenders();
        getGovernate();
        getOrganization();
    }, []);

    const getLevels = async () => {
        try {
            const response = await Api.fetch({ url: 'QuraanicClassesLevels/getQuraanicClassesLevels' });
            if (response) {
                setLevels(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getClasses = async () => {
        try {
            const response = await Api.fetch({ url: 'Classes/getClasses' });
            if (response) {
                setClasses(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getGenders = async () => {
        try {
            const response = await Api.fetch({ url: 'Genders/getGenders' });
            if (response) {
                setGenders(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getGovernate = async () => {
        try {
            const response = await Api.fetch({ url: `Governates/getGovernate?organizationId=${organizationId}` });
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
    const getSupervisorsAndTeachers = async () => {
        try {
            const response = await Api.fetch({ url: `SupervisorsAndTeachers/getSupervisorsAndTeachersByOrganizationIdAndGender?organizationId=${organizationId}&genderId=${selectGenders}` });
            console.log(response);
            if (response) {
                setSupervisorsAndTeachers(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDirectorate();
        getRegions();
        getTowns();
        getCenters();
        getInstitutes();
        getSupervisorsAndTeachers();
    }, [selectGovernate, selectDirectorate, selectTowns, selectRegions, selectCenters ,selectGenders]);
    const getDirectorate = async () => {
        try {
            const response = await Api.fetch({ url: `Directorates/getDirectorate?organizationId=${organizationId}&governateId=${selectGovernate}` });
            if (response) {
                setDirectorate(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRegions = async () => {
        try {
            const response = await Api.fetch({ url: `Regions/getRegion?organizationId=${organizationId}&directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
            if (response) {
                setRegions(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getTowns = async () => {
        try {
            const response = await Api.fetch({ url: `Towns/getTown?organizationId=${organizationId}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
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
    const getCenters = async () => {
        try {
            const response = await Api.fetch({ url: `Centers/getCenter?organizationId=${organizationId}&directorateId=${selectDirectorate}&governateId=${selectGovernate}&regionId=${selectRegions}&townId=${selectTowns}&organizationId=${selectOrganization}` });
            if (response) {
                setCenters(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getInstitutes = async () => {
        try {
            const response = await Api.fetch({ url: `Institutes/getInstitute?organizationId=${organizationId}&&townId=${selectTowns}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
            if (response) {
                setInstitutes(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const addComplexes = async () => {
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        try {
            const response = await Api.fetch({
                url: 'QuraanicClasses/addQuraanicClass',
                body: formData,
                method: 'POST',
            });
            console.log(response);
            if (response.ok) {
                setFormData({
                    organizationId: organizationId,
                    governateId: formData.governateId,
                    directorateId: formData.directorateId,
                    regionId: formData.regionId,
                    townId: formData.townId,
                    centerId: formData.centerId,
                    instituteId: formData.instituteId,
                    quraanicClassId: 0,
                    quraanicClassName: "",
                    quraanicClassLevelId: 0,
                    classId: 0,
                    genderId: 0,
                    supervisorOrTeacherId: 0
                })
                toast.success("تمت الاضافة بنجاح");
                // props.onHide();
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
                <Modal onClose={props.onHide} title={'اضافة الحلقة'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <FormGroup className="row col-lg-12 col-md-12">
                                            <h6>معلومات اساسية</h6>

                                            {/* <FormGroup className="col-lg-4 col-md-6">
                                                <Input type="text" className="form-control" id="quraanicClassId" name='quraanicClassId' placeholder="رقم المجمع" onChange={handleInputChange} />
                                            </FormGroup> */}

                                            {/* <FormGroup className="col-lg-4 col-md-6">
                                                <select id="organizationId" name="organizationId" className="form-control"
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectOrganization(e.target.value);
                                                    }}>
                                                    <option>اختر الجهة</option>
                                                    {Organization.map((item, index) => (
                                                        <option key={index} value={item.organizationId}>{item.organizationName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup> */}
                                            <FormGroup className="col-lg-4 col-md-6">
                                                {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                                <select id="governateId" name="governateId" className="form-control" value={formData.governateId}
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
                                            <FormGroup className="col-lg-4 col-md-6">
                                                {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                                <select id="directorateId" name="directorateId" className="form-control" value={formData.directorateId}
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
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="regionId" name="regionId" className="form-control" value={formData.regionId}
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
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="townId" name="townId" className="form-control" value={formData.townId}
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
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="centerId" name="centerId" className="form-control" value={formData.centerId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectCenters(e.target.value);
                                                    }}>
                                                    <option>اختر المركز</option>
                                                    {Centers.map((item, index) => (
                                                        <option key={index} value={item.centerId}>{item.centerName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="instituteId" name="instituteId" className="form-control" value={formData.instituteId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectSupervisorsAndTeachers(e.target.value);
                                                    }}>
                                                    <option>اختر المجمع</option>
                                                    {Institutes.map((item, index) => (
                                                        <option key={index} value={item.instituteId}>{item.instituteName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                            <h6>معلومات الحلقة</h6>
                                            <hr></hr>
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <Input type="text" className="form-control" id="quraanicClassName" name='quraanicClassName' value={formData.quraanicClassName} placeholder="اسم الحلقة" onChange={handleInputChange} />
                                            </FormGroup>
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="quraanicClassLevelId" name="quraanicClassLevelId" className="form-control" value={formData.quraanicClassLevelId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectSupervisorsAndTeachers(e.target.value);
                                                    }}>
                                                    <option>اختر المستوى</option>
                                                    {Levels.map((item, index) => (
                                                        <option key={index} value={item.quraanicClassLevelId}>{item.quraanicClassLevelName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                            {/* <FormGroup className="col-lg-4 col-md-6">
                                                <select id="classId" name="classId" className="form-control" value={formData.classId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectSupervisorsAndTeachers(e.target.value);
                                                    }}>
                                                    <option>اختر الصف</option>
                                                    {Classes.map((item, index) => (
                                                        <option key={index} value={item.classId}>{item.className}</option>
                                                    ))}
                                                </select>
                                            </FormGroup> */}
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select id="genderId" name="genderId" className="form-control" value={formData.genderId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectGenders(e.target.value);
                                                    }}>
                                                    <option>اختر الجنس</option>
                                                    {Genders.map((item, index) => (
                                                        <option key={index} value={item.genderId}>{item.genderName}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                            <FormGroup className="col-lg-4 col-md-6">
                                                <select
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addComplexes();
                                                        }
                                                    }}
                                                    id="supervisorOrTeacherId" name="supervisorOrTeacherId" className="form-control" value={formData.supervisorOrTeacherId}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setselectSupervisorsAndTeachers(e.target.value);
                                                    }}>
                                                    <option>مدرس الحلقة</option>
                                                    {SupervisorsAndTeachers.map((item, index) => (
                                                        <option key={index} value={item.supervisorOrTeacherId}>{item.name} {item.nickname}</option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addComplexes}>حفظ</Button>
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
