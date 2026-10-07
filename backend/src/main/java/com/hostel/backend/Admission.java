package com.hostel.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "admissions")
public class Admission {
    @Id
    private String id;
    private String a_id;
    private String year;
    private String ano;
    private String regno;
    private String s_name;
    private String dept;
    private Map<String, Object> details;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getA_id() { return a_id != null ? a_id : id; }
    public void setA_id(String a_id) { this.a_id = a_id; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getAno() { return ano; }
    public void setAno(String ano) { this.ano = ano; }
    public String getRegno() { return regno; }
    public void setRegno(String regno) { this.regno = regno; }
    public String getS_name() { return s_name; }
    public void setS_name(String s_name) { this.s_name = s_name; }
    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }
    public Map<String, Object> getDetails() { return details; }
    public void setDetails(Map<String, Object> details) { this.details = details; }
}
