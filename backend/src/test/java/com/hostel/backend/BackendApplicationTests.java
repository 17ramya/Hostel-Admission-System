package com.hostel.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Smoke test: the Spring context must start.
 *
 * <p>The connection string is pinned to a syntactically valid but deliberately unreachable URI so
 * the suite does not depend on the MONGO_URI environment variable being exported. MongoClient is
 * created lazily and this test never issues a query, so no cluster is required.
 */
@SpringBootTest(properties = "spring.data.mongodb.uri=mongodb://localhost:27017/hostel_db_test")
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
