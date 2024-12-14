# Use the official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Expose the application port - not needed?
# EXPOSE 8001

# Start the application
CMD ["npm", "start"]
