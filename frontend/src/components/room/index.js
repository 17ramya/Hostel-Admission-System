import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import StudentService from '../../services/studentService';

const Room = () => {
  const [roomDetailsList, setRoomDetailsList] = useState([]);
  const navigate = useNavigate();
  const { s_id } = useParams();
  useEffect(() => {
    StudentService.getRooms()
      .then(response => {
        const promises = response.data.map(roomDetails => {
          const studentPromises = roomDetails.roommates.map(studentId => {
            return StudentService.getStudentById(studentId)
              .then(studentResponse => studentResponse.data)
              .catch(error => {
                console.error('Error fetching student details:', error.response ? error.response.data : error.message);
                return {}; 
              });
          });
          return Promise.all(studentPromises)
            .then(students => {
              roomDetails.roommates = students.map(student => student.s_name);
              return roomDetails;
            });
        });

        Promise.all(promises)
          .then(updatedRoomDetails => setRoomDetailsList(updatedRoomDetails))
          .catch(error => console.error('Error updating room details:', error));
      })
      .catch(error => {
        console.error('Error fetching room details:', error.response ? error.response.data : error.message);
      });
  }, []);

  const handleCardClick = async (r_id, roomno, roommatesList) => {
    if (roommatesList.length >= 3) {
      alert('This room is full! Maximum 3 people allowed.');
      return;
    }

    try {
      // First, fetch the student to check if they already requested or have a room
      const studentRes = await StudentService.getStudentById(s_id);
      const student = studentRes.data;
      if (student.roomno) {
        alert('Not allowed: You have already requested or been allocated a room (' + student.roomno + ').');
        return;
      }
      
      const confirm = window.confirm('Request allotment for this room?');
      if (!confirm) return;

      // Set the roomno on the student to indicate the request
      await StudentService.selectRoomForStudent(s_id, roomno);
      alert('Room requested successfully! Please wait for staff to verify and allocate.');
      navigate('/slogin/token');
    } catch (error) {
      console.error('Error allocating room:', error);
      alert('Error requesting room.');
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {roomDetailsList.map((roomDetails, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleCardClick(roomDetails.r_id, roomDetails.roomno, roomDetails.roommates)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Room No: {roomDetails.roomno}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Block: {roomDetails.block}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Floor: {roomDetails.floor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roommates: {roomDetails.roommates.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Room;
