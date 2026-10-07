import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StaLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'staff' && password === 'staff') {
      console.log('Staff Login successful');
      navigate('/tlogin/chooseyr');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      />
      <br></br>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleLogin}
        style={{ marginTop: '5px',marginLeft:'5px', textTransform: 'none', fontSize: '20px' }}
      >
        Login
      </Button>
    </div>
  );
};

export default StaLogin;
