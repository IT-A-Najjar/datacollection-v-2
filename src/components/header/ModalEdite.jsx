import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../Modal'
import toast from 'react-hot-toast';
import Api from '../../views/Auth/tools/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ModalEdite = (props) => {
    const [Organization, setOrganization] = useState([]);
    const [formData, setFormData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };


    useEffect(() => {
        getOrganization();
        setFormData(
            {
                userName: localStorage.getItem('userName'),
                userId: localStorage.getItem('userId'),
                oldpassword: null,
                newpassword: null,
                confpassword: null,
                supervisorName: localStorage.getItem('supervisorName'),
                userRoleId: localStorage.getItem('role'),  
                organizationId: localStorage.getItem('organizationId'),
            }
        )
    }, [props.itemid]);
    const getOrganization = async () => {
        try {
            const response = await Api.fetch({ url: 'Organizations/getOrganizations' });
            if (response) {
                // console.log(response);
                setOrganization(response);
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
    const editeData = async () => {
        console.log( `Auth/reset-password?oldPass=${formData.oldpassword}&newPass=${formData.newpassword}&confPass=${formData.confpassword}&userId=${formData.userId}`);
        try {
            const response = await Api.fetch({
                url: `Auth/reset-password?oldPass=${formData.oldpassword}&newPass=${formData.newpassword}&confPass=${formData.confpassword}&userId=${formData.userId}`,
                method: 'POST',
            });

            if (response.ok) {
                toast.success("تمت التعديل بنجاح");
                localStorage.setItem('supervisorName', formData.supervisorName);
                props.onHide();
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
            {props.show && localStorage.getItem('userId') && (
                <Modal onClose={props.onHide} title={'تعديل بيانات المشرف'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="number" className="form-control" id="userId" name='userId' placeholder="رقم المشرف" value={formData.organizationId} onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="supervisorName" name='supervisorName' placeholder="الاسم الكامل" value={formData.supervisorName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input disabled={true} type="text" className="form-control" id="userName" name='userName' placeholder="اسم المستخدم" value={formData.userName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12" style={{display: 'flex', alignItems: 'center'}}>
                                            <Input
                                            
                                                className="form-control"
                                                id="oldpassword"
                                                name='oldpassword'
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="كلمة المرور القديمة"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        editeData();
                                                    }
                                                }}
                                                inputMode="numeric"
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                onClick={togglePasswordVisibility}
                                                className="password-toggle-icon"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12" style={{display: 'flex', alignItems: 'center'}}>
                                            <Input
                                            
                                                className="form-control"
                                                id="newpassword"
                                                name='newpassword'
                                                value={formData.newpassword}
                                                onChange={handleInputChange}
                                                type={showPassword1 ? "text" : "password"}
                                                placeholder="كلمة المرور الجديدة"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        editeData();
                                                    }
                                                }}
                                                inputMode="numeric"
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword1 ? faEyeSlash : faEye}
                                                onClick={togglePasswordVisibility1}
                                                className="password-toggle-icon"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12" style={{display: 'flex', alignItems: 'center'}}>
                                            <Input
                                            
                                                className="form-control"
                                                id="confpassword"
                                                name='confpassword'
                                                value={formData.confpassword}
                                                onChange={handleInputChange}
                                                type={showPassword2 ? "text" : "password"}
                                                placeholder=" اعادة كلمة المرور"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        editeData();
                                                    }
                                                }}
                                                inputMode="numeric"
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword2 ? faEyeSlash : faEye}
                                                onClick={togglePasswordVisibility2}
                                                className="password-toggle-icon"
                                            />
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
