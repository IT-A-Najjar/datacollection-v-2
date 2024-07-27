/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaArrowLeft, FaArrowRight, FaPencil, FaPersonCirclePlus } from "react-icons/fa6";
import Demo from '../../components/sections/Demo';
import ModalCreate from './ModalCreate';
import Api from '../../Auth/tools/api';
import ModalEdite from './ModalEdite';

const Town = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState({
        governateId: 1,
        governateName: "إدلب",
        regionId: 1,
        regionName: "اريحا",
        directorateID: 1,
        directorateName: "إدلب",
        townId: 1,
        townName: "اريحا"
    });
    const [Towns, setTowns] = useState([]);

    useEffect(() => {
        getTowns();
    }, []);

    const getTowns = async () => {
        try {
            const response = await Api.fetch({ url: 'Towns/getTowns' });
            if (response) {
                console.log(response);
                setTowns(response);
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
        { field: 'governateName', headerName: 'اسم المحافظة', width: 230 },
        { field: 'directorateName', headerName: 'اسم المديرية', width: 230 },
        { field: 'regionName', headerName: 'اسم المنطقة', width: 230 },
        { field: 'townName', headerName: 'اسم البلدة', width: 230 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.item)} />
            )
        }
    ];

    const rows = Towns.map((Town, index) => ({
        id: index + 1,
        governateName: Town?.governateName ?? 'No Name',
        directorateName: Town?.directorateName ?? 'No Name',
        regionName: Town?.regionName ?? 'No Name',
        townName: Town?.townName ?? 'No Name',
        item: Town,
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
                    إضافة بلدة     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getTowns()}
                />
            </div>
            <Demo row={rows} columns={columns}  name={'البلدات'}/>
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getTowns()}
                itemid={item} 
            />
        </div>
    );
};

export default Town;
