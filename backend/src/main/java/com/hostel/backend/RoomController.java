package com.hostel.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/Room")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getRooms() {
        List<Room> rooms = roomRepository.findAll();
        if (rooms.isEmpty()) {
            for (int i = 1; i <= 4; i++) {
                Room r = new Room();
                r.setRoomno(String.valueOf(100 + i));
                r.setBlock("A");
                r.setFloor("1st");
                roomRepository.save(r);
            }
            return roomRepository.findAll();
        }
        return rooms;
    }

    @PatchMapping("/{r_id}/addStudent")
    public Room addStudentToRoommates(@PathVariable String r_id, @RequestParam("studentId") String s_id) {
        Room room = roomRepository.findById(r_id).orElse(null);
        if (room != null) {
            if (!room.getRoommates().contains(s_id)) {
                room.getRoommates().add(s_id);
            }
            return roomRepository.save(room);
        }
        return null;
    }
}
