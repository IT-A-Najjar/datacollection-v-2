import logo from './logo.svg';
import "./assets/scss/style.scss";
import Components from "./views/components/components.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./views/Auth/login.jsx";
import Destinations from './views/pages/Destinations/destinations.jsx';
import Teachers from './views/pages/Teachers/Teachers.jsx';
import Reports from './views/pages/Reports.jsx';
import Settings from './views/pages/Settings.jsx';
import Complexes from './views/pages/Complexes/Complexes.jsx';
import Supervisors from './views/pages/Supervisors/Supervisors.jsx';
import Episodes from './views/pages/Episodes/Episodes.jsx';
import Students from './views/pages/Students/Students.jsx';
import { useEffect } from 'react';
import Governate from './views/pages/Governate/Governate.jsx';
import Directorate from './views/pages/Directorate/Directorate.jsx';
import Region from './views/pages/Region/Region.jsx';
import Town from './views/pages/Town/Town.jsx';
import Center from './views/pages/Center/Center.jsx';
import Mosque from './views/pages/Mosque/Mosque.jsx';
import Reportsall from './views/pages/Reposts/Reportsall.jsx';


function App() {
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Components />} >
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/complexes" element={<Complexes />} />
          <Route path="/supervisors" element={<Supervisors />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/governate" element={<Governate />} />
          <Route path="/directorate" element={<Directorate />} />
          <Route path="/region" element={<Region />} />
          <Route path="/town" element={<Town />} />
          <Route path="/center" element={<Center />} />
          <Route path="/mosque" element={<Mosque />} />
          <Route path="/report" element={<Reportsall />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
