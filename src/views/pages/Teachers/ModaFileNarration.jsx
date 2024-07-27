import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'reactstrap';
import Modal from '../../../components/Modal';
import icon from '../../../assets/images/uploudfile.svg';
import toast from 'react-hot-toast';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormGroup } from '@mui/material';
import img from "../../../assets/images/Basmallah.jpg"
const ModaFileNarration = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const inputRef = React.useRef(null);
    const organizationId = localStorage.getItem('organizationId');
    const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    useEffect(() => {
        if (props.itemid && props.itemid.teachersRecitationsNarrations) {
            setData(props.itemid.teachersRecitationsNarrations);
        }
    }, [props.itemid]);
    const img = (recitationId, narrationId) => {
        try {
            return require(`../../../assets/images/Narration/${recitationId}${narrationId}.jpg`);
        } catch (e) {
            console.error("Image not found:", e);
            return 'path/to/placeholder/image.jpg'; // Optional: a placeholder image
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
                    `https://datacollection.quraniccompetition.com/UploadExcelFileTeachersRecitationsNarration?supervisorOrTeacherId=${props.itemid.supervisorOrTeacherId}`,
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
                <Modal onClose={props.onHide} title={'الروايات'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {data.map((item, index) => (
                                            <FormGroup key={index} className="col-lg-4 col-md-6 col-sx-12" style={{ padding: 0.5 + 'rem' ,minWidth: 250+'px'}}>
                                                <Card sx={{ maxWidth: 100 + '%' }}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={img(item.recitationId, item.narrationId)}
                                                            alt="green iguana"
                                                        />
                                                        <CardContent>
                                                            <p gutterBottom variant="h5" component="div" >
                                                                <span style={{ color: '#0F6037', fontWeight: 600 }}>رواية:</span> {item.narrationName}
                                                            </p>
                                                            <p variant="body2" color="text.secondary">
                                                                <span style={{ color: '#0F6037', fontWeight: 600 }}>قراءة:</span> {item.recitationName}
                                                            </p>
                                                        </CardContent>
                                                        <CardContent>
                                                            <p gutterBottom variant="h5" component="div">
                                                                <span style={{ color: '#0F6037', fontWeight: 600 }}>الشيخ المجيز:</span> {item.authorizerName}
                                                            </p>
                                                            <p variant="body2" color="text.secondary">
                                                                <span style={{ color: '#0F6037', fontWeight: 600 }}>تاريح المنح:</span> {item.certıfıcatıonDate}
                                                            </p>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </FormGroup>
                                        ))}
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

export default ModaFileNarration;
