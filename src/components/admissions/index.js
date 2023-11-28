
// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Admissions = () => {
//   const navigate = useNavigate();
//   const admissionDetails = [
//     { ano: 1232, regno: '2021503055', name: 'THASNEEM FATHIMA M', dept: 'Computer Science', c1: 'Link1', c2: 'Link2', c3: 'Link3', c4: 'Link4' },
//     { ano: 1234, regno: '2021327371', name: 'sdgeudeufhwjhd', dept: 'Computer Science', c1: 'Link1', c2: 'Link2', c3: 'Link3', c4: 'Link4' }
//   ];

//   const handleCardClick = (ano) => {
//     navigate(`/tlogin/one/${ano}`);
//   };

//   return (
//     <div>
//       {admissionDetails.map((admission, index) => (
//         <Card
//           key={index}
//           onClick={() => handleCardClick(admission.ano)}
//           style={{ cursor: 'pointer', width: '200px', height: '100px', marginBottom: '20px' }}
//         >
//           <CardContent>
//             <Typography variant="h6" component="div">
//               {admission.regno}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {admission.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {admission.dept}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Admissions;
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams  } from 'react-router-dom';
// import AdmissionService from '../../services/admissionService';
import StudentService from '../../services/studentService';

const Admissions = () => {
  const navigate = useNavigate();
  const [admissionDetails, setAdmissionDetails] = useState([]);
  const { year } = useParams(); 
  useEffect(() => {
    
    StudentService.getAdmissionsByYear(parseInt(year))
      .then(response => {
        setAdmissionDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching admissions:', error.response ? error.response.data : error.message);
      });
  }, []); 

  const handleCardClick = (ano) => {
    navigate(`/tlogin/${year}/${ano}`);
  };

  return (
    <div>
      {admissionDetails.map((admission) => (
        <Card
          key={admission.a_id}
          onClick={() => handleCardClick(admission.ano)}
          style={{ cursor: 'pointer', width: '200px', height: '100px', marginBottom: '20px' }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {admission.regno}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {admission.s_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {admission.dept}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Admissions;
