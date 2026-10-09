package com.hostel.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Cleans up a MongoDB connection string that arrived from an environment variable.
 *
 * <p>Environment values are frequently pasted straight out of documentation, chat messages or
 * markdown code fences, which drags along stray leading/trailing whitespace, newlines or a
 * wrapping backtick/quote. The driver rejects those characters with:
 *
 * <pre>
 * IllegalArgumentException: The connection string contains an invalid value for
 * 'connecttimeoutms'. '5000`' is not a valid integer
 * </pre>
 *
 * <p>Because {@code MongoClient} is created eagerly during context startup, that single stray
 * character takes the whole service down instead of failing one request. Normalising the value
 * here keeps a copy-paste slip from becoming an outage, while the warning tells you the
 * underlying Render configuration still deserves a clean-up.
 */
final class MongoUriSanitizer {

    private static final Logger log = LoggerFactory.getLogger(MongoUriSanitizer.class);

    private MongoUriSanitizer() {
        // Utility class.
    }

    /**
     * Trims whitespace and strips any wrapping backticks or quotes from a connection string.
     *
     * @param raw the value read from the environment / properties file, possibly {@code null}
     * @return the cleaned connection string, never {@code null}
     */
    static String normalize(String raw) {
        if (raw == null) {
            return "";
        }

        String value = raw;
        String previous;
        do {
            previous = value;
            value = value.trim();
            value = strip(value, '`');
            value = strip(value, '"');
            value = strip(value, '\'');
        } while (!value.equals(previous));

        if (!value.equals(raw)) {
            log.warn("The MongoDB connection string contained surrounding whitespace or wrapping "
                   + "characters, which have been ignored. Please correct the MONGO_URI value on "
                   + "Render so the stored configuration is valid on its own.");
        }
        return value;
    }

    /**
     * Removes a single wrapping pair of {@code wrapper} characters, if present.
     */
    private static String strip(String value, char wrapper) {
        int start = 0;
        int end = value.length();
        if (end > 0 && value.charAt(0) == wrapper) {
            start = 1;
        }
        if (end - 1 > start && value.charAt(end - 1) == wrapper) {
            end--;
        }
        return start == 0 && end == value.length() ? value : value.substring(start, end);
    }
}
