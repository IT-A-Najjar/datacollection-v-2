import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [StudyClasses, setStudyClasses] = useState([])
    const [quraanicClass, setquraanicClass] = useState([])
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

    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props.itemid);
        setFormData({
            organizationId: props.itemid.organizationId ?? 0,
            governateId: props.itemid.governateId ?? 0,
            directorateId: props.itemid.directorateId ?? 0,
            regionId: props.itemid.regionId ?? 0,
            townId: props.itemid.townId ?? 0,
            centerId: props.itemid.centerId ?? 0,
            instituteId: props.itemid.instituteId ?? 0,
            quraanicClassId: props.itemid.quraanicClassId ?? 0,
            studentId: props.itemid.studentId ?? 0,
            firstName: props.itemid.firstName ?? "string",
            genderId: props.itemid.genderId ?? 0,
            fatherName: props.itemid.fatherName ?? "string",
            motherName: props.itemid.motherName ?? "string",
            nickname: props.itemid.nickname ?? "string",
            birthPlace: props.itemid.birthPlace ?? "string",
            birthDate: props.itemid.birthDate ?? "2024-06-05",
            homeland: props.itemid.homeland ?? "string",
            studyClassId: props.itemid.studyClassId ?? 0,
            schoolName: props.itemid.schoolName ?? "string",
            currentResidence: props.itemid.currentResidence ?? "string",
            contactNo: props.itemid.contactNo ?? "string",
            memorizedPartsNo: props.itemid.memorizedPartsNo ?? 0,
            currentPartNo: props.itemid.currentPartNo ?? 0,
            currentPage: props.itemid.currentPage ?? 0,
            currentSurah: props.itemid.currentSurah ?? 0,
            currentVerseNo: props.itemid.currentVerseNo ?? 0
        });
        setselectInstitutes(props.itemid.instituteId);
        setselectGovernate(props.itemid.governateId);
        setselectOrganization(props.itemid.organizationId);
        setselectDirectorate(props.itemid.directorateId);
        setselectRegions(props.itemid.regionId);
        setselectTowns(props.itemid.townId);
        setselectCenters(props.itemid.centerId);

    }, [props.itemid]);
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
        try {
            const response = await Api.fetch({ url: `QuraanicClasses/getQuraanicClass?instituteId=${selectInstitutes}&centerId=${selectCenters}&townId=${selectTowns}&regionId=${selectRegions}&directorateId=${selectDirectorate}&governateId=${selectGovernate}&organizationId=${selectOrganization}` });
            if (response) {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                setquraanicClass(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const edirdata = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Students/editStudent?studentId=${formData.studentId}`,
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
                <Modal onClose={props.onHide} title={'فورم التعديل'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <h6>المعلومات الشخصية</h6>
                                        {/* <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="organizationId"
                                                name="organizationId"
                                                className="form-control"
                                                value={formData.organizationId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectOrganization(e.target.value);
                                                }}
                                            >
                                                <option>اختر الجهة</option>
                                                {Organization.map((item, index) => (
                                                    <option key={index} value={item.organizationId}>{item.organizationName}</option>
                                                ))}
                                            </select>
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="governateId"
                                                name="governateId"
                                                className="form-control"
                                                value={formData.governateId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectGovernate(e.target.value);
                                                }}
                                            >
                                                <option>اختر المحافظة</option>
                                                {Governate.map((item, index) => (
                                                    <option key={index} value={item.governateId}>{item.governateIname}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="directorateId"
                                                name="directorateId"
                                                className="form-control"
                                                value={formData.directorateId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectDirectorate(e.target.value);
                                                }}
                                            >
                                                <option>اختر المديرية</option>
                                                {Directorate.map((item, index) => (
                                                    <option key={index} value={item.directorateId}>{item.directorateName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="regionId"
                                                name="regionId"
                                                className="form-control"
                                                value={formData.regionId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectRegions(e.target.value);
                                                }}
                                            >
                                                <option>اختر المنطقة</option>
                                                {Regions.map((item, index) => (
                                                    <option key={index} value={item.regionId}>{item.regionName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="townId"
                                                name="townId"
                                                className="form-control"
                                                value={formData.townId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectTowns(e.target.value);
                                                }}
                                            >
                                                <option>اختر البلدة</option>
                                                {Towns.map((item, index) => (
                                                    <option key={index} value={item.townId}>{item.townName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="centerId"
                                                name="centerId"
                                                className="form-control"
                                                value={formData.centerId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectCenters(e.target.value);
                                                }}
                                            >
                                                <option>اختر المركز</option>
                                                {Centers.map((item, index) => (
                                                    <option key={index} value={item.centerId}>{item.centerName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                id="instituteId"
                                                name="instituteId"
                                                className="form-control"
                                                value={formData.instituteId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectInstitutes(e.target.value);
                                                }}
                                            >
                                                <option>اختر الجمعية</option>
                                                {Institutes.map((item, index) => (
                                                    <option key={index} value={item.instituteId}>{item.instituteName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="studentId"
                                                name="studentId"
                                                value={formData.studentId}
                                                placeholder="رقم الطالب"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                placeholder="اسم الطالب"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <select
                                                id="genderId"
                                                name="genderId"
                                                className="form-control"
                                                value={formData.genderId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}
                                            >
                                                <option>اختر الجنس</option>
                                                {Genders.map((item, index) => (
                                                    <option key={index} value={item.genderId}>{item.genderName}</option>
                                                ))}
                                            </select>
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="fatherName"
                                                name="fatherName"
                                                value={formData.fatherName}
                                                placeholder="اسم الاب"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="motherName"
                                                name="motherName"
                                                value={formData.motherName}
                                                placeholder="اسم الام"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="nickname"
                                                name="nickname"
                                                value={formData.nickname}
                                                placeholder="الكنيه"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="birthPlace"
                                                name="birthPlace"
                                                value={formData.birthPlace}
                                                placeholder="مكان الميلاد"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="date"
                                                className="form-control"
                                                id="birthDate"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                placeholder={'سنة/شهر/يوم'}
                                                onFocus={handleFocus}
                                                onChange={handleInputChange}
                                                translate="no"
                                                lang="en"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="homeland"
                                                name="homeland"
                                                value={formData.homeland}
                                                placeholder="البلد الأصلي"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <select
                                                id="studyClassId"
                                                name="studyClassId"
                                                className="form-control"
                                                value={formData.studyClassId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}
                                            >
                                                <option>اختر الصف</option>
                                                {StudyClasses.map((item, index) => (
                                                    <option key={index} value={item.studyClassId}>{item.studyClassName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="schoolName"
                                                name="schoolName"
                                                value={formData.schoolName}
                                                placeholder="المدرسه"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="currentResidence"
                                                name="currentResidence"
                                                value={formData.currentResidence}
                                                placeholder="العنوان الحالي"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="contactNo"
                                                name="contactNo"
                                                value={formData.contactNo}
                                                placeholder="رقم التواصل"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <h6>معلومات الحفظ</h6>
                                        <hr />
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <select
                                                id="quraanicClassId"
                                                name="quraanicClassId"
                                                className="form-control"
                                                value={formData.quraanicClassId}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}
                                            >
                                                <option>اختر الحلقة</option>
                                                {quraanicClass.map((item, index) => (
                                                    <option key={index} value={item.quraanicClassID}>{item.quraanicClassName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="number"
                                                className="form-control"
                                                id="memorizedPartsNo"
                                                name="memorizedPartsNo"
                                                value={formData.memorizedPartsNo}
                                                placeholder="عدد الأجزاء المحفوظة"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="number"
                                                className="form-control"
                                                id="currentPartNo"
                                                name="currentPartNo"
                                                value={formData.currentPartNo}
                                                placeholder="الجزء الحالي"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="number"
                                                className="form-control"
                                                id="currentPage"
                                                name="currentPage"
                                                value={formData.currentPage}
                                                placeholder="الصفحة الحالية"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="currentSurah"
                                                name="currentSurah"
                                                value={formData.currentSurah}
                                                placeholder="السورة الحالية"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        edirdata();
                                                    }
                                                }}
                                                type="number"
                                                className="form-control"
                                                id="currentVerseNo"
                                                name="currentVerseNo"
                                                value={formData.currentVerseNo}
                                                placeholder="رقم الاية الحالية"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={edirdata}>حفظ</Button>
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
