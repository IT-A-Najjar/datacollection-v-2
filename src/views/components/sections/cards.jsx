/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import Api from '../../Auth/tools/api';
import { Link } from 'react-router-dom';

const Cards = () => {   
    const organizationId = localStorage.getItem('organizationId');
    const [data, setData] = useState({
        institutesCount: 0,
        quraanicClassesCount: 0,
        supervisorsAndTeachers: {
            totalCount: 0,
            femaleCount: 0,
            maleCount: 0
        },
        studentsCount: {
            totalStudents: 0,
            maleStudents: 0,
            femaleStudents: 0
        }
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            // const response = await Api.fetch({ url: 'Data/CounterData' });
            const response = await Api.fetch({ url: `Data/CounterDataByOrganiztion?organization=${organizationId}` });
            if (response) {
                console.log(response);
                setData(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col lg="8" md="6" className="align-self-center text-center">
                <div>
                    <Row>
                        <Col md="6"> 
                        
                            <Card body className="card-shadow">
                                <div className='row home-card-body'>
                                    <div className="col-7">
                                        <h2>المجمعات القرآنية</h2>
                                    </div>
                                    <div className="col-5 row">
                                        <span className='span-num'>{data.institutesCount}</span>
                                        <p>مجمع قرآني</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md="6">
                        <Link to={"/episodes"}>
                            <Card body className="card-shadow">
                                <div className='row home-card-body'>
                                    <div className="col-7">
                                        <h2>الحلقات</h2>
                                    </div>
                                    <div className="col-5 row">
                                        <span className='span-num'>{data.quraanicClassesCount}</span>
                                        <p>حلقة</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        </Col>
                        <Col md="6">
                        <Link to={"/teachers"}>
                            <Card body className="card-shadow">
                                <div className='row home-card-body'>
                                    <div className="col-7">
                                        <h2>المعلمين</h2>
                                        <div className='row'>
                                            <div className="sub-title1 col-6">
                                                <span className=''>{data.supervisorsAndTeachers.maleCount}</span>
                                                <p>معلم</p>
                                            </div>
                                            <div className="sub-title col-6">
                                                <span className=''>{data.supervisorsAndTeachers.femaleCount}</span>
                                                <p>معلمة</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row">
                                        <span className='span-num'>{data.supervisorsAndTeachers.totalCount}</span>
                                        <p>معلم ومعلمة</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        </Col>
                        <Col md="6">
                        <Link to={"/students"}>
                            <Card body className="card-shadow">
                                <div className='row home-card-body'>
                                    <div className="col-7">
                                        <h2>الطلاب</h2>
                                        <div className='row'>
                                            <div className="sub-title1 col-6">
                                                <span className=''>{data.studentsCount.maleStudents}</span>
                                                <p>طالب</p>
                                            </div>
                                            <div className="sub-title col-6">
                                                <span className=''>{data.studentsCount.femaleStudents}</span>
                                                <p>طالبة</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 row">
                                        <span className='span-num'>{data.studentsCount.totalStudents}</span>
                                        <p>طالب وطالبة</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default Cards;
