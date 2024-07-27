/* eslint-disable */
import React, { useEffect } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Demo from '../../components/sections/Demo'
import ModalCreate from './ModalCreate'
import Api from '../../Auth/tools/api';
import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import ModalEdite from './ModalEdite';


const Complexes = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [Complexes, setComplexes] = useState([]);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState([]);
    useEffect(() => {
        getComplexes();
    }, []);

    const getComplexes = async () => {
        try {
            const response = await Api.fetch({ url: 'Institutes/getInstitutes' });
            if (response) {
                console.log(response);
                setComplexes(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleEditClick = (complex) => {
        // console.log(complex); // طباعة الكائن Complex في وحدة التحكم
        setItem(complex); // تعيين الكائن Complex إلى حالة المكون
        setModalEditeShow(true); // إظهار النموذج
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'organization', headerName: 'اسم الجهة', width: 130 },
        { field: 'governate', headerName: 'اسم المحافظة', width: 130 },
        { field: 'directorate', headerName: 'المديرية', width: 130 },
        { field: 'region', headerName: 'المنطقة', width: 130 },
        { field: 'town', headerName: 'البلدة', width: 130 },
        { field: 'center', headerName: 'اسم المركز', width: 130 },
        { field: 'mosque', headerName: 'اسم المسجد', width: 130 },
        { field: 'instituteName', headerName: 'اسم المجمع', width: 130 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.complex)} />
            )
        }
    ];
    const rows = Complexes.map((Complex, index) => ({
        id: index + 1,
        organization: Complex?.organizationName ?? 'No Name', // Fallback in case organizationName is undefined
        governate: Complex?.governateName ?? 'No Name', // Fallback in case organizationName is undefined
        directorate: Complex?.directorateName ?? 'No Name', // Fallback in case organizationName is undefined
        region: Complex?.regionName ?? 'No Name', // Fallback in case organizationName is undefined
        town: Complex?.townName ?? 'No Name', // Fallback in case organizationName is undefined
        center: Complex?.centerName ?? 'No Name', // Fallback in case organizationName is undefined
        mosque: Complex?.mosqueName ?? 'No Name', // Fallback in case organizationName is undefined
        instituteName: Complex?.instituteName ?? 'No Name', // Fallback in case organizationName is undefined
        complex: Complex,
        action: {} // Placeholder, the actual component will be rendered by renderCell
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
                    إضافة مجمع     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getComplexes()}
                />
            </div>
            <Demo row={rows} columns={columns}  name={'المجمعات'}/>
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getComplexes()}
                itemid={item} 
            />
        </div>
    );
}

export default Complexes;
