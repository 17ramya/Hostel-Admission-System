FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Informational only - the real port comes from server.port=${PORT:8080} in
# application.properties, which binds to the PORT variable Render injects.
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
