/* eslint-disable */
/* eslint-disable */
import React, { useEffect } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  ButtonGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Demo from "../../components/sections/Demo";
import ModalCreate from "./ModalCreate";
import { useState } from "react";
import { FaBookOpenReader, FaCalendarPlus, FaCartPlus, FaCirclePlus, FaDownload, FaHeartCirclePlus, FaPencil, FaSquareGooglePlus, FaUpload } from "react-icons/fa6";
import ModalEdite from "./ModalEdite";
import Api from "../../Auth/tools/api";
import ModaFile from "./ModaFile";
import { saveAs } from 'file-saver';
import file from "../../../assets/Teachers.xlsx"
import file1 from "../../../assets/TeachersRecitationsNarration.xlsx"
import ModaFileNarration from "./ModaFileNarration";
import toast from "react-hot-toast";

const Teachers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowf, setModalShowf] = React.useState(false);
  const [modalShowNarration, setModalShowNarration] = React.useState(false);
  const [Teachers, setTeachers] = useState([]);
  const [modalEditeShow, setModalEditeShow] = useState(false);
  const [item, setItem] = useState([]);
  const organizationId = localStorage.getItem('organizationId');

  useEffect(() => {
    getTeachers();
  }, []);
  const handleDownload = () => {
    const filePath = file;
    fetch(filePath)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, 'معلمين.xlsx');
      })
      .catch(error => toast.error('Error downloading the file:', error));
    // const filePath1 = file1;
    // fetch(filePath1)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     saveAs(blob, 'Narration.xlsx');
    //   })
    //   .catch(error => toast.error('Error downloading the file:', error));
  };

  const getTeachers = async () => {
    try {
      const response = await Api.fetch({
        url: `SupervisorsAndTeachers/getSupervisorsAndTeachersByOrganizationId?organizationId=${organizationId}`,
      });
      if (response) {
        console.log(response);
        setTeachers(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEditClick = (complex) => {
    setItem(complex); // تعيين الكائن Complex إلى حالة المكون
    setModalEditeShow(true); // إظهار النموذج
  };
  const handleaddClick = (complex) => {
    setItem(complex); // تعيين الكائن Complex إلى حالة المكون
    setModalShowNarration(true); // إظهار النموذج
  };
  const columns = [
    { field: "id", headerName: "ID", type: 'number', width: 70 },
    { field: "teacherName", headerName: "اسم المعلم", width: 130 },
    { field: "genderId", headerName: "الجنس", width: 130 },
    { field: "fatherName", headerName: "اسم الاب", width: 130 },
    { field: "motherName", headerName: "اسم الام", width: 130 },
    { field: "nickname", headerName: "الكنيه", width: 130 },
    { field: "birthPlace", headerName: "مكان الولادة", width: 130 },
    { field: "birthDate", headerName: "تاريخ الميلاد", width: 130 },
    { field: "homeland", headerName: "البلد الأصلي", width: 130 },
    { field: "contactNo", headerName: "رقم التواصل", width: 130 },
    { field: "currentResidence", headerName: "السكن الحالي", width: 130 },
    { field: "maritalSatusId", headerName: "الحالة الاجتماعية", width: 130 },
    { field: "wivesNo", headerName: "عدد الزوجات", type: 'number', width: 130 },
    { field: "childrenNo", headerName: "عدد الأولاد", type: 'number', width: 130 },
    { field: "healthStatusId", headerName: "الحالة الصحية", width: 130 },
    { field: "diseaseType", headerName: "المرض", width: 130 },
    { field: "educationalLevelId", headerName: "التحصيل الدراسي", width: 130 },
    { field: "certificateGrantingDate", headerName: "تاريخ المنح", width: 130 },
    { field: "issuedFrom", headerName: "صادرة من", width: 130 },
    { field: "city", headerName: "المدينة", width: 130 },
    { field: "isStudying", headerName: "هل تدرس الآن", width: 130 },
    { field: "certificateType", headerName: "التخصص", width: 130 },
    { field: "studyYearId", headerName: "السنة الدراسية", width: 130 },
    { field: "univercityName", headerName: "الجامعة", width: 130 },
    {
      field: "memorizedPartsNo",
      headerName: "عدد الأجزاء المحفوظة",
      width: 130,
    },
    {
      field: "masteredMemorizedPartsNo",
      headerName: "عدد الأجزاء المتقنة",
      width: 130,
    },
    { field: "isCertified", headerName: "هل يوجد إجازة", width: 130 },
    {
      field: "action",
      headerName: "الاحداث",
      width: 130,
      renderCell: (params) => (
        <>
          <FaPencil
            style={{ color: "#428E17", margin: 0.5 + "rem" }}
            onClick={() => handleEditClick(params.row.complex)}
          />
          {(params.row.complex.teachersRecitationsNarrations && params.row.complex.teachersRecitationsNarrations.length > 0) ?
            <FaBookOpenReader
              style={{ color: "#428E17", margin: "0.5rem" }}
              onClick={() => handleaddClick(params.row.complex)}
            /> : ""
          }


        </>
      ),
    },
  ];

  const rows = Teachers.map((item, index) => ({
    id: index + 1,
    teacherName: item?.name ?? "فارغ",
    genderId: item ? (item.genderId === 1 ? "ذكر" : "انثى") : "فارغ",
    fatherName: item?.fatherName ?? "فارغ",
    motherName: item?.motherName ?? "فارغ",
    nickname: item?.nickname ?? "فارغ",
    birthPlace: item?.birthPlace ?? "فارغ",
    birthDate: item?.birthDate ?? "فارغ",
    homeland: item?.homeland ?? "فارغ",
    contactNo: item?.contactNo ?? "فارغ",
    currentResidence: item?.currentResidence ?? "فارغ",
    maritalSatusId: item ? (item.genderId === 1 ? item.maritalSatusNameM : item.maritalSatusNameF) : "فارغ",
    wivesNo: item?.wivesNo ?? 0,
    childrenNo: item?.childrenNo ?? 0,
    healthStatusId: item?.healthStatusName ?? "فارغ",
    diseaseType: item?.diseaseType ?? "فارغ",
    educationalLevelId: item?.educationalLevelName ?? "فارغ",
    certificateGrantingDate: item?.certificateGrantingDate ?? "فارغ",
    issuedFrom: item?.issuedFrom ?? "فارغ",
    city: item?.city ?? "فارغ",
    isStudying: item?.yesNoName ?? "فارغ",
    certificateType: item?.certificateType ?? "فارغ",
    studyYearId: item?.studyYearName ?? "فارغ",
    univercityName: item?.univercityName ?? "فارغ",
    memorizedPartsNo: item?.memorizedPartsNo ?? "فارغ",
    masteredMemorizedPartsNo: item?.masteredMemorizedPartsNo ?? "فارغ",
    isCertified: item ? (item.isCertified === 1 ? 'نعم' : 'لا') : "فارغ",
    complex: item,
    action: {},
  }));

  return (
    <div className="mine-card-body">
      <div className="heder-dach-admin-p">
        <div className="heder-dach-admin">
          <div>
            {/* <ButtonGroup className="m-2 " dir="rtl">
              <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle
                  tag="button"
                  className="btn btn-secondary dorp-moh"
                  caret
                >
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
            {/* <input type="text" placeholder="بحث" /> */}
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
          onUpdat={() => getTeachers()}
        />
        <ModaFileNarration
          show={modalShowNarration}
          onHide={() => setModalShowNarration(false)}
          onUpdat={() => getTeachers()}
          itemid={item}
        />
        <Button className="buttom-add" onClick={() => setModalShow(true)}>
          إضافة معلم +
        </Button>
        <ModalCreate
          show={modalShow}
          onHide={() => setModalShow(false)}
          onUpdat={() => getTeachers()}
        />
      </div>
      <div style={{ overflowX: "auto", direction: "ltr" }}>
        <Demo row={rows} columns={columns}  name={'المعلمين'}/>
      </div>
      <ModalEdite
        show={modalEditeShow}
        onHide={() => setModalEditeShow(false)}
        onUpdat={() => getTeachers()}
        itemid={item}
      />
    </div>
  );
};

export default Teachers;
