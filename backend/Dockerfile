# Use the official OpenJDK base image
FROM openjdk:11

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/backend-service-0.0.1.jar /app/app.jar

# Expose the port that the application will run on
EXPOSE 8080

# Define the command to run the application
CMD ["java", "-jar", "app.jar"]
