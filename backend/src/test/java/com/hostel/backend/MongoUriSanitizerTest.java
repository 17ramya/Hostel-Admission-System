package com.hostel.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Regression tests for {@link MongoUriSanitizer}.
 *
 * <p>These pin down a real Render outage. The MONGO_URI environment variable had picked up the
 * closing backtick of a markdown code fence while being copy-pasted, which made context startup
 * abort with:
 *
 * <pre>
 * IllegalArgumentException: The connection string contains an invalid value for
 * 'connecttimeoutms'. '5000`' is not a valid integer
 * </pre>
 */
class MongoUriSanitizerTest {

    /**
     * A complete, valid Atlas connection string, including the timeout options that produced the
     * confusing "5000` is not a valid integer" message.
     */
    private static final String VALID_URI =
            "mongodb+srv://user:pw@cluster.ask9m7i.mongodb.net/hostel_db"
          + "?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&connectTimeoutMS=5000";

    @Test
    @DisplayName("strips the trailing backtick that broke the Render deploy")
    void stripsTrailingBacktick() {
        assertEquals(VALID_URI, MongoUriSanitizer.normalize(VALID_URI + "`"));
    }

    @Test
    @DisplayName("strips a trailing backtick plus the newline of a copied code block")
    void stripsTrailingBacktickAndNewline() {
        assertEquals(VALID_URI, MongoUriSanitizer.normalize(VALID_URI + "`\r\n"));
        assertEquals(VALID_URI, MongoUriSanitizer.normalize(VALID_URI + "`\n   "));
    }

    @Test
    void stripsWrappingBackticksAndQuotes() {
        assertEquals(VALID_URI, MongoUriSanitizer.normalize("`" + VALID_URI + "`"));
        assertEquals(VALID_URI, MongoUriSanitizer.normalize("\"" + VALID_URI + "\""));
        assertEquals(VALID_URI, MongoUriSanitizer.normalize("'" + VALID_URI + "'"));
    }

    @Test
    void trimsSurroundingWhitespace() {
        assertEquals(VALID_URI, MongoUriSanitizer.normalize("  " + VALID_URI + "\r\n"));
    }

    @Test
    void leavesAValidUriUntouched() {
        assertEquals(VALID_URI, MongoUriSanitizer.normalize(VALID_URI));
    }

    @Test
    void copesWithMissingOrDegenerateValues() {
        assertEquals("", MongoUriSanitizer.normalize(null));
        assertEquals("", MongoUriSanitizer.normalize(""));
        assertEquals("", MongoUriSanitizer.normalize("`"));
        assertEquals("", MongoUriSanitizer.normalize("   "));
    }

    @Test
    @DisplayName("the cleaned value ends exactly with the timeout option")
    void cleanedValueEndsWithTimeoutOption() {
        String cleaned = MongoUriSanitizer.normalize(VALID_URI + "`");
        assertEquals("connectTimeoutMS=5000", cleaned.substring(cleaned.length() - 21));
    }
}
