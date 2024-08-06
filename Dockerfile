# Use the official Node.js image.
FROM node:18

# Set the working directory to /app.
WORKDIR /app

# Copy the root package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy all project files.
COPY . .

# Change to frontend directory and install dependencies.
WORKDIR /app/apps/frontend
RUN npm install

# Change to backend directory and install dependencies.
WORKDIR /app/apps/backend
RUN npm install

# Change back to root directory.
WORKDIR /app

# Expose the necessary ports.
EXPOSE 3000 5173

# Run the development command.
CMD ["npm", "run", "dev"]
