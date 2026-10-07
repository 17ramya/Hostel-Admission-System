
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../../../services/studentService';

const OneAdmission = () => {
  const navigate = useNavigate();
  const { year, ano } = useParams();
  const [admissionData, setAdmissionData] = useState(null);

  useEffect(() => {
    // ano here represents the student ID (s_id) passed from the URL
    StudentService.getStudentById(ano)
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
               <TableCell align="center">{admissionData.certificates ? admissionData.certificates[0] : 'N/A'}</TableCell>
               <TableCell align="center">{admissionData.certificates ? admissionData.certificates[1] : 'N/A'}</TableCell>
              <TableCell align="center">{admissionData.certificates ? admissionData.certificates[2] : 'N/A'}</TableCell>
               <TableCell align="center">{admissionData.certificates ? admissionData.certificates[3] : 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
           <TableHead>
             <TableRow>
               <TableCell variant="head" align="center" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan={4}>
                 Requested Room Allocation
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             <TableRow>
               <TableCell align="center" colSpan={4} style={{ fontSize: '18px', color: 'blue' }}>
                 {admissionData.roomno ? `Requested Room No: ${admissionData.roomno}` : 'No Room Requested'}
               </TableCell>
             </TableRow>
           </TableBody>
        </Table>
       </TableContainer>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', gap: '20px' }}>
         {admissionData.adStatus === 'admitted' ? (
           <Button variant="contained" color="success" disabled>
             Verified & Allocated
           </Button>
         ) : (
           <Button
            variant="contained"
            color="primary"
            onClick={async () => {
               try {
                  // 1. Verify Admission
                  await StudentService.updateAdmissionStatus(admissionData.regno, 'admitted');
                  // 2. Mark as Paid
                  await StudentService.updatePaymentStatus(admissionData.regno, 'Paid');
                  
                  // 3. Allocate Room (if requested)
                  if (admissionData.roomno) {
                     const roomsRes = await StudentService.getRooms();
                     const targetRoom = roomsRes.data.find(r => r.roomno === admissionData.roomno);
                     if (targetRoom) {
                        await StudentService.addStudentToRoommates(targetRoom.r_id, admissionData.id || admissionData.s_id);
                     }
                  }
                  
                  // Update local state so button changes immediately
                  setAdmissionData({ ...admissionData, adStatus: 'admitted', payStatus: 'Paid' });
                  alert('Student Verified, Paid, and Allocated successfully!');
                  // Optionally navigate back after a delay
                  setTimeout(() => navigate(-1), 1500);
               } catch (error) {
                  console.error(error);
                  alert('Error allocating student.');
               }
            }}
          >
            Verify, Pay & Allocate
          </Button>
         )}
    </div>
    </div>
  );
};

export default OneAdmission;
