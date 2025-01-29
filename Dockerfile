
# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend files to the container
COPY ./frontend /app

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
