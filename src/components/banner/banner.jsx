import React, { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col } from 'reactstrap';
import Cards from "../../views/components/sections/cards";
import Cardsadmin from "../../views/components/sections/card-admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Destinations from '../../views/pages/Destinations/destinations';
import Teachers from '../../views/pages/Teachers/Teachers';
import Reports from '../../views/pages/Reports';
import Settings from '../../views/pages/Settings';
import Complexes from '../../views/pages/Complexes/Complexes';
import Supervisors from '../../views/pages/Supervisors/Supervisors';
import Episodes from '../../views/pages/Episodes/Episodes';
import Students from '../../views/pages/Students/Students';
import Governate from '../../views/pages/Governate/Governate';
import Directorate from '../../views/pages/Directorate/Directorate';
import Region from '../../views/pages/Region/Region';
import Town from '../../views/pages/Town/Town';
import Center from '../../views/pages/Center/Center';
import Mosque from '../../views/pages/Mosque/Mosque';
import Reportsall from '../../views/pages/Reposts/Reportsall';


// import Api from '../../tools/api';
// import toast from 'react-hot-toast';

const HeaderBanner = () => {
    const role = localStorage.getItem('role');
    return (
        <div className="static-slider-head">
            <Routes>
                <Route path="/report" element={<Reportsall />} />

                {role == 2 ? (
                    <>
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/supervisors" element={<Supervisors />} />
                        <Route path="/" element={<Cardsadmin />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/governate" element={<Governate />} />
                        <Route path="/directorate" element={<Directorate />} />
                        <Route path="/region" element={<Region />} />
                        <Route path="/town" element={<Town />} />
                        <Route path="/center" element={<Center />} />
                        <Route path="/mosque" element={<Mosque />} />
                        <Route path="/complexes" element={<Complexes />} />
                    </>
                ) : (
                    role == 1 ? (
                        <>
                            <Route path="/teachers" element={<Teachers />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/episodes" element={<Episodes />} />
                            <Route path="/" element={<Cards />} />
                        </>
                    ) : (
                        ''
                    )
                )}
            </Routes>
        </div>
    );
}

export default HeaderBanner;
