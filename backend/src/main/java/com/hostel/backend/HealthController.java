package com.hostel.backend;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Diagnostic endpoints.
 *
 * GET /api/health     -> does NOT touch MongoDB. Proves the backend is reachable and awake.
 * GET /api/health/db  -> pings MongoDB and reports, in plain English, whether the database
 *                        can be reached.
 *
 * If /api/health is UP but /api/health/db is DOWN, the Render service is fine and the
 * problem is the MongoDB Atlas connection (almost always the Network Access allow-list).
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    /** Must stay in sync with MongoConfig#getDatabaseName(). */
    private static final String DATABASE_NAME = "hostel_db";

    /** Keep the probe fast so the diagnostic never hangs for 30s. */
    private static final long PROBE_TIMEOUT_SECONDS = 5;

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @GetMapping
    public Map<String, Object> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("service", "hostel-admission-backend");
        return body;
    }

    @GetMapping("/db")
    public ResponseEntity<Map<String, Object>> database() {
        Map<String, Object> body = new LinkedHashMap<>();

        // A short-lived client is built here on purpose: MongoClient is not an injectable
        // bean in Spring Data MongoDB 5.x, and a throwaway client keeps this probe isolated
        // from the application's own connection pool.
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(mongoUri))
                .applyToClusterSettings(builder ->
                        builder.serverSelectionTimeout(PROBE_TIMEOUT_SECONDS, TimeUnit.SECONDS))
                .applyToSocketSettings(builder ->
                        builder.connectTimeout((int) PROBE_TIMEOUT_SECONDS, TimeUnit.SECONDS))
                .build();

        try (MongoClient client = MongoClients.create(settings)) {
            Document result = client.getDatabase(DATABASE_NAME)
                    .runCommand(new Document("ping", 1));
            body.put("status", "UP");
            body.put("database", DATABASE_NAME);
            body.put("ping", result.get("ok"));
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            body.put("status", "DOWN");
            body.put("database", DATABASE_NAME);
            body.put("error", e.getClass().getSimpleName());
            body.put("message", e.getMessage());
            body.put("hint",
                    "The backend cannot reach MongoDB Atlas. Verify that the cluster is running "
                  + "and that Render's outbound IPs are allowed: MongoDB Atlas -> Security -> "
                  + "Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body);
        }
    }
}


