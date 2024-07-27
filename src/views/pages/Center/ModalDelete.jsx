import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from '../../../components/Modal'
import Api from '../../../tools/api';
import toast from 'react-hot-toast';

const ModalDelete = (props) => {
    const deleteitem = async () => {
        console.log(props.itemid);
        try {
            const response = await Api.fetch({
                url: `Centers/deleteCenter?directorateId=${props.itemid.DirectorateID}&centerId=${props.itemid.CenterID}`,
                method : 'DELETE'
            });
            console.log(response);
            if (response) {
                toast.error("تمت الحذف بنجاح");
                props.onHide();
                props.onUpdat();
            } else {
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
                <Modal onClose={props.onHide} title={'فورم الحذف'}>
                    <div>
                        <Container>
                            <h1 className="title font-bold">حذف المركز: {props.itemid.CenterName}</h1>
                        </Container>
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10" onClick={deleteitem}>حذف</Button>
                                    <Button type="submit" className="btn btn-inverse waves-effect waves-light" onClick={props.onHide}>الغاء</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default ModalDelete;
