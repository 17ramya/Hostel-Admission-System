import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, TextField, Button, Typography, Grid } from '@mui/material';

const Register = () => {
  const [s_name, setName] = useState('');
  const [regno, setRegno] = useState('');
  const [dept, setDept] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hostel-admission-system.onrender.com/api/Student/register', {
        s_name,
        regno,
        dept,
        year,
        password,
        adStatus: "Pending",
        payStatus: "Unpaid"
      });
      if (response.data) {
        alert('Registration successful! You can now log in.');
        navigate('/slogin');
      } else {
        alert('Registration failed or Student already exists.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f4f6f8', padding: '20px' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom color="primary">
              Student Registration
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={s_name} onChange={(e) => setName(e.target.value)} required />
              <TextField fullWidth label="Registration Number" variant="outlined" margin="normal" value={regno} onChange={(e) => setRegno(e.target.value)} required />
              <TextField fullWidth label="Department" variant="outlined" margin="normal" value={dept} onChange={(e) => setDept(e.target.value)} required />
              <TextField fullWidth label="Year" variant="outlined" margin="normal" value={year} onChange={(e) => setYear(e.target.value)} required />
              <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button fullWidth type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px', fontSize: '18px' }}>
                Register
              </Button>
            </form>
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="primary" onClick={() => navigate('/slogin')}>
                Student Login
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/tlogin')}>
                Staff Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
