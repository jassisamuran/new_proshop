# Use official Node.js image as base
FROM node:latest as build-stage

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use lightweight Nginx image as final base
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose the port your app runs on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
