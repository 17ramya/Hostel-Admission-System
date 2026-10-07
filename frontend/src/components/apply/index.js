import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentService from '../../services/studentService';

const Apply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData = location.state?.profileData || {};

  const [formData, setFormData] = useState({
    name: profileData.s_name || '',
    regno: profileData.regno || '',
    dept: profileData.dept || '',
    year: profileData.year || '',
    c1: '',
    c2: '',
    c3: '',
    c4: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const admissionRequest = {
      s_name: formData.name,
      regno: formData.regno,
      dept: formData.dept,
      year: formData.year,
      certificates: [formData.c1, formData.c2, formData.c3, formData.c4],
    };

    StudentService.createAdmission(admissionRequest)
      .then(async response => {
        console.log('Admission created successfully:', response.data);
        // Automatically update adStatus to 'Applied' so they can select a room next
        try {
          await StudentService.updateAdmissionStatus(formData.regno, 'Applied');
          alert('Application Submitted Successfully!');
          navigate(-1);
        } catch (e) {
          console.error(e);
          alert('Application submitted, but failed to update status.');
        }
      })
      .catch(error => {
        console.error('Error creating admission:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Registration Number"
          variant="outlined"
          name="regno"
          value={formData.regno}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department"
          variant="outlined"
          name="dept"
          value={formData.dept}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          variant="outlined"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Certificate 1"
          variant="outlined"
          name="c1"
          value={formData.c1}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Certificate 2"
          variant="outlined"
          name="c2"
          value={formData.c2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Certificate 3"
          variant="outlined"
          name="c3"
          value={formData.c3}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Certificate 4"
          variant="outlined"
          name="c4"
          value={formData.c4}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Apply;
