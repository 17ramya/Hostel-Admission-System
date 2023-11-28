
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../../../services/studentService';

const OneAdmission = () => {
  const navigate = useNavigate();
  const { year, ano } = useParams();
  const [admissionData, setAdmissionData] = useState(null);

  useEffect(() => {
    StudentService.YearAndAno(parseInt(year), parseInt(ano))
      .then(response => {
        // console.log(response.data)
        setAdmissionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching admission data:', error);
      });
  }, [year, ano]);

  const handleVerifyClick = (regno) => {
    const adStatus = 'admitted';
  
    StudentService.updateAdmissionStatus(regno, adStatus)
      .then(response => {
        console.log(response.data);
        navigate(-1);
      })
      .catch(error => {
        console.error('Error updating admission status:', error.response ? error.response.data : error.message);
      });
  };
  
  

  if (!admissionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Typography variant="h6">Admission Details</Typography>
       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
                 Name
               </TableCell>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
                 Registration Number
               </TableCell>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
                 Department
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
            <TableRow>
               <TableCell align="center">{admissionData.s_name}</TableCell>
               <TableCell align="center">{admissionData.regno}</TableCell>
               <TableCell align="center">{admissionData.dept}</TableCell>
             </TableRow>
          </TableBody>
           <TableHead>
             <TableRow>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
                 Certificate 1
               </TableCell>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
             Certificate 2
               </TableCell>
              <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
               Certificate 3
               </TableCell>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold' }}>
               Certificate 4
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             <TableRow>
               <TableCell align="center">{admissionData.certificates[0]}</TableCell>
               <TableCell align="center">{admissionData.certificates[1]}</TableCell>
              <TableCell align="center">{admissionData.certificates[2]}</TableCell>
               <TableCell align="center">{admissionData.certificates[3]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
       </TableContainer>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
         <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ textTransform: 'none', fontSize: '20px' }}
          onClick={() => handleVerifyClick(admissionData.regno)}
        >
          Verify
        </Button>
    </div>
    </div>
  );
};

export default OneAdmission;
