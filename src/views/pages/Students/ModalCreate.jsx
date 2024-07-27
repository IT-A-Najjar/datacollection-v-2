import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalCreate = (props) => {
    const [StudyClasses, setStudyClasses] = useState([])
    const [quraanicClassId, setquraanicClassId] = useState([])
    const [Institutes, setInstitutes] = useState([])
    const [selectInstitutes, setselectInstitutes] = useState(0)
    const [Genders, setGenders] = useState([])
    const [Governate, setGovernate] = useState([])
    const [selectGovernate, setselectGovernate] = useState(0)
    const [Organization, setOrganization] = useState([])
    const [selectOrganization, setselectOrganization] = useState(0)
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
        studentId: 0,
        firstName: "",
        genderId: 0,
        fatherName: "",
        motherName: "",
        nickname: "",
        birthPlace: "",
        birthDate: "",
        homeland: "",
        studyClassId: 0,
        schoolName: "",
        currentResidence: "",
        contactNo: "",
        memorizedPartsNo: 0,
        currentPartNo: 0,
        currentPage: 0,
        currentSurah: 0,
        currentVerseNo: 0
    });

    const handleFocus = (e) => {
        e.target.type = 'date';
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        getGenders();
        getGovernate();
        getOrganization();
        getStudyClasses();
    }, []);


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
    useEffect(() => {
        getDirectorate();
        getRegions();
        getTowns();
        getCenters();
        getInstitutes();
        getquraanicClassId();
    }, [selectGovernate, selectDirectorate, selectTowns, selectRegions, selectCenters, selectInstitutes]);
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
            const response = await Api.fetch({ url: `Institutes/getInstitute?organizationId=${organizationId}&centerId=${selectCenters}&townId=${selectTowns}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}` });
            if (response) {
                console.log(response);
                setInstitutes(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getStudyClasses = async () => {
        try {
            const response = await Api.fetch({ url: 'StudyClasses/getStudyClasses' });
            if (response) {
                setStudyClasses(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getquraanicClassId = async () => {
        console.log('====================================');
        console.log(`QuraanicClasses/getQuraanicClass?instituteId=${selectInstitutes}&centerId=${selectCenters}&townId=${selectTowns}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}&organizationId=${organizationId}`);
        console.log('====================================');
        try {
            const response = await Api.fetch({ url: `QuraanicClasses/getQuraanicClass?instituteId=${selectInstitutes}&townId=${selectTowns}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}&organizationId=${organizationId}` });
            if (response) {
                console.log(response);
                setquraanicClassId(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const addStudent = async () => {
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        try {
            const response = await Api.fetch({
                url: 'Students/addStudent',
                body: formData,
                method: 'POST',
            });
            console.log(response);
            if (response.ok) {
                toast.success("تمت الاضافة بنجاح");
                setFormData({
                    organizationId: organizationId,
                    governateId: formData.governateId,
                    directorateId: formData.directorateId,
                    regionId: formData.regionId,
                    townId: formData.townId,
                    centerId: formData.centerId,
                    instituteId: formData.instituteId,
                    quraanicClassId: formData.quraanicClassId,
                    studentId: 0,
                    firstName: "",
                    genderId: 0,
                    fatherName: "",
                    motherName: "",
                    nickname: "",
                    birthPlace: "",
                    birthDate: "",
                    homeland: "",
                    studyClassId: 0,
                    schoolName: "",
                    currentResidence: "",
                    contactNo: "",
                    memorizedPartsNo: 0,
                    currentPartNo: 0,
                    currentPage: 0,
                    currentSurah: 0,
                    currentVerseNo: 0
                });
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
                <Modal onClose={props.onHide} title={'اضافة طالب'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <h6>المعلومات اساسية</h6>
                                        <hr />
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                            <select required id="governateId" name="governateId" className="form-control" value={formData.governateId}
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
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            {/* <Label htmlFor="directorateId">المديرية</Label> */}
                                            <select required id="directorateId" name="directorateId" className="form-control" value={formData.directorateId}
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
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="regionId" name="regionId" className="form-control" value={formData.regionId}
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
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="townId" name="townId" className="form-control" value={formData.townId}
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
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="instituteId" name="instituteId" className="form-control" value={formData.instituteId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectInstitutes(e.target.value);
                                                }}>
                                                <option>اختر الجمعية</option>
                                                {Institutes.map((item, index) => (
                                                    <option key={index} value={item.instituteId}>{item.instituteName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="quraanicClassId" name="quraanicClassId" className="form-control" value={formData.quraanicClassId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر الحلقة</option>
                                                {quraanicClassId.map((item, index) => (
                                                    <option key={index} value={item.quraanicClassID}>{item.quraanicClassName} / {item.genderName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <h6>المعلومات الشخصية</h6>
                                        <hr />
                                        {/* <FormGroup className="col-lg-4 col-md-6">
                                            <Input type="text" className="form-control" id="studentId" name='studentId' placeholder="رقم الطالب" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input  required  type="text" className="form-control" id="firstName" name='firstName' placeholder="اسم الطالب" value={formData.firstName} onChange={handleInputChange} />
                                        </FormGroup>
                                        
                                        {/* <FormGroup className="col-lg-4 col-md-6">
                                            <select required id="genderId" name="genderId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر الجنس</option>
                                                {Genders.map((item, index) => (
                                                    <option key={index} value={item.genderId}>{item.genderName}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label required htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input type="text" className="form-control" id="fatherName" name='fatherName' placeholder="اسم الاب" value={formData.fatherName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="motherName" name='motherName' placeholder="اسم الام" value={formData.motherName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="nickname" name='nickname' placeholder="الكنيه" value={formData.nickname} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="birthPlace" name='birthPlace' placeholder="مكان التولد" value={formData.birthPlace} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6" lang="ar" dir="rtl">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required
                                                type="text"
                                                id="birthDate"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                placeholder={'تاريخ الميلاد'}
                                                onFocus={handleFocus}
                                                onChange={handleInputChange}
                                                translate="no"
                                                lang="en"
                                                className="form-control text-right"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input required type="text" className="form-control" id="homeland" name='homeland' placeholder="البلد الأصلي" value={formData.homeland} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select required id="studyClassId" name="studyClassId" className="form-control" value={formData.studyClassId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر الصف</option>
                                                {StudyClasses.map((item, index) => (
                                                    <option key={index} value={item.studyClassId}>{item.studyClassName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="schoolName" name='schoolName' placeholder="المدرسة" value={formData.schoolName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="currentResidence" name='currentResidence' placeholder="العنوان الحالي" value={formData.currentResidence} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addStudent();
                                                    }
                                                }}
                                                type="text" className="form-control" id="contactNo" name='contactNo' placeholder="رقم التواصل" value={formData.contactNo} onChange={handleInputChange} />
                                        </FormGroup>
                                        {/* <h6>معلومات الحفظ</h6>
                                        <hr />
                                        

                                         <FormGroup className="col-lg-4 col-md-6">
                                            <Input type="number" className="form-control" id="memorizedPartsNo" name='memorizedPartsNo' placeholder="عدد الأجزاء المحفوظة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <Input type="number" className="form-control" id="currentPartNo" name='currentPartNo' placeholder="الجزء الحالي" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <Input type="number" className="form-control" id="currentPage" name='currentPage' placeholder="الصفحة الحالية" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <Input type="text" className="form-control" id="currentSurah" name='currentSurah' placeholder="السورة الحالية" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <Input 
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addStudent();
                                                }
                                            }}
                                             type="number" className="form-control" id="currentVerseNo" name='currentVerseNo' placeholder="رقم الاية الحالية" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addStudent}>حفظ</Button>
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
