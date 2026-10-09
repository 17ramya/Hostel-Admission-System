import axios from 'axios';

// Base URL of the backend REST API.
//
// It defaults to the deployed Render backend, but it can be overridden without editing
// the source by defining REACT_APP_API_BASE_URL (e.g. in frontend/.env):
//
//   REACT_APP_API_BASE_URL=http://localhost:8080     # local development
//
// Create React App inlines REACT_APP_* variables at BUILD time, so on Render the variable
// has to be set before the static site is built.
const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || 'https://hostel-admission-system.onrender.com'
).replace(/\/+$/, '');

const STUDENTS_REST_API_URL = `${API_BASE_URL}/api/Student`;
const ROOM_REST_API_URL = `${API_BASE_URL}/api/Room`;
const ADMISSIONS_REST_API_URL = `${API_BASE_URL}/api/Admission`;

class StudentService {
    
  getStudents() {
    return axios.get(STUDENTS_REST_API_URL);
  }

  register(studentRequest) {
    return axios.post(`${STUDENTS_REST_API_URL}/register`, studentRequest);
  }

  login(regno, password) {
    return axios.post(`${STUDENTS_REST_API_URL}/login`, { regno, password });
  }
  getStudentById(s_id) {
    return axios.get(`${STUDENTS_REST_API_URL}/${s_id}`);
  }
  YearAndAno(year,ano) {
    return axios.get(`${ADMISSIONS_REST_API_URL}/${year}/${ano}`);
  }
 getAdmissionsByYear(year) {
    return axios.get(`${ADMISSIONS_REST_API_URL}/${year}`);
  }
  updateAdmissionStatus(regno, adStatus) {
    return axios.patch(`${STUDENTS_REST_API_URL}/adStatus/${regno}`, null, {
      params: { ad_status: adStatus }
    });
  }

  updatePaymentStatus(regno, paystatus) {
    return axios.patch(`${STUDENTS_REST_API_URL}/payStatus/${regno}`, null, {
      params: { pay_status: paystatus },
    });
  }

  createAdmission(admissionRequest) {
    return axios.post(`${ADMISSIONS_REST_API_URL}/apply`, admissionRequest);
  }
  getRooms(){
    return axios.get(ROOM_REST_API_URL);
  }
  addStudentToRoommates(r_id, s_id){

      return axios.patch(`${ROOM_REST_API_URL}/${r_id}/addStudent`,null,{
        params:{studentId:s_id}
      });
      
  }
 selectRoomForStudent(s_id, roomno){
    return axios.patch(`${STUDENTS_REST_API_URL}/${s_id}/selectRoom`, null, {
        params: { roomno: roomno }
      });
}
}

export default new StudentService();
