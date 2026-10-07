import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import StudentService from '../../services/studentService';

const StuLogin = () => {
  const [regno, setRegno] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    StudentService.login(regno, password)
      .then(response => {
        console.log('Login successful:', response.data);
        navigate(`/slogin/profile/${response.data.s_id}`);
      })
      .catch(error => {
        console.error('Login error:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <TextField
        label="Registration Number"
        variant="outlined"
        value={regno}
        onChange={(e) => setRegno(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <br></br>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '20px' }}
      /><br></br>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleLogin}
        style={{ marginTop: '30px',marginLeft:'40px', textTransform: 'none', fontSize: '20px' }}
      >
        Login
      </Button>
    </div>
  );
}

export default StuLogin;
