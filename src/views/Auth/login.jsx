import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import logo from '../../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import Api from "./tools/api";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const userNameRef = useRef(null);

    useEffect(() => {
        if (userNameRef.current) {
            userNameRef.current.focus();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`https://datacollection.quraniccompetition.com/api/Auth/authenticate`, formData);
            console.log(response.data.response);
            if (response.status === 200) {
                localStorage.setItem('userName', response.data.response.userName);
                localStorage.setItem('userId', response.data.response.userId);
                localStorage.setItem('role', response.data.response.userRoleId);
                localStorage.setItem('token', response.data.response.token);
                localStorage.setItem('supervisorName', response.data.response.supervisorName);
                localStorage.setItem('password', response.data.response.password);
                localStorage.setItem('organizationId', response.data.response.organizationId);
                localStorage.setItem('directorateId', response.data.response.directorateId);
                toast.success('تم تسجيل الدخول بنجاح!');
                window.location.href = '/';
            } else {
                toast.error('فشل تسجيل الدخول، يرجى التحقق من البيانات المدخلة');
            }
        } catch (error) {
            console.error(error.message);
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else if (error.message) {
                toast.error('حدث خطأ ما.. تحقق من كلمة المرور واسم المستخدم');
            } else {
                toast.error('حدث خطا ما');
            }
        }

    };

    return (
        <div id="main-wrapper" dir="rtl">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row bg-img" style={{ height: "100vh", overflow: "auto" }}>
                        <div className="col-lg-9 col-ms-12">
                            <div className="login_form_1">
                            </div>
                        </div>
                        <div className="col-lg-3 col-ms-12">
                            <div className="login_form_2">
                                <div className="login_form">
                                    <img src={logo} alt="wrapkit" />
                                    <div>
                                        <input
                                            id='userName'
                                            name='userName'
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="اسم المستخدم"
                                            ref={userNameRef}
                                        />
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="password-toggle-icon"
                                        />
                                        <input
                                            id='password'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="كلمة المرور"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleLogin();
                                                }
                                            }}
                                            inputMode="numeric"
                                        />
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={togglePasswordVisibility}
                                            className="password-toggle-icon"
                                        />
                                        <button onClick={handleLogin}>تسجيل الدخول</button>
                                        <FontAwesomeIcon
                                            icon={faArrowRightToBracket}
                                            className="password-toggle-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object
};

export default Login;
