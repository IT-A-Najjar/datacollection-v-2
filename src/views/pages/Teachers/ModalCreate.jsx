import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const ModalCreate = (props) => {
    const [authorizerName, setAuthorizerName] = useState('');
    const [certificationDate, setCertificationDate] = useState('');
    const [dirctorate, setDirctorate] = useState([])
    const [selectDirctorate, setselectDirctorate] = useState(0)
    const [RecitationsWithNarrations, setRecitationsWithNarrations] = useState([])
    const [Genders, setGenders] = useState([])
    const [MaritalSatuses, setMaritalSatuses] = useState([])
    const [HealthStatus, setHealthStatus] = useState([])
    const [EducationalLevels, setEducationalLevels] = useState([])
    const [StudyYears, setStudyYears] = useState([])
    const [Recitations, setRecitations] = useState([])
    const [selectRecitations, setselectRecitations] = useState(0)
    const [Narrations, setNarrations] = useState([])
    const [RolesDescriptions, setRolesDescriptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allNarrations, setallNarrations] = useState([]);
    const [selectisCertified, setselectisCertified] = useState(0);
    const [formData, setFormData] = useState({
        organizationId: localStorage.getItem('organizationId'),
        supervisorOrTeacherId: 0,
        name: null,
        genderId: 0,
        fatherName: null,
        motherName: null,
        nickname: null,
        birthPlace: null,
        birthDate: null,
        homeland: null,
        contactNo: null,
        currentResidence: null,
        maritalSatusId: 0,
        wivesNo: 0,
        childrenNo: 0,
        healthStatusId: 0,
        diseaseType: null,
        educationalLevelId: 0,
        certificateGrantingDate: null,
        issuedFrom: null,
        city: null,
        isStudying: 2,
        certificateType: "لا يوجد",
        studyYearId: 1,
        univercityName: "لا يوجد",
        memorizedPartsNo: null,
        masteredMemorizedPartsNo: null,
        isCertified: 0,
        teacherRoleId: 2
    });
    const handleFocus = (e) => {
        e.target.type = 'date';
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['isCertified', 'isStudying', 'memorizedPartsNo', 'masteredMemorizedPartsNo'];
        let adjustedValue = value;

        if (name === 'memorizedPartsNo' || name === 'masteredMemorizedPartsNo') {
            // Ensure the value is within the range of 0 to 30
            if (value > 30) {
                adjustedValue = 30;
            } else if (value < 0) {
                adjustedValue = 0;
            }
        }
        if (name === "isCertified" && value == 3) {
            console.log(value);
            adjustedValue = 1;
        }

        setFormData({
            ...formData,
            [name]: numericFields.includes(name) ? Number(adjustedValue) : adjustedValue
        });
    };

    const handleChange = (recitationId, narrationId, authorizerName, certificationDate) => {
        setSelectedOptions((prevSelected) => {
            const isSelected = prevSelected.some(
                (option) => option.recitationId === recitationId && option.narrationId === narrationId
            );

            if (isSelected) {
                return prevSelected.filter(
                    (option) => !(option.recitationId === recitationId && option.narrationId === narrationId)
                );
            } else {
                return [
                    ...prevSelected,
                    { recitationId, narrationId, authorizerName, certificationDate }
                ];
            }
        });
    };
    const handleInputChangeall = (e) => {
        const { name, value } = e.target;
        setallNarrations({
            ...allNarrations,
            [name]: value
        });
    };
    const handleInputChange1 = (e, field, recitationId, narrationId) => {
        const { value } = e.target;
        if (field === 'authorizerName') {
            setAuthorizerName(value);
            setSelectedOptions((prevSelected) =>
                prevSelected.map((option) =>
                    option.recitationId === recitationId && option.narrationId === narrationId
                        ? { ...option, authorizerName: value }
                        : option
                )
            );
        } else if (field === 'certificationDate') {
            setCertificationDate(value);
            setSelectedOptions((prevSelected) =>
                prevSelected.map((option) =>
                    option.recitationId === recitationId && option.narrationId === narrationId
                        ? { ...option, certificationDate: value }
                        : option
                )
            );
        }
    };

    useEffect(() => {
        getGenders();
        getRecitationsWithNarrations();
        getMaritalSatuses();
        getHealthStatus();
        getEducationalLevels();
        getStudyYears();
        getRecitations();
        getNarrations();
        getRole();
    }, []);
    useEffect(() => {
        getNarrations();
    }, [selectRecitations]);

    const getGenders = async () => {
        try {
            const response = await Api.fetch({ url: 'Genders/getGenders' });
            console.log(response);
            if (response) {
                setGenders(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRecitationsWithNarrations = async () => {
        try {
            const response = await Api.fetch({ url: 'Recitations/getRecitationsWithNarrations' });
            //console.log(response);
            if (response) {
                setRecitationsWithNarrations(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getMaritalSatuses = async () => {
        try {
            const response = await Api.fetch({ url: 'MaritalSatuses/getMaritalSatuses' });
            if (response) {
                //console.log(response);
                setMaritalSatuses(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getHealthStatus = async () => {
        try {
            const response = await Api.fetch({ url: 'HealthStatus/getHealthStatuses' });
            if (response) {
                //console.log(response);
                setHealthStatus(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getEducationalLevels = async () => {
        try {
            const response = await Api.fetch({ url: 'EducationalLevels/getEducationalLevels' });
            if (response) {
                // //console.log(response);
                setEducationalLevels(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getStudyYears = async () => {
        try {
            const response = await Api.fetch({ url: 'StudyYears/getStudyYears' });
            if (response) {
                // //console.log(response);
                setStudyYears(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRecitations = async () => {
        try {
            const response = await Api.fetch({ url: 'Recitations/getRecitations' });
            if (response) {
                // //console.log(response);
                setRecitations(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getNarrations = async () => {
        try {
            const response = await Api.fetch({ url: `Narrations/getNarration?recitationId=${selectRecitations}` });
            if (response) {
                // //console.log(response);
                setNarrations(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getRole = async () => {
        try {
            const response = await Api.fetch({ url: `TeachersRolesDescriptions/getTeachersRolesDescriptions` });
            if (response) {
                // //console.log(response);
                setRolesDescriptions(response)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const addTeacher = async () => {

        try {
            console.log(formData);
            const response = await Api.fetch({
                url: 'SupervisorsAndTeachers/addSupervisorsAndTeacher',
                body: formData,
                method: 'POST',
            });
            console.log(response);
            if (response.ok) {
                if (selectisCertified == 3) {
                    console.log(allNarrations);

                    const response = await Api.fetch({
                        url: `TeachersRecitationsNarrations/addTeinRecitationsNarration?authorizerName=${allNarrations.authorizerName}&certificationDate=${allNarrations.certıfıcatıonDate}`,
                        method: 'POST',
                    });
                    //console.log(response);
                    if (response.ok) {
                        toast.success("تم اضافة الاجازات بنجاح");
                    } else {
                        const errorBody = await response.json();
                        console.error('Request failed:', errorBody.title);
                    }
                } else {
                    console.log(selectedOptions);
                    const response = await Api.fetch({
                        url: 'TeachersRecitationsNarrations',
                        body: selectedOptions,
                        method: 'POST',
                    });
                    //console.log(response);
                    if (response.ok) {
                        toast.success("تم اضافة الروايات بنجاح");
                    } else {
                        const errorBody = await response.json();
                        console.error('Request failed:', errorBody.title);
                    }
                }
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
                <Modal onClose={props.onHide} title={'اضافة معلم'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <h6>معلومات الشحصية</h6>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="number" className="form-control" id="supervisorOrTeacherId" name='supervisorOrTeacherId' placeholder="رقم المعلم" onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="name" name='name' placeholder="اسم المعلم" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="genderId" name="genderId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>اختر الجنس</option>
                                                {Genders.map((item, index) => (
                                                    <option key={index} value={item.genderId}>{item.genderName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="fatherName" name='fatherName' placeholder="اسم الاب" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="motherName" name='motherName' placeholder="اسم الام" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="nickname" name='nickname' placeholder="الكنيه" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="birthPlace" name='birthPlace' placeholder="مكان الولادة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Label htmlFor="birthDate">تاريخ الميلاد</Label>

                                            <Input required type="text" className="form-control" id="birthDate" name='birthDate' placeholder={'سنة/شهر/يوم'}
                                                onFocus={handleFocus}
                                                onChange={handleInputChange}
                                                translate="no"
                                                lang="en" />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Label htmlFor="homeland">البلد الأصلي</Label>
                                            <Input required type="text" className="form-control" id="homeland" name='homeland' placeholder="البلد الأصلي" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="contactNo" name='contactNo' placeholder="رقم التواصل" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input required type="text" className="form-control" id="currentResidence" name='currentResidence' placeholder="السكن الحالي" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="maritalSatusId" name="maritalSatusId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>الحالة الاحتماعية</option>
                                                {MaritalSatuses.map((item, index) => (
                                                    <option key={index} value={item.maritalSatusId}>{formData.genderId == 1 ? item.maritalSatusNameM : item.maritalSatusNameF}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input
                                                type="number"
                                                className="form-control"
                                                id="wivesNo"
                                                name="wivesNo"
                                                placeholder="عدد الزوجات"
                                                onChange={handleInputChange}
                                                disabled={formData.genderId == 2 || formData.maritalSatusId == 1}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input disabled={formData.maritalSatusId == 1} type="number" className="form-control" id="childrenNo" name='childrenNo' placeholder="عدد الأولاد" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="healthStatusId" name="healthStatusId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>الحالة الصحية</option>
                                                {HealthStatus.map((item, index) => (
                                                    <option key={index} value={item.healthStatusId}>{item.healthStatusName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input disabled={formData.healthStatusId == 1} type="text" className="form-control" id="diseaseType" name='diseaseType' placeholder="المرض" onChange={handleInputChange} />
                                        </FormGroup>
                                        <h6>معلومات الدراسية</h6>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Label htmlFor="educationalLevelId">التحصيل العلمي</Label>
                                            <select required id="educationalLevelId" name="educationalLevelId" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>التحصيل العلمي</option>
                                                {EducationalLevels.map((item, index) => (
                                                    <option key={index} value={item.educationalLevelId}>{item.educationalLevelName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Label htmlFor="certificateGrantingDate">تاريخ المنح</Label>
                                            <Input type="text" className="form-control" id="certificateGrantingDate" name='certificateGrantingDate' placeholder={'سنة/شهر/يوم'}
                                                onFocus={handleFocus}
                                                onChange={handleInputChange}
                                                translate="no"
                                                lang="en" />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="issuedFrom" name='issuedFrom' placeholder="صادرة من" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="city" name='city' placeholder="المدينة" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <label htmlFor="name">
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select required id="isStudying" name="isStudying" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                }}>
                                                <option>هل تدرس الان</option>
                                                <option value={1}>نعم</option>
                                                <option value={2}>لا</option>
                                            </select>
                                        </FormGroup>
                                        {formData.isStudying === 1 ?
                                            <>
                                                <FormGroup className="col-lg-6 col-md-12">
                                                    <Input type="text" className="form-control" id="certificateType" name='certificateType' placeholder="التخصص" onChange={handleInputChange} />
                                                </FormGroup>
                                                <FormGroup className="col-lg-6 col-md-12">
                                                    <select id="studyYearId" name="studyYearId" className="form-control"
                                                        onChange={(e) => {
                                                            handleInputChange(e);
                                                        }}>
                                                        <option>السنة الدراسية</option>
                                                        {StudyYears.map((item, index) => (
                                                            <option key={index} value={item.studyYearId}>{item.studyYearName}</option>
                                                        ))}
                                                    </select>
                                                </FormGroup>
                                                <FormGroup className="col-lg-6 col-md-12">
                                                    <Input type="text" className="form-control" id="univercityName" name='univercityName' placeholder="الجامعة" onChange={handleInputChange} />
                                                </FormGroup>
                                            </>
                                            :
                                            <></>
                                        }
                                        <h6>معلومات التخصصية</h6>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="number" className="form-control" id="memorizedPartsNo" name='memorizedPartsNo' placeholder="عدد الأجزاء المحفوظة" value={formData.memorizedPartsNo} onChange={handleInputChange} min="0" max="30" lang='en' />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="number" className="form-control" id="masteredMemorizedPartsNo" name='masteredMemorizedPartsNo' placeholder="عدد الأجزاء المتقنة" value={formData.masteredMemorizedPartsNo} onChange={handleInputChange} min="0" max="30" lang='en' />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <select
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addTeacher();
                                                    }
                                                }}
                                                id="isCertified" name="isCertified" className="form-control"
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    setselectisCertified(e.target.value);
                                                }}>
                                                <option>هل يوجد لديك اجازة</option>
                                                <option value={1}>نعم</option>
                                                <option value={2}>لا</option>
                                                <option value={3}>القراءات العشر</option>
                                            </select>
                                        </FormGroup>

                                        {selectisCertified == 1 ?
                                            <>
                                                <h6>معلومات الاجازة</h6><hr></hr>
                                                {RecitationsWithNarrations.map((option) => (
                                                    <div className='row' key={option.recitationId}>
                                                        <h4 >{option.recitationName}</h4>
                                                        {option.narrations.map((narration) => {
                                                            const isChecked = selectedOptions.some(
                                                                (selected) =>
                                                                    selected.recitationId === option.recitationId &&
                                                                    selected.narrationId === narration.narrationId
                                                            );
                                                            return (
                                                                <React.Fragment key={narration.narrationId}>
                                                                    <FormGroup className="col-4" style={{ textAlign: 'center' }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={isChecked}
                                                                                    onChange={() =>
                                                                                        handleChange(option.recitationId, narration.narrationId, authorizerName, certificationDate)
                                                                                    }
                                                                                />
                                                                            }
                                                                            label={narration.narrationName}
                                                                        />
                                                                    </FormGroup>
                                                                    <FormGroup className="col-lg-4 col-md-12">
                                                                        <Label htmlFor="authorizerName">الشيخ المجيز</Label>
                                                                        <Input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="authorizerName"
                                                                            name="authorizerName"
                                                                            placeholder="المجيز"
                                                                            onChange={(e) => handleInputChange1(e, 'authorizerName', option.recitationId, narration.narrationId)}
                                                                            disabled={!isChecked}
                                                                        />
                                                                    </FormGroup>
                                                                    <FormGroup className="col-lg-4 col-md-12">
                                                                        <Label htmlFor="certificationDate">تاريخ الحصول عليها</Label>
                                                                        <Input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="certificationDate"
                                                                            name="certificationDate"
                                                                            placeholder={'سنة/شهر/يوم'}
                                                                            onFocus={handleFocus}
                                                                            translate="no"
                                                                            lang="en"
                                                                            onChange={(e) => handleInputChange1(e, 'certificationDate', option.recitationId, narration.narrationId)}
                                                                            disabled={!isChecked}
                                                                        />
                                                                    </FormGroup>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </>
                                            :
                                            (selectisCertified == 3 ?
                                                <>
                                                    <h6>معلومات الاجازة</h6><hr></hr>
                                                    <FormGroup className="col-lg-4 col-md-12">
                                                        <Label htmlFor="authorizerName">الشيخ المجيز</Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="authorizerName"
                                                            name="authorizerName"
                                                            placeholder="المجيز"

                                                            onChange={(e) => handleInputChangeall(e)}
                                                        />

                                                    </FormGroup>
                                                    <FormGroup className="col-lg-4 col-md-12">
                                                        <Label htmlFor="certıfıcatıonDate">تاريخ الحصول عليها</Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="certıfıcatıonDate"
                                                            name="certıfıcatıonDate"
                                                            placeholder={'سنة/شهر/يوم'}
                                                            onFocus={handleFocus}
                                                            translate="no"
                                                            lang="en"
                                                            onChange={(e) => handleInputChangeall(e)}
                                                        />
                                                    </FormGroup>
                                                </>
                                                :
                                                <></>
                                            )
                                        }
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addTeacher}>حفظ</Button>
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
