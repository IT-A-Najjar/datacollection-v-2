import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

const ModalCreate = (props) => {
    const [Organization, setOrganization] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: null,
        userId: 0,
        password: null,
        supervisorName: "",
        userRoleId: 1,
        organizationId: 0
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        getOrganization();
    }, []);

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
    const addSupervisors = async () => {
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: 'Users/addUser',
                body: formData,
                method: 'POST',
            });
            console.log(response);
            if (response.ok) {
                toast.success("تمت الاضافة بنجاح");
                props.onHide();
                props.onUpdat();
            } else {
                toast.error("حدث خطا ما");
                const errorBody = await response.json();
                console.error('Request failed:', errorBody.title);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {props.show && (
                <Modal onClose={props.onHide} title={'اضافة مشرف'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="supervisorName" name='supervisorName' placeholder="الاسم الثلاثي" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="userName" name='userName' placeholder="اسم المستخدم" onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12" style={{display: 'flex', alignItems: 'center'}}>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                name='password'
                                                placeholder="كلمة السر"
                                                onChange={handleInputChange}
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                onClick={togglePasswordVisibility}
                                                className="password-toggle-icon"
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addSupervisors();
                                                    }
                                                }}
                                                id="organizationId" name="organizationId" className="form-control" onChange={handleInputChange}>
                                                <option>اختر الجهة</option>
                                                {Organization.map((item, index) => (
                                                    <option key={index} value={item.organizationId}>{item.organizationName}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        <FormGroup className="col-lg-8 col-md-8">
                                            <Button className="btn btn-success waves-effect waves-light" onClick={addSupervisors}>حفظ</Button>
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
