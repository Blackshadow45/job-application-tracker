FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY pom.xml .

RUN apt-get update && apt-get install -y maven ca-certificates

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/job-tracker.jar"]