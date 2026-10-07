
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Years=()=> {
  return (
    <div>
      <Link to="/tlogin/1">
      <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',textTransform: 'none' ,fontSize:'20px' }}>
        1st year
      </Button></Link>
      <Link to="/tlogin/2">
         <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',marginLeft:'100px',textTransform: 'none' ,fontSize:'20px' }}>
        2nd year
      </Button>
      </Link>
      <Link to="/tlogin/3">
         <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',marginLeft:'150px',textTransform: 'none' ,fontSize:'20px' }}>
        3rd year
      </Button>
      </Link>
      <Link to="/tlogin/4">
         <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',marginLeft:'200px',textTransform: 'none' ,fontSize:'20px' }}>
       4th year
      </Button>
      </Link>
    </div>
  );
}

export default Years;
