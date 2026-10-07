import React, { useEffect, useState } from 'react';
import StudentService from '../../services/studentService';
// import AdmissionService from '../../services/admissionService';
const Test = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
   StudentService.getAdmissionsByYear(parseInt(2023))
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  return (
    <div>
      <h2>Student Details</h2>
      <ul>
           {students.s_name} - {students.regno}
  
      </ul>
    </div>
  );
};

export default Test;
