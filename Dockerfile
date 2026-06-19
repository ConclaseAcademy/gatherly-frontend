# Stage 1: Compile the frontend distribution assets
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies separately to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# CRITICAL: Inject your Azure VM Backend API URL during the build phase
# Replace <YOUR_VM_PUBLIC_IP> with your actual Azure VM Public IP address
ENV VITE_API_URL=http://20.25.50.191:5144

# Compile the application (generates the 'dist' production directory)
RUN npm run build

# Stage 2: Serve the compiled static assets using Nginx
FROM nginx:alpine

# Copy the compiled assets from Stage 1 into the Nginx public web root
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard web port 80
EXPOSE 80

# Execute Nginx in the foreground to keep the container active
CMD ["nginx", "-g", "daemon off;"]