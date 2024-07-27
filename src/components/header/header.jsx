/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';

import logo from '../../assets/images/logos/logo2.svg';
import { Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Api from '../../views/Auth/tools/api';
import toast from 'react-hot-toast';
import ModalEdite from './ModalEdite';


const Header = () => {
    const [modalEditeShow, setModalEditeShow] = useState(false);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const handleNavClick = (path) => {
        setActiveLink(path);
    };
    useEffect(() => {
        setActiveLink(location.pathname);
        console.log(localStorage.getItem('directorateId'));
      }, [location]);
    const navigate = useNavigate();

    const logout = async () => {
        console.log("logoty");
        const response = await Api.fetch({
            url: `Auth/logout?id=${localStorage.getItem('userId')}`,
            method: 'POST',
        });
        console.log(response);
        if (response.status == 200) {
            localStorage.clear();
            toast.success('تم تسجيل الخروج', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            window.location.href = '/';
        } else {
            toast.error('حدث خطا في عملية تسجيل الخروج');
        }
    };
    const handleEditClick = (params) => {
        setModalEditeShow(true);
    };
    return (
        <div className="topbar" id="top">
            <div className="header6">
                <Container className="po-relative" dir='ltr'>
                    <Navbar className="navbar-expand-lg h1-nav" >
                        <NavbarBrand href="#">
                            {!token ? (
                                <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                    <NavItem>
                                        <Link className="btn btn-outline-success" to={"/login"}>
                                            تسجيل الدخول
                                        </Link>
                                    </NavItem>
                                </Nav>
                            ) : (
                                <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                    <NavItem>
                                        <Link className="btn btn-outline-success" onClick={() => logout()}>
                                            تسجيل الخروج
                                        </Link>
                                    </NavItem>
                                </Nav>
                            )}
                        </NavbarBrand>
                        <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                        <Collapse isOpen={isOpen} navbar id="header1" className='nav-mop'>
                            <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                <Nav navbar className="" dir='rtl'>
                                    <NavItem>
                                        <Link to={'/'} onClick={() => handleNavClick('/')} className={activeLink === '/' ? 'nav-link active' : 'nav-link'}>
                                            الرئيسية
                                        </Link>
                                    </NavItem>
                                    {role == 2 ? (
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav>
                                                إدارة البيانات <i className="fa fa-angle-down m-l-5"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="b-none animated fadeInUp">

                                                <>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/destinations')} className={activeLink === '/destinations' ? 'nav-link active' : 'nav-link'} to={"/destinations"}>
                                                            الجهات
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/supervisors')} className={activeLink === '/supervisors' ? 'nav-link active' : 'nav-link'} to={"/supervisors"}>
                                                            المشرفين
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/governate')} className={activeLink === '/governate' ? 'nav-link active' : 'nav-link'} to={"/governate"}>
                                                            المحافطات
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/directorate')} className={activeLink === '/directorate' ? 'nav-link active' : 'nav-link'} to={"/directorate"}>
                                                            المديريات
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/region')} className={activeLink === '/region' ? 'nav-link active' : 'nav-link'} to={"/region"}>
                                                            المناطق
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/town')} className={activeLink === '/town' ? 'nav-link active' : 'nav-link'} to={"/town"}>
                                                            البلدات
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/center')} className={activeLink === '/center' ? 'nav-link active' : 'nav-link'} to={"/center"}>
                                                            المراكز
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/mosque')} className={activeLink === '/mosque' ? 'nav-link active' : 'nav-link'} to={"/mosque"}>
                                                            المساجد
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link onClick={() => handleNavClick('/complexes')} className={activeLink === '/complexes' ? 'nav-link active' : 'nav-link'} to={"/complexes"}>
                                                            المجمعات
                                                        </Link>
                                                    </DropdownItem>
                                                </>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    ) : ('')}
                                    {role == 2 ? (
                                        <>
                                            <NavItem>
                                                <Link onClick={() => handleNavClick('/reports')} className={activeLink === '/reports' ? 'nav-link active' : 'nav-link'} to={"/reports"}>
                                                    التقارير
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link onClick={() => handleNavClick('/settings')} className={activeLink === '/settings' ? 'nav-link active' : 'nav-link'} to={"/settings"}>
                                                    الاعدادات
                                                </Link>
                                            </NavItem>
                                        </>
                                    ) : (role == 1 ? (
                                        <>
                                            <NavItem>
                                                <Link onClick={() => handleNavClick('/teachers')} className={activeLink === '/teachers' ? 'nav-link active' : 'nav-link'} to={"/teachers"}>
                                                    المعلمين
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link onClick={() => handleNavClick('/episodes')} className={activeLink === '/episodes' ? 'nav-link active' : 'nav-link'} to={"/episodes"}>
                                                    الحلقات
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link onClick={() => handleNavClick('/students')} className={activeLink === '/students' ? 'nav-link active' : 'nav-link'} to={"/students"}>
                                                    الطلاب
                                                </Link>
                                            </NavItem>
                                        </>
                                    ) : (<></>))}

                                </Nav>
                            </Nav>
                        </Collapse>
                        <Collapse isOpen={isOpen} navbar id="header1">
                            <Nav navbar className="ms-auto mt-2 mt-lg-0">
                                <Nav navbar className="ms-auto">
                                    <h6 onClick={() => handleEditClick()}>المشرف: {localStorage.getItem('supervisorName')}</h6>
                                </Nav>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
                <ModalEdite
                    show={modalEditeShow}
                    onHide={() => setModalEditeShow(false)}
                />
            </div>
        </div>
    );
}
export default Header;
