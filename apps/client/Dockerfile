# Use an official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install root dependencies
RUN npm install

# Copy the client-specific package.json
COPY ./apps/client/package.json ./apps/client/

# Change working directory to client
WORKDIR /app/apps/client

# Install client dependencies
RUN npm install

# Change back to the root directory 
WORKDIR /app

# Copy the rest of the client application files
COPY ./apps/client ./apps/client

# Expose the port Vite runs on (by default Vite uses 5173)
EXPOSE 5173

# Command to start the development server with hot-reloading
CMD ["npm", "run", "dev", "--prefix", "apps/client"]
