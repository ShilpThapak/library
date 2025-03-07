# Use official Node.js image
FROM node:23.7.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
