# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port on which the API will run
EXPOSE 3000

# Start the API server
CMD ["npm", "start"]
