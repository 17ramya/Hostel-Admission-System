
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const App=()=> {
  return (
    <div>
      <Link to="/slogin">
      <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',textTransform: 'none' ,fontSize:'20px' }}>
        Student Login
      </Button></Link>
      <Link to="/tlogin">
         <Button variant="contained" color="primary" size="medium" style={{ marginTop: '50px',marginLeft:'100px',textTransform: 'none' ,fontSize:'20px' }}>
        Staff Login
      </Button>
      </Link>
    </div>
  );
}

export default App;
