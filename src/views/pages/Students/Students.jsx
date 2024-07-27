/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Demo from '../../components/sections/Demo'
import ModalCreate from './ModalCreate'
import Api from '../../Auth/tools/api';
import ModalEdite from './ModalEdite';
import { FaDownload, FaPencil, FaUpload } from 'react-icons/fa6';
import ModaFile from './ModaFile';
import { saveAs } from 'file-saver';
import file from "../../../assets/Students.xlsx"


const Students = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [Students, setStudents] = useState([]);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState([]);
    const [modalShowf, setModalShowf] = React.useState(false);
    const organizationId = localStorage.getItem('organizationId');

    useEffect(() => {
        getStudents();
    }, []);
    const handleDownload = () => {
        const filePath = file;
        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                saveAs(blob, 'طلاب.xlsx');
            })
            .catch(error => toast.error('Error downloading the file:', error));
    };

    const getStudents = async () => {
        try {
            const response = await Api.fetch({ url: `Students/getStudentsByOrganizationId?organizationId=${organizationId}` });
            if (response) {
                console.log(response);
                setStudents(response);
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
        { field: 'studentId', headerName: 'ID', width: 130 },
        { field: 'quraanicClassId', headerName: 'الحلقة', width: 130 },
        { field: 'firstName', headerName: 'اسم الطالب', width: 130 },
        { field: 'genderId', headerName: 'الجنس', width: 130 },
        { field: 'fatherName', headerName: 'اسم الاب', width: 130 },
        { field: 'motherName', headerName: 'اسم الام', width: 130 },
        { field: 'nickname', headerName: 'الكنيه', width: 130 },
        { field: 'birthPlace', headerName: 'مكان الميلاد', width: 130 },
        { field: 'birthDate', headerName: 'تاريخ الميلاد', width: 130 },
        { field: 'homeland', headerName: 'البلد الأصلي', width: 130 },
        { field: 'studyClass', headerName: 'الصف', width: 130 },
        { field: 'schoolName', headerName: 'المدرسه', width: 130 },
        { field: 'currentResidence', headerName: 'العنوان الحالي', width: 130 },
        { field: 'contactNo', headerName: 'رقم التواصل', width: 130 },
        // { field: 'memorizedPartsNo', headerName: 'عدد الأجزاء المحفوظة', width: 130 },
        // { field: 'currentPartNo', headerName: 'الجزء الحالي', width: 130 },
        // { field: 'currentPage', headerName: 'الصفحة الحالية', width: 130 },
        // { field: 'currentVerseNo', headerName: 'رقم الاية الحالية', width: 130 },
        // { field: 'currentSurah', headerName: 'السورة الحالية', width: 130 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.item)} />
            )
        }
    ];

    const rows = Students.map((item, index) => ({
        id: index + 1,
        quraanicClassId: item?.quraanicClassName ?? 'فارغ',
        studentId: item?.studentId ?? 'فارغ',
        firstName: item?.firstName ?? 'فارغ',
        genderId: item?.genderName ?? 'فارغ',
        fatherName: item?.fatherName ?? 'فارغ',
        motherName: item?.motherName ?? 'فارغ',
        nickname: item?.nickname ?? 'فارغ',
        birthPlace: item?.birthPlace ?? 'فارغ',
        birthDate: item?.birthDate ?? 'فارغ',
        homeland: item?.homeland ?? 'فارغ',
        studyClass: item?.studyClassName ?? 'فارغ',
        schoolName: item?.schoolName ?? 'فارغ',
        currentResidence: item?.currentResidence ?? 'فارغ',
        contactNo: item?.contactNo ?? 'فارغ',
        // memorizedPartsNo: item?.memorizedPartsNo ?? 'فارغ',
        // currentPartNo: item?.currentPartNo ?? 'فارغ',
        // currentPage: item?.currentPage ?? 'فارغ',
        // currentSurah: item?.currentSurah ?? 'فارغ',
        // currentVerseNo: item?.currentVerseNo ?? 'فارغ',
        item: item,
        action: {}
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
                <Button className="buttom-add" onClick={handleDownload}>
                    تحميل الملف
                    <FaDownload/>
                </Button>
                <Button className="buttom-add" onClick={() => setModalShowf(true)}>
                    رفع ملف
                    <FaUpload/>
                </Button>
                <ModaFile
                    show={modalShowf}
                    onHide={() => setModalShowf(false)}
                    onUpdat={() => getStudents()}
                />
                <Button className='buttom-add' onClick={() => setModalShow(true)}>
                    إضافة طالب     +
                </Button>
                <ModalCreate
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onUpdat={() => getStudents()}
                />
            </div>
            <div style={{ overflowX: 'auto', direction: 'ltr' }}>
                <Demo row={rows} columns={columns} name={'الطلاب'} />
            </div>
            <ModalEdite
                show={modalEditeShow}
                onHide={() => setModalEditeShow(false)}
                onUpdat={() => getStudents()}
                itemid={item}
            />
        </div>
    );
}

export default Students;
