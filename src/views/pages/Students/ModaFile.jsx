import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, FormGroup } from 'reactstrap';
import Modal from '../../../components/Modal';
import icon from '../../../assets/images/uploudfile.svg';
import toast from 'react-hot-toast';
import axios from 'axios';
import Api from '../../Auth/tools/api';

const ModaFile = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [Governate, setGovernate] = useState([])
    const [selectGovernate, setselectGovernate] = useState(0)
    const [Directorate, setDirectorate] = useState([])
    const [selectDirectorate, setselectDirectorate] = useState(0)
    const [Regions, setRegions] = useState([])
    const [selectRegions, setselectRegions] = useState(0)
    const [Towns, setTowns] = useState([])
    const [selectTowns, setselectTowns] = useState(0)
    const [selectCenters, setselectCenters] = useState(0)
    const [Institutes, setInstitutes] = useState([])
    const [selectInstitutes, setselectInstitutes] = useState(0)
    const [quraanicClassId, setquraanicClassId] = useState([])
    const [selectquraanicClassId, setselectquraanicClassId] = useState([])
    const inputRef = React.useRef(null);
    const organizationId = localStorage.getItem('organizationId');
    const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    useEffect(() => {
        getGovernate();
    }, []);
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
    useEffect(() => {
        getDirectorate();
        getRegions();
        getTowns();
        getInstitutes();
        getquraanicClassId();
    }, [selectGovernate, selectDirectorate, selectTowns, selectRegions,selectCenters ,selectInstitutes]);
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
    const getquraanicClassId = async () => {
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && allowedFileTypes.includes(file.type)) {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            toast.error('الرجاء تحميل ملف Excel فقط.')
        }
    };

    const handleDrag = (e) => {

        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file && allowedFileTypes.includes(file.type)) {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            toast.error('الرجاء تحميل ملف Excel فقط.')
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const response = await axios.post(
                    `https://datacollection.quraniccompetition.com/UploadExcelFileStudents?organizationId=${organizationId}&governateId=${selectGovernate}&directorateId=${selectDirectorate}&regionId=${selectRegions}&townId=${selectTowns}&centerId=0&instituteId=${selectInstitutes}&quraanicClassId=${selectquraanicClassId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
                toast.success(response.data.message);
                if(response.data.error){
                    toast.error(response.data.error);
                }
                setSelectedFile([]);
                props.onHide();
                props.onUpdat();
            } catch (error) {
                toast.error(error.response.data);
            }
        } else {
            toast.error('لم يتم تحديد أي ملف');
        }
    };


    return (
        <>
            {props.show && (
                <Modal onClose={props.onHide} title={'رفع ملف الطلاب'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <h6>المعلومات الأساسية</h6>
                                        <hr />
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="governateId" name="governateId" className="form-control" value={selectGovernate}
                                                onChange={(e) => {
                                                    setselectGovernate(e.target.value);
                                                }}>
                                                <option>اختر المحافظة</option>
                                                {Governate.map((item, index) => (
                                                    <option key={index} value={item.governateId}>{item.governateIname}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="directorateId" name="directorateId" className="form-control" value={selectDirectorate}
                                                onChange={(e) => {
                                                    setselectDirectorate(e.target.value);
                                                }}>
                                                <option>اختر المديرية</option>
                                                {Directorate.map((item, index) => (
                                                    <option key={index} value={item.directorateId}>{item.directorateName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="regionId" name="regionId" className="form-control" value={selectRegions}
                                                onChange={(e) => {
                                                    setselectRegions(e.target.value);
                                                }}>
                                                <option>اختر المنطقة</option>
                                                {Regions.map((item, index) => (
                                                    <option key={index} value={item.regionId}>{item.regionName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="townId" name="townId" className="form-control" value={selectTowns}
                                                onChange={(e) => {
                                                    setselectTowns(e.target.value);
                                                }}>
                                                <option>اختر البلدة</option>
                                                {Towns.map((item, index) => (
                                                    <option key={index} value={item.townId}>{item.townName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="instituteId" name="instituteId" className="form-control" value={selectInstitutes}
                                                onChange={(e) => {
                                                    setselectInstitutes(e.target.value);
                                                }}>
                                                <option>اختر المجمع</option>
                                                {Institutes.map((item, index) => (
                                                    <option key={index} value={item.instituteId}>{item.instituteName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-4 col-md-6">
                                            <select id="quraanicClassId" name="quraanicClassId" className="form-control" value={selectquraanicClassId}
                                                onChange={(e) => {
                                                    setselectquraanicClassId(e.target.value);
                                                }}>
                                                <option>اختر الحلقة</option>
                                                {quraanicClassId.map((item, index) => (
                                                    <option key={index} value={item.quraanicClassID}>{item.quraanicClassName} - {item.genderName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <div className="body-dash-mangment" dir="rtl">
                                            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                                                <input ref={inputRef} type="file" id="input-file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                                                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "label-uploud drag-active" : "label-uploud"}>
                                                    <div>
                                                        <h3>رفع نموذج Excel</h3>
                                                        <p>قم بسحب وإسقاط الملف هنا</p>
                                                        <img className="img-uploud" src={icon} />
                                                        {selectedFile ? (
                                                            <div>
                                                                <p>الملف المحدد: {selectedFile.name}</p>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <br />
                                                        <Button className="btn btn-outline-success" variant="primary" onClick={handleUpload}>
                                                            رفع البيانات
                                                        </Button>
                                                    </div>
                                                </label>

                                                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                                            </form>
                                        </div>
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

export default ModaFile;
