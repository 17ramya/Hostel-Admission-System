import axios from 'axios';

const STUDENTS_REST_API_URL = 'http://localhost:8080/api/Student';
const ADMISSIONS_REST_API_URL = 'http://localhost:8080/api/Admission';
const ROOM_REST_API_URL = 'http://localhost:8080/api/Room';

class StudentService {
    
  getStudents() {
    return axios.get(STUDENTS_REST_API_URL);
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
