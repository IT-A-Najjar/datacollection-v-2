/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaArrowLeft, FaArrowRight, FaPencil, FaPersonCirclePlus } from "react-icons/fa6";
import Demo from '../../components/sections/Demo';
import ModalCreate from './ModalCreate';
import Api from '../../Auth/tools/api';
import ModalEdite from './ModalEdite';

const Center = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState([]);
    const [Centers, setCenters] = useState([]);

    useEffect(() => {
        getCenters();
    }, []);

    const getCenters = async () => {
        try {
            const response = await Api.fetch({ url: 'Centers/getCenters' });
            if (response) {
                console.log(response);
                setCenters(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (params) => {
        // console.log(params.row);
        setItem(params);
        setModalEditeShow(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'governateName', headerName: 'اسم المحافظة', width: 180 },
        { field: 'directorateName', headerName: 'اسم المديرية', width: 180 },
        { field: 'organizationName', headerName: 'اسم الجهات', width: 180 },
        { field: 'centerName', headerName: 'اسم المركز', width: 180 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.item)} />
            )
        }
    ];

    const rows = Centers.map((Center, index) => ({
        id: index + 1,
        governateName: Center?.governateName ?? 'No Name',
        directorateName: Center?.directorateName ?? 'No Name',
        organizationName: Center?.organizationName ?? 'No Name',
        centerName: Center?.centerName ?? 'No Name',
        item: Center,
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
                    إضافة مركز     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getCenters()}
                />
            </div>
            <Demo row={rows} columns={columns} name={'المراكز'} />
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getCenters()}
                itemid={item} 
            />
        </div>
    );
};

export default Center;
