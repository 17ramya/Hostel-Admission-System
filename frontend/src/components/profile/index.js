import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../../services/studentService';

const Profile = () => {
  const navigate = useNavigate();
  const { s_id } = useParams();
  const [profileData, setProfileData] = useState({
    name: '',
    regno: '',
    dept: '',
    year: '',
    ad_status: '',
    pay_status: '',
  });

  useEffect(() => {
    console.log(s_id)
    fetchStudentDetails();
  }, [s_id]);
  const buttonText =
    profileData.payStatus === 'Unpaid'
      ? 'Make Payment'
      : profileData.adStatus === 'Pending'
      ? 'Apply'
      : 'Select Room';

  const handleClick = () => {
    if (profileData.payStatus === 'Unpaid') {
      handleMakePayment(profileData.regno);
    } else if (profileData.adStatus === 'Pending') {
      handleApply();
    } else {
      handleSelectRoom();
    }
  };
    const handleMakePayment = (regno) => {
      const newPaymentStatus = 'Paid';

      StudentService.updatePaymentStatus(regno, newPaymentStatus)
        .then(response => {
          console.log('Payment status updated successfully:', response.data);
          alert('Payment Successful!');
          // Update the local state so the UI refreshes
          setProfileData(prev => ({ ...prev, payStatus: newPaymentStatus }));
        })
        .catch(error => {
          console.error('Error updating payment status:', error);
          alert('Error making payment.');
        });
  };

  const handleApply = () => {
    navigate('/slogin/apply', { state: { profileData } });
  };

  const handleSelectRoom = () => {
    navigate(`/slogin/selectroom/${profileData.s_id}`)
    console.log('Select Room clicked');
  };
  const fetchStudentDetails = () => {
    
    StudentService.getStudentById(s_id)
      .then(response => {
        console.log(response.data);
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching student details:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
       <Grid container spacing={2}>
        <Grid item xs={6}>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Name:
          </Typography>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Registration Number:
           </Typography>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Department:
           </Typography>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Year:
           </Typography>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Admission Status:
           </Typography>
           <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Payment Status:
           </Typography>
       </Grid>
         <Grid item xs={6}>
           <Typography variant="body1">{profileData.s_name}</Typography>
          <Typography variant="body1">{profileData.regno}</Typography>
           <Typography variant="body1">{profileData.dept}</Typography>
           <Typography variant="body1">{profileData.year}</Typography>
           <Typography variant="body1">{profileData.adStatus}</Typography>
           <Typography variant="body1">{profileData.payStatus}</Typography>
         </Grid>
      </Grid>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
         <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ textTransform: 'none', fontSize: '20px' }}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
    </Paper>
  );
};

export default Profile;
