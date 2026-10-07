package com.hostel.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AdmissionRepository extends MongoRepository<Admission, String> {
    List<Admission> findByYear(String year);
    Admission findByYearAndAno(String year, String ano);
}
