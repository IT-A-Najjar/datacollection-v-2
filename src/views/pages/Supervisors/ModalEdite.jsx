import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast';
import Api from '../../Auth/tools/api';

const ModalEdite = (props) => {
    const [Organization, setOrganization] = useState([]);
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        console.log(props.itemid);
        getOrganization();
        setFormData(
            {
                userName: props.itemid.userName,
                userId: props.itemid.id,
                password: props.itemid.password,
                supervisorName: props.itemid.supervisorName,
                userRoleId: 1,
                organizationId: props.itemid.organizationId,
                token: null,
                organization: null,
                userRole: null
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
        console.log(formData);
        try {
            const response = await Api.fetch({
                url: `Users/editUser?id=${formData.userId}`,
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
                <Modal onClose={props.onHide} title={'تعديل المشرف'}>
                    <div>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row" style={{ justifyContent: 'center' }}>
                                        {/* <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="number" className="form-control" id="userId" name='userId' placeholder="رقم المشرف" value={formData.organizationId} onChange={handleInputChange} />
                                        </FormGroup> */}
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="text" className="form-control" id="supervisorName" name='supervisorName' placeholder="الاسم الثلاثي" value={formData.supervisorName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input disabled={true} type="text" className="form-control" id="userName" name='userName' placeholder="اسم المستخدم" value={formData.userName} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-12">
                                            <Input type="password" className="form-control" id="password" name='password' placeholder="كلمة السر" value={formData.password} onChange={handleInputChange} />
                                        </FormGroup>
                                        <FormGroup className="col-lg-6 col-md-6">
                                            <select
                                             onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    editeData();
                                                }
                                            }}
                                             disabled={true} id="organizationId" name="organizationId" className="form-control" value={formData.organizationId} onChange={handleInputChange}>
                                                <option>اختر الجهة</option>
                                                {Organization.map((item, index) => (
                                                    <option key={index} value={item.organizationId}>{item.organizationName}</option>
                                                ))}
                                            </select>
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
