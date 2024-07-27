/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaArrowLeft, FaArrowRight, FaPencil, FaPersonCirclePlus } from "react-icons/fa6";
import Demo from '../../components/sections/Demo';
import ModalCreate from './ModalCreate';
import Api from '../../Auth/tools/api';
import ModalEdite from './ModalEdite';

const Governate = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState({
        governateId: 2,
        governateIname:'hgjf'
    });
    const [Governates, setGovernates] = useState([]);

    useEffect(() => {
        getGovernates();
    }, []);

    const getGovernates = async () => {
        try {
            const response = await Api.fetch({ url: 'Governates/getGovernates' });
            if (response) {
                console.log(response);
                setGovernates(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (params) => {
        console.log(params.row);
        setItem(params.row);
        setModalEditeShow(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'governateIname', headerName: 'اسم المحافظة', width: 230 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params)} />
            )
        }
    ];

    const rows = Governates.map((Governate, index) => ({
        id: index + 1,
        governateIname: Governate?.governateIname ?? 'No Name',
        action: {} 
    }));

    return (
        <div className='mine-card-body'>
            <div className='heder-dach-admin-p'>
                <div className='heder-dach-admin'>
                    <div>
                        {/* <ButtonGroup className="m-2" dir='rtl'>
                            <UncontrolledDropdown setActiveFromChild>
                                <DropdownToggle tag="button" className="btn btn-secondary dorp-moh" caret>
                                    جميع الجهات
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag="p">ادلب</DropdownItem>
                                    <DropdownItem tag="p">اريحا</DropdownItem>
                                    <DropdownItem tag="p">سرمدا</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ButtonGroup> */}
                    </div>
                    <div>
                        {/* <input type='text' placeholder='بحث' /> */}
                    </div>
                </div>
                <Button className='buttom-add' onClick={() => setModalShow(true)}>
                    إضافة محافطة     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getGovernates()}
                />
            </div>
            <Demo row={rows} columns={columns} name={'المحافظات'} />
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getGovernates()}
                itemid={item} 
            />
        </div>
    );
};

export default Governate;
