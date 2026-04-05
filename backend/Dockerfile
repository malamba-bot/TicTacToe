# --- Builder stage: compile the app ---
FROM gradle:9.4.0-jdk25 AS builder
WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradle gradle
COPY gradlew .
COPY build.gradle.kts gradle.properties settings.gradle.kts ./

# Copy source
COPY src src

# Build the fat JAR
RUN ./gradlew clean build --no-daemon

# --- Runtime stage: run the app ---
FROM eclipse-temurin:25
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
