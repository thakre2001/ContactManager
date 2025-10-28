# --- STAGE 1: Build the Application ---
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code
# Note: Since your backend is in the 'backend' folder, Render's Root Directory setting
# handles this path, so './' refers to the 'backend' folder contents.
COPY . .

# Build the JAR file. The '-DskipTests' flag skips running tests to speed up the build.
RUN mvn clean package -DskipTests

# --- STAGE 2: Create the Final Lightweight Image ---
# Use a smaller, secure base image for the final running application
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory for the application
WORKDIR /app

# Copy the generated JAR file from the builder stage
# The JAR file is typically found in the target/ directory
# Use the correct JAR name based on your project artifact ID
COPY --from=builder /app/target/*.jar app.jar

# Define the command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the default Spring Boot port (often 8080)
EXPOSE 8080