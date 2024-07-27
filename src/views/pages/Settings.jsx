
import React, { useEffect, useState } from 'react';
import UplodeStudent from './File/UplodeStudent';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Api from '../Auth/tools/api';
import toast from 'react-hot-toast';



const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  useEffect(() => {
    getSettings();
  }, []);
  const getSettings = async () => {
    try {
      const response = await Api.fetch({ url: 'ActivateSystem/getStatus' });
      // console.log(response);
      setIsSwitchOn(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSwitchToggle = async (event) => {
    const newSwitchState = event.target.checked;
    setIsSwitchOn(newSwitchState);

    try {
      // Send new switch state to the API
      await Api.fetch({
        url: `ActivateSystem/activeDisActive?systemAdministration=${newSwitchState}`,
        method: 'PUT',
      });
      if(newSwitchState){
        toast.success("تم الموقع بنجاح");
      }else{
        toast.success("تمت الغاء تفعيل الموقع");
      }
    } catch (error) {
      console.error('Error updating switch state:', error);
      setIsSwitchOn(!newSwitchState);
    }
  };
  return (

    <div className='mine-card-body' >
      <div className="heder-dach-admin-p">
        <div className="switch">
          <FormControlLabel
            control={<Android12Switch checked={isSwitchOn} onChange={handleSwitchToggle} />}
            label="تفعيل رابط جمع البيانات"
          />
        </div>
      </div>
      {/* <UplodeStudent /> */}
    </div>
  );
}

export default Settings;
