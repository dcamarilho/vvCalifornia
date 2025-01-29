# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend files
COPY ./frontend /app

# Install dependencies
RUN npm install

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
