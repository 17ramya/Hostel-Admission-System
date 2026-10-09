package com.hostel.backend;

import com.mongodb.MongoException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Turns the opaque Spring Boot "Whitelabel Error Page" (status=500) into a JSON body that
 * actually says what went wrong.
 *
 * Without this, an unreachable MongoDB surfaces as:
 *   "There was an unexpected error (type=Internal Server Error, status=500)."
 * With this, the browser/Postman shows:
 *   {"status":503,"error":"MONGO_UNAVAILABLE","message":"Cannot reach MongoDB Atlas..."}
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({MongoException.class, DataAccessException.class})
    public ResponseEntity<Map<String, Object>> handleMongoUnavailable(Exception ex) {
        log.error("MongoDB is unavailable: {}", ex.getMessage(), ex);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        body.put("error", "MONGO_UNAVAILABLE");
        body.put("message", "Cannot reach MongoDB Atlas, so the request could not be served.");
        body.put("detail", ex.getMessage());
        body.put("hint",
                "Check MongoDB Atlas -> Security -> Network Access and allow access from "
              + "anywhere (0.0.0.0/0) so the Render service's dynamic IPs are not blocked.");
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        log.error("Unhandled error", ex);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", ex.getClass().getSimpleName());
        body.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
