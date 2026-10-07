package com.hostel.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    private String r_id; // Added for frontend compatibility
    private String roomno;
    private String block;
    private String floor;
    private List<String> roommates = new ArrayList<>();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getR_id() { return r_id != null ? r_id : id; }
    public void setR_id(String r_id) { this.r_id = r_id; }
    public String getRoomno() { return roomno; }
    public void setRoomno(String roomno) { this.roomno = roomno; }
    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }
    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }
    public List<String> getRoommates() { return roommates; }
    public void setRoommates(List<String> roommates) { this.roommates = roommates; }
}
