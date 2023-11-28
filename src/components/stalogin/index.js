import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StaLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'hostelapp') {
      console.log('Logging in with:', { password });
      navigate('/tlogin/chooseyr');
    } else {
      console.log('Invalid password');
    }
  };

  return (
    <div>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
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
