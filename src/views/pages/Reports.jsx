/* eslint-disable */
import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import pdf from '../../assets/images/pdf.svg';
import json from '../../assets/images/json.svg';
import csv from '../../assets/images/csv.svg';
import excel from '../../assets/images/excel.svg';

const Reports = () => {
    return (

        <div className='mine-card-body' style={{ display: 'grid', alignItems: 'center' }}>
            <div className='row'>
                <div className='col-lg-3 col-md-4 col-sx-12'>
                    <div className='card-report'>
                        <img src={pdf} width={100} />
                        <h4>تصدير تقرير PDF</h4>
                    </div>
                </div>
                <div className='col-lg-3 col-md-4 col-sx-12'>
                    <div className='card-report'>
                        <img src={json} width={100} />
                        <h4>تصدير تقرير LSON</h4>
                    </div>
                </div>
                <div className='col-lg-3 col-md-4 col-sx-12'>
                    <div className='card-report'>
                        <img src={csv} width={100} />
                        <h4>تصدير تقرير CSV</h4>
                    </div>
                </div>
                <div className='col-lg-3 col-md-4 col-sx-12'>
                    <div className='card-report'>
                        <img src={excel} width={100} />
                        <h4>تصدير تقرير EXCEL</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
