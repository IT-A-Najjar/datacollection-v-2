/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaArrowLeft, FaArrowRight, FaPencil, FaPersonCirclePlus } from "react-icons/fa6";
import Demo from '../../components/sections/Demo';
import ModalCreate from './ModalCreate';
import Api from '../../Auth/tools/api';
import ModalEdite from './ModalEdite';

const Mosque = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState([]);
    const [Mosques, setMosques] = useState([]);

    useEffect(() => {
        getMosques();
    }, []);

    const getMosques = async () => {
        try {
            const response = await Api.fetch({ url: 'Mosques/getMosques' });
            if (response) {
                console.log(response);
                setMosques(response);
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
        { field: 'regionName', headerName: 'اسم المنطقة', width: 180 },
        { field: 'townName', headerName: 'اسم البلدة', width: 180 },
        { field: 'mosqueName', headerName: 'اسم المسجد', width: 180 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.item)} />
            )
        }
    ];

    const rows = Mosques.map((Mosque, index) => ({
        id: index + 1,
        governateName: Mosque?.dovernateName ?? 'No Name',
        directorateName: Mosque?.directorateName ?? 'No Name',
        regionName: Mosque?.regionName ?? 'No Name',
        townName: Mosque?.townName ?? 'No Name',
        mosqueName: Mosque?.mosqueName ?? 'No Name',
        item: Mosque,
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
                    إضافة مسجد     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getMosques()}
                />
            </div>
            <Demo row={rows} columns={columns}  name={'المساجد'}/>
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getMosques()}
                itemid={item} 
            />
        </div>
    );
};

export default Mosque;
