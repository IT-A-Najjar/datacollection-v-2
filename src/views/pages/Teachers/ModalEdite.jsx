import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';
import { Checkbox, FormControlLabel } from '@mui/material';

const ModalEdite = (props) => {
    const [authorizerName, setAuthorizerName] = useState('');
    const [certificationDate, setCertificationDate] = useState('');
    const [Genders, setGenders] = useState([])
    const [MaritalSatuses, setMaritalSatuses] = useState([])
    const [HealthStatus, setHealthStatus] = useState([])
    const [EducationalLevels, setEducationalLevels] = useState([])
    const [StudyYears, setStudyYears] = useState([])
    const [Recitations, setRecitations] = useState([])
    const [RolesDescriptions, setRolesDescriptions] = useState([])
    const [selectRecitations, setselectRecitations] = useState(0)
    const [Narrations, setNarrations] = useState([])
    const [RecitationsWithNarrations, setRecitationsWithNarrations] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [delet, setdelet] = useState(0);
    const [allNarrations, setallNarrations] = useState([]);
    const [selectisCertified, setselectisCertified] = useState(0);
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props.itemid);
        setFormData(props.itemid);
        setallNarrations({
            supervisorOrTeacherId: props.itemid.supervisorOrTeacherId,
        });
        setselectisCertified(props.itemid.isCertified);
        setSelectedOptions(props.itemid.teachersRecitationsNarrations);
    }, [props.itemid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['isCertified', 'isStudying'];
        let newValue = numericFields.includes(name) ? Number(value) : value;

        if (name === 'isCertified' && newValue > 2) {
            newValue = 1;
        }
        if (name === 'isCertified' && newValue == 2) {
            setSelectedOptions([]);
            setdelet(props.itemid.supervisorOrTeacherId);
        }


        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleFocus = (e) => {
        e.target.type = 'date';
    };
    const handleChange = (recitationId, narrationId, authorizerName, certificationDate, supervisorOrTeacherId) => {
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
                    { supervisorOrTeacherId, recitationId, narrationId, authorizerName, certificationDate }
                ];
            }
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
        } else if (field === 'certıfıcatıonDate') {
            setCertificationDate(value);
            setSelectedOptions((prevSelected) =>
                prevSelected.map((option) =>
                    option.recitationId === recitationId && option.narrationId === narrationId
                        ? { ...option, certıfıcatıonDate: value }
                        : option
                )
            );
        }
    };
    const handleInputChangeall = (e) => {
        const { name, value } = e.target;
        setallNarrations({
            ...allNarrations,
            [name]: value
        });
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
                console.log(response);
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
                console.log(response);
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
                // console.log(response);
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
                // console.log(response);
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
                // console.log(response);
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
                // console.log(response);
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
    const editData = async () => {
        console.log(formData);
        console.log(selectisCertified);
        try {
            const response = await Api.fetch({
                url: `SupervisorsAndTeachers/editSupervisorsAndTeacher?id=${formData.supervisorOrTeacherId}`,
                body: formData,
                method: 'PUT',
            });
            console.log(response);
            if (response.ok) {
                if (selectisCertified == 3) {
                    console.log(allNarrations);
                    const response = await Api.fetch({
                        url: `TeachersRecitationsNarrations/editTeinRecitationsNarration?supervisorOrTeacherId=${allNarrations.supervisorOrTeacherId}&authorizerName=${allNarrations.authorizerName}&certificationDate=${allNarrations.certıfıcatıonDate}`,
                        method: 'POST',
                    });
                    //console.log(response);
                    if (response.ok) {
                        toast.success("تم تعديل الاجازة بنجاح");
                    } else {
                        const errorBody = await response.json();
                        console.error('Request failed:', errorBody.title);
                    }
                } else {
                    console.log(selectedOptions);
                    console.log(delet);
                    const response = await Api.fetch({
                        url: `TeachersRecitationsNarrations/editTeachersRecitationsNarrations?superId=${delet}`,
                        body: selectedOptions,
                        method: 'POST',
                    });
                    //console.log(response);
                    if (response.ok) {
                        toast.success("تم تعديل الروايات بنجاح");
                        setdelet(0);
                    } else {
                        const errorBody = await response.json();
                        console.error('Request failed:', errorBody.title);
                    }
                }
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
                    <div><Container>
                        <Row>
                            <Col md="12">
                                <Form className="row" style={{ justifyContent: 'center' }}>
                                    <h6>معلومات الشحصية</h6>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="name">اسم المعلم</Label>
                                        <Input type="text" className="form-control" id="name" name='name' value={formData.name} placeholder="اسم المعلم" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="genderId">الجنس</Label>
                                        <select id="genderId" name="genderId" className="form-control" value={formData.genderId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>اختر الجنس</option>
                                            {Genders.map((item, index) => (
                                                <option key={index} value={item.genderId}>{item.genderName}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="fatherName">اسم الاب</Label>
                                        <Input type="text" className="form-control" id="fatherName" name='fatherName' value={formData.fatherName} placeholder="اسم الاب" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="motherName">اسم الام</Label>
                                        <Input type="text" className="form-control" id="motherName" name='motherName' value={formData.motherName} placeholder="اسم الام" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="nickname">الكنية</Label>
                                        <Input type="text" className="form-control" id="nickname" name='nickname' value={formData.nickname} placeholder="الكنيه" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="birthPlace">مكان الولادة</Label>
                                        <Input type="text" className="form-control" id="birthPlace" name='birthPlace' value={formData.birthPlace} placeholder="مكان الولادة" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                                        <Input type="text" className="form-control" id="birthDate" name='birthDate' value={formData.birthDate} placeholder={'سنة/شهر/يوم'}
                                            onFocus={handleFocus}
                                            onChange={handleInputChange}
                                            translate="no"
                                            lang="en" />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="homeland">البلاد الأصلي</Label>
                                        <Input type="text" className="form-control" id="homeland" name='homeland' value={formData.homeland} placeholder="البلد الأصلي" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="contactNo">رقم التواصل</Label>
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input type="text" className="form-control" id="contactNo" name='contactNo' value={formData.contactNo} placeholder="رقم التواصل" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="currentResidence">السكن الحالي</Label>
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input type="text" className="form-control" id="currentResidence" name='currentResidence' value={formData.currentResidence} placeholder="السكن الحالي" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="maritalSatusId">الحالة الاجتماعية</Label>
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="maritalSatusId" name="maritalSatusId" className="form-control" value={formData.maritalSatusId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>الحالة الاحتماعية</option>
                                            {MaritalSatuses.map((item, index) => (
                                                <option key={index} value={item.maritalSatusId}>{formData.genderId == 1 ? item.maritalSatusNameM : item.maritalSatusNameF}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="wivesNo">عدد الزوجات</Label>
                                        <Input type="number" className="form-control" id="wivesNo" name='wivesNo' value={formData.wivesNo} placeholder="عدد الزوجات" onChange={handleInputChange} disabled={formData.genderId == 2 || formData.maritalSatusId == 1} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="childrenNo">عدد الاولاد</Label>
                                        <Input disabled={formData.maritalSatusId == 1} type="number" className="form-control" id="childrenNo" name='childrenNo' value={formData.childrenNo} placeholder="عدد الأولاد" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="healthStatusId">الحالة الصحية</Label>
                                        <select id="healthStatusId" name="healthStatusId" className="form-control" value={formData.healthStatusId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>الحالة الصحية</option>
                                            {HealthStatus.map((item, index) => (
                                                <option key={index} value={item.healthStatusId}>{item.healthStatusName}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="diseaseType">المرض</Label>
                                        <Input disabled={formData.healthStatusId == 1} type="text" className="form-control" id="diseaseType" name='diseaseType' value={formData.diseaseType} placeholder="المرض" onChange={handleInputChange} />
                                    </FormGroup>
                                    <h6>معلومات الدراسية</h6>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="educationalLevelId">التحصيل العلمي</Label>
                                        <select id="educationalLevelId" name="educationalLevelId" className="form-control" value={formData.educationalLevelId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>التحصيل العلمي</option>
                                            {EducationalLevels.map((item, index) => (
                                                <option key={index} value={item.educationalLevelId}>{item.educationalLevelName}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="certificateGrantingDate">تاريخ الحصول على الشهادة</Label>
                                        <Input type="text" className="form-control" id="certificateGrantingDate" value={formData.certificateGrantingDate} name='certificateGrantingDate' placeholder={'سنة/شهر/يوم'}
                                            onFocus={handleFocus}
                                            onChange={handleInputChange}
                                            translate="no"
                                            lang="en" />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="issuedFrom">صادرة من</Label>
                                        <Input type="text" className="form-control" id="issuedFrom" name='issuedFrom' value={formData.issuedFrom} placeholder="صادرة من" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="city">المدينة</Label>
                                        <Input type="text" className="form-control" id="city" name='city' value={formData.city} placeholder="المدينة" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <label htmlFor="name">
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Label htmlFor="isStudying">هل تدرس الان</Label>
                                        <select id="isStudying" name="isStudying" className="form-control" value={formData.isStudying}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>هل تدرس الان</option>
                                            <option value={1}>نعم</option>
                                            <option value={2}>لا</option>
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="certificateType">التخصص</Label>
                                        <Input type="text" className="form-control" id="certificateType" name='certificateType' value={formData.certificateType} placeholder="التخصص" onChange={handleInputChange} />
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="studyYearId">السنة الدراسية</Label>
                                        <select id="studyYearId" name="studyYearId" className="form-control" value={formData.studyYearId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>السنة الدراسية</option>
                                            {StudyYears.map((item, index) => (
                                                <option key={index} value={item.studyYearId}>{item.studyYearName}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="col-lg-4 col-md-6 col-sm-12">
                                        <Label htmlFor="univercityName">الجامعة</Label>
                                        <Input type="text" className="form-control" id="univercityName" name='univercityName' value={formData.univercityName} placeholder="الجامعة" onChange={handleInputChange} />
                                    </FormGroup>
                                    <h6>معلومات التخصصية</h6>
                                    <FormGroup className="col-lg-6 col-md-12">
                                        <Label htmlFor="memorizedPartsNo">الاجزاء المحفوظة</Label>
                                        <Input type="number" className="form-control" id="memorizedPartsNo" name='memorizedPartsNo' value={formData.memorizedPartsNo} placeholder="عدد الأجزاء المحفوظة" onChange={handleInputChange} min="0" max="30" lang='en' />
                                    </FormGroup>
                                    <FormGroup className="col-lg-6 col-md-12">
                                        <Label htmlFor="masteredMemorizedPartsNo">عدد الاجزاء المتقنة</Label>
                                        <Input type="number" className="form-control" id="masteredMemorizedPartsNo" name='masteredMemorizedPartsNo' value={formData.masteredMemorizedPartsNo} placeholder="عدد الأجزاء المتقنة" onChange={handleInputChange} min="0" max="30" lang='en' />
                                    </FormGroup>
                                    <FormGroup className="col-lg-6 col-md-12">
                                        <Label htmlFor="isCertified">هل تملك اجازة</Label>
                                        <select id="isCertified" name="isCertified" className="form-control" value={selectisCertified}
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
                                    {/* <FormGroup className="col-lg-6 col-md-12">
                                        <Label htmlFor="teacherRoleId">الصلاحيات</Label>
                                        <select id="teacherRoleId" name="teacherRoleId" className="form-control" value={formData.teacherRoleId}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}>
                                            <option>الصلاحية</option>
                                            {RolesDescriptions.map((item, index) => (
                                                <option key={index} value={item.teacherRoleId}>{item.teacherRoleDescription}</option>
                                            ))}
                                        </select>
                                    </FormGroup> */}

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
                                                                                    handleChange(option.recitationId, narration.narrationId, authorizerName, certificationDate, formData.supervisorOrTeacherId)
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
                                                                        value={
                                                                            selectedOptions.find((item) =>
                                                                                item.recitationId === option.recitationId && item.narrationId === narration.narrationId
                                                                            )?.authorizerName || ''
                                                                        }
                                                                        onChange={(e) => handleInputChange1(e, 'authorizerName', option.recitationId, narration.narrationId)}
                                                                        disabled={!isChecked}
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
                                                                        value={
                                                                            selectedOptions.find((item) =>
                                                                                item.recitationId === option.recitationId && item.narrationId === narration.narrationId
                                                                            )?.certıfıcatıonDate || ''
                                                                        }
                                                                        onChange={(e) => handleInputChange1(e, 'certıfıcatıonDate', option.recitationId, narration.narrationId)}
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
                                        <Button className="btn btn-success waves-effect waves-light" onClick={editData}>حفظ</Button>
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
