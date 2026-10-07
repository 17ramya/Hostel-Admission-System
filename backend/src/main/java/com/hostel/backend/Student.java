package com.hostel.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String s_id;
    private String regno;
    private String s_name;
    private String dept;
    private String year;
    private String password;
    private String adStatus;
    private String payStatus;
    private String roomno;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getS_id() { return s_id != null ? s_id : id; }
    public void setS_id(String s_id) { this.s_id = s_id; }
    public String getRegno() { return regno; }
    public void setRegno(String regno) { this.regno = regno; }
    public String getS_name() { return s_name; }
    public void setS_name(String s_name) { this.s_name = s_name; }
    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAdStatus() { return adStatus; }
    public void setAdStatus(String adStatus) { this.adStatus = adStatus; }
    public String getPayStatus() { return payStatus; }
    public void setPayStatus(String payStatus) { this.payStatus = payStatus; }
    public String getRoomno() { return roomno; }
    public void setRoomno(String roomno) { this.roomno = roomno; }
}
