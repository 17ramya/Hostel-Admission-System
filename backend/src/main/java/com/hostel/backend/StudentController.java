package com.hostel.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Student")
public class StudentController {
    
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @PostMapping("/register")
    public Student register(@RequestBody Student newStudent) {
        // Simple registration (should ideally hash passwords and check for existing regno)
        if (studentRepository.findByRegno(newStudent.getRegno()) != null) {
            return null; // Student already exists
        }
        return studentRepository.save(newStudent);
    }

    @PostMapping("/login")
    public Student login(@RequestBody Map<String, String> credentials) {
        String regno = credentials.get("regno");
        String password = credentials.get("password");
        Student student = studentRepository.findByRegno(regno);
        if (student != null && student.getPassword().equals(password)) {
            return student;
        }
        return null;
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PatchMapping("/adStatus/{regno}")
    public Student updateAdmissionStatus(@PathVariable String regno, @RequestParam("ad_status") String adStatus) {
        Student student = studentRepository.findByRegno(regno);
        if (student != null) {
            student.setAdStatus(adStatus);
            return studentRepository.save(student);
        }
        return null;
    }

    @PatchMapping("/payStatus/{regno}")
    public Student updatePaymentStatus(@PathVariable String regno, @RequestParam("pay_status") String payStatus) {
        Student student = studentRepository.findByRegno(regno);
        if (student != null) {
            student.setPayStatus(payStatus);
            return studentRepository.save(student);
        }
        return null;
    }

    @PatchMapping("/{s_id}/selectRoom")
    public Student selectRoomForStudent(@PathVariable String s_id, @RequestParam("roomno") String roomno) {
        Student student = studentRepository.findById(s_id).orElse(null);
        if (student == null) {
            student = studentRepository.findByRegno(s_id); // Fallback if frontend passes regno instead of ID
        }
        if (student != null) {
            student.setRoomno(roomno);
            return studentRepository.save(student);
        }
        return null;
    }
}
