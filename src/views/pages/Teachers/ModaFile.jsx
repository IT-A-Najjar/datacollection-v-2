import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'reactstrap';
import Modal from '../../../components/Modal';
import icon from '../../../assets/images/uploudfile.svg';
import toast from 'react-hot-toast';
import axios from 'axios';

const ModaFile = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const inputRef = React.useRef(null);
    const organizationId = localStorage.getItem('organizationId');
    const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && allowedFileTypes.includes(file.type)) {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            toast.error('الرجاء تحميل ملف المخصص لهذا القسم')
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
                    `https://datacollection.quraniccompetition.com/UploadExcelFileTeachers?organizationId=${organizationId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
                toast.success(response.data);
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
                <Modal onClose={props.onHide} title={'رفع الملف'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
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
