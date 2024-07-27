/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ButtonGroup } from 'reactstrap';
import file from '../../../assets/images/fileicon.svg';
import Api from '../../Auth/tools/api';

const Cards = () => {
  const [Regions, setRegions] = useState([]);
  const [filterByRegions, setfilterByRegions] = useState([]);
  const [Directorates, setDirectorates] = useState([]);
  const [selectDirectorate, setselectDirectorate] = useState(0)
  const [selectRegions, setselectRegions] = useState({
    regionId: 0
  });

  useEffect(() => {
    getDirectorates();
  }, []);
  useEffect(() => {
    getRegions();
  }, [selectDirectorate]);
  const getDirectorates = async () => {
    try {
      const response = await Api.fetch({ url: `Directorates/getDirectorates` });
      if (response) {
        console.log(response);
        setDirectorates(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getRegions = async () => {
    try {
      const response = await Api.fetch({ url: `Regions/GetRegionByDirectorate?directorateId=${selectDirectorate}` });
      console.log(response);
      if (response) {
        setRegions(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    filterByRegion();
    console.log(selectRegions);
  }, [selectRegions]);

  const filterByRegion = async () => {
    try {
      const response = await Api.fetch({ url: `Data/filterByRegionId?regionId=${selectRegions.regionId}` });
      if (response) {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        setfilterByRegions(response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setfilterByRegions([]); // Ensure it's set to an array on error
    }
  };

  // Find the selected region name
  //   const selectedRegion = Regions.find(region => region.regionId == selectRegions);
  //   const selectedRegionName = selectedRegion ? selectedRegion.regionName : '';

  return (
    <div className='mine-card-body'>
      <div className='heder-home-admin'>
        <div className=''>
          <ButtonGroup className="m-2 row" dir='rtl'>
            <label id='directorateId' >اختر المديرة</label>
            <select id="directorateId" name="directorateId" className="form-control"
              onChange={(e) => {
                setselectDirectorate(e.target.value);
                setselectRegions(JSON.stringify({ "regionId": 0, "regionName": "اختر المنطقة" }));
              }}>
              <option >الكل</option>
              {Directorates.map((item, index) => (
                <option key={index} value={item.directorateId}>{item.directorateName}</option>
              ))}
            </select>
          </ButtonGroup>
          <ButtonGroup className="m-2 row" dir='rtl'>
          <label id='regionId' >اختر المنطقة</label>
            <select
              id="regionId"
              name="regionId"
              className="form-control"
              onChange={(e) => setselectRegions(JSON.parse(e.target.value))}
            >
              <option value={JSON.stringify({ "regionId": 0, "regionName": "اختر المنطقة" })}>الكل</option>
              {Regions.map((item, index) => (
                <option key={index} value={JSON.stringify(item)}>{item.regionName}</option>
              ))}
            </select>
          </ButtonGroup>
        </div>
        <div>
          {selectRegions === null || selectRegions.regionId === 0 ? (
            <h2>مجمعات جميع المناطق</h2>
          ) : (
            <h2>مجمعات {selectRegions.regionName}</h2>
          )}
        </div>
        <div>
          {/* <div className='button-file'>
            <img src={file} alt="File Icon" />
            <h4>تنزيل نموذج فارغ</h4>
          </div> */}
        </div>
      </div>
      <Row>
        {Array.isArray(filterByRegions) && filterByRegions.length >= 0 ? (
          filterByRegions.map((item, index) => (
            <Col md="3" key={index}>
              <Card body className="card-shadow-admin">
                <div className='img-card'></div>
                <h6>{item.instituteName}</h6>
                <p>{item.townName} / مسجد: {item.mosqueName}</p>
                <Card body className="sub-card-shadow-admin">
                  <div className='sub-img-card-t'></div>
                  <p>المدرسين</p>
                  <div className='row bordertop'>
                    <div className="col-6">
                      <span className='span-num'>{item.totalSupervisorsAndTeachers}</span>
                      <p>مدرس ومدرسة</p>
                    </div>
                    <div className='col-6 row'>
                      <div className="sub-title1 col-6">
                        <span className=''>{item.maleSupervisorsAndTeachers}</span>
                        <p>مدرس</p>
                      </div>
                      <div className="sub-title col-6">
                        <span className=''>{item.femaleSupervisorsAndTeachers}</span>
                        <p>مدرسة</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card body className="sub-card-shadow-admin">
                  <div className='sub-img-card-s'></div>
                  <p>الطلاب</p>
                  <div className='row bordertop'>
                    <div className="col-6">
                      <span className='span-num'>{item.totalStudents}</span>
                      <p>طالب وطالبة</p>
                    </div>
                    <div className='col-6 row'>
                      <div className="sub-title1 col-6">
                        <span className=''>{item.maleStudents}</span>
                        <p>طالب</p>
                      </div>
                      <div className="sub-title col-6">
                        <span className=''>{item.femaleStudents}</span>
                        <p>طالبة</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card body className="sub-card-shadow-admin">
                  <div className='sub-img-card-e'></div>
                  <p>الحلقات</p>
                  <div className='row bordertop'>
                    <div className="col-6">
                      <span className='span-num'>{item.totalQuraanicClasses}</span>
                      <p>حلقة</p>
                    </div>
                    <div className='col-6 row'>
                      <div className="sub-title1 col-6">
                        <span className=''>{item.maleQuraanicClasses}</span>
                        <p>ذكور</p>
                      </div>
                      <div className="sub-title col-6">
                        <span className=''>{item.femaleQuraanicClasses}</span>
                        <p>اناث</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No data available</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Cards;
