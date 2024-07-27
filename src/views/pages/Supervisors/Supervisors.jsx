/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Demo from '../../components/sections/Demo'
import ModalCreate from './ModalCreate'
import Api from '../../Auth/tools/api';
import { FaPencil } from 'react-icons/fa6';
import ModalEdite from './ModalEdite';


const Supervisors = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [Supervisors, setSupervisors] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const [item, setItem] = useState({
        userName: null,
        userId: null,
        password: null,
        userRoleId: null,
        organizationId: null,
        token: null,
        organization: null,
        userRole: null
    });

    useEffect(() => {
        getSupervisors();
    }, []);

    const getSupervisors = async () => {
        try {
            const response = await Api.fetch({ url: 'Users/getUsers' });
            if (response) {
                console.log(response);
                setSupervisors(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlePasswordClick = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleEditClick = (params) => {
        console.log(params);
        setItem(params.row);
        setModalEditeShow(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'supervisorName', headerName: 'الاسم الثلاثي', width: 130 },
        { field: 'userName', headerName: 'اسم المستخدم', width: 130 },
        { field: 'organization', headerName: 'اسم الجهة', width: 130 },
        {
            field: 'password',
            headerName: 'كلمة السر',
            width: 130,
            renderCell: (params) => (
                <span onClick={() => handlePasswordClick(params.id)}>
                    {visiblePasswords[params.id] ? params.value : '*****'}
                </span>
            ),
        },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params)} />
            )
        }
    ];
    const rows = Supervisors.map((Supervisor, index) => ({
        id: index + 1,
        supervisorName: Supervisor?.supervisorName ?? 'No userName',
        userName: Supervisor?.userName ?? 'No userName',
        password: Supervisor?.password ?? 'No password',
        organization: Supervisor?(Supervisor.userRoleId != 2 ? Supervisor.organizationName : '') : "فارغ",
        item: Supervisor,
        action: {},
    }));

    return (

        <div className='mine-card-body'>
            <div className='heder-dach-admin-p'>
                <div className='heder-dach-admin'>
                    <div>
                        {/* <ButtonGroup className="m-2 " dir='rtl'>
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
                    إضافة مشرف     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getSupervisors()}
                />
            </div>
            {/* <div style={{ overflowX: 'auto', direction: 'ltr' }}> */}
                <Demo row={rows} columns={columns}  name={'المشرفين'}/>
            {/* </div> */}
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getSupervisors()}
                itemid={item}
            />
        </div>
    );
}

export default Supervisors;
