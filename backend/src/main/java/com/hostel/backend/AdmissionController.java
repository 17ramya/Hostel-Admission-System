package com.hostel.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Admission")
public class AdmissionController {

    @Autowired
    private AdmissionRepository admissionRepository;

    @PostMapping("/apply")
    public Admission createAdmission(@RequestBody Map<String, Object> admissionRequest) {
        Admission admission = new Admission();
        if(admissionRequest.containsKey("year")) admission.setYear((String) admissionRequest.get("year"));
        if(admissionRequest.containsKey("ano")) admission.setAno((String) admissionRequest.get("ano"));
        admission.setDetails(admissionRequest);
        return admissionRepository.save(admission);
    }

    @GetMapping("/{year}")
    public List<Admission> getAdmissionsByYear(@PathVariable String year) {
        List<Admission> list = admissionRepository.findByYear(year);
        if (list.isEmpty()) {
            Admission a1 = new Admission();
            a1.setYear(year);
            a1.setAno("1232");
            a1.setRegno("2021503055");
            a1.setS_name("THASNEEM FATHIMA M");
            a1.setDept("Computer Science");
            admissionRepository.save(a1);
            
            Admission a2 = new Admission();
            a2.setYear(year);
            a2.setAno("1234");
            a2.setRegno("2021327371");
            a2.setS_name("STUDENT 2");
            a2.setDept("Computer Science");
            admissionRepository.save(a2);
            
            return admissionRepository.findByYear(year);
        }
        return list;
    }

    @GetMapping("/{year}/{ano}")
    public Admission getYearAndAno(@PathVariable String year, @PathVariable String ano) {
        return admissionRepository.findByYearAndAno(year, ano);
    }
}
