# Use an official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install root dependencies
RUN npm install

# Copy the common-specific package.json
COPY ./packages/common/package.json ./packages/common/

# Change working directory to common package
WORKDIR /app/packages/common

# Install common-specific dependencies
RUN npm install

# Change working directory to root
WORKDIR /app

# Copy the rest of the common package files
COPY ./packages/common ./packages/common

# Command to start the development server or any process for common package
CMD ["npm", "run", "dev", "--prefix", "packages/common"]
