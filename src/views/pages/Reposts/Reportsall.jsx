/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaArrowLeft, FaArrowRight, FaPencil, FaPersonCirclePlus } from "react-icons/fa6";
import Demo from '../../components/sections/Demo';
import Api from '../../Auth/tools/api';

const Reportsall = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [Episodes, setEpisodes] = useState([]);
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const [item, setItem] = useState([]);
    const organizationId = localStorage.getItem('organizationId');

    useEffect(() => {
        getEpisodes();
    }, []);

    const getEpisodes = async () => {
        try {
            const response = await Api.fetch({ url: `/QuraanicClasses/getQuraanicClasses` });
            if (response) {
                console.log(response);
                setEpisodes(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleEditClick = (complex) => {
        setItem(complex); 
        setModalEditeShow(true); 
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'organization', headerName: 'اسم الجهة', width: 130 },
        { field: 'governate', headerName: 'اسم المحافظة', width: 130 },
        { field: 'directorate', headerName: 'المديرية', width: 130 },
        { field: 'region', headerName: 'المنطقة', width: 130 },
        { field: 'town', headerName: 'البلدة', width: 130 },
        { field: 'center', headerName: 'اسم المركز', width: 130 },
        { field: 'institute', headerName: 'اسم المجمع', width: 130 },
        { field: 'quraanicClassName', headerName: 'اسم الحلقة', width: 180 },
        { field: 'quraanicClassLevel', headerName: 'مستوى الحلقة', width: 130 },
        { field: 'gender', headerName: 'نوع الحلقة', width: 130 },
        {
            field: 'action',
            headerName: 'الاحداث',
            width: 130,
            renderCell: (params) => (
                <FaPencil style={{ color: '#428E17' }} onClick={() => handleEditClick(params.row.Episod)} />
            )
        }    ];
        const rows = Episodes.map((Episod, index) => ({
            id: index + 1,
            organization: Episod?.organizationName ?? 'No Name', 
            governate: Episod?.governateName ?? 'No Name', 
            directorate: Episod?.directorateName ?? 'No Name', 
            region: Episod?.regionName ?? 'No Name', 
            town: Episod?.townName ?? 'No Name', 
            center: Episod?.centerName ?? 'No Name', 
            institute: Episod?.instituteName ?? 'No Name', 
            quraanicClassName: Episod?.quraanicClassName ?? 'No Name', 
            quraanicClassLevel: Episod?.quraanicClassLevelName ?? 'No Name', 
            gender: Episod?.genderName ?? 'No Name', 
            Episod: Episod,
            action: {} 
        }));
    return (
        <div className='mine-card-body'>
         <div className='heder-dach-admin-p'>
                <div className='heder-dach-admin'>
                   
                </div>
            </div>
            <Demo row={rows} columns={columns}  name={'الجهات'}/>
        </div>
    );
};

export default Reportsall;
