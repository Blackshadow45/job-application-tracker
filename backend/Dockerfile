FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy pom.xml first (for caching)
COPY pom.xml .

# Install Maven + update certificates
RUN apk add --no-cache maven ca-certificates && update-ca-certificates

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/job-application-tracker-1.0.0.jar"]