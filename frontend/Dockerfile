# Use the official Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files into the container
COPY . .

# Expose the port that the React application will run on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
