# Stage 1: Compile the frontend distribution assets
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies separately to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# FIX: Define a Build Argument that Vite can see during 'npm run build'
ARG VITE_API_URL=http://20.25.50.191:5144
ENV VITE_API_URL=$VITE_API_URL

# Compile the application (generates the 'dist' production directory)
RUN npm run build

# Stage 2: Serve the compiled static assets using Nginx
FROM nginx:alpine

# Copy the compiled assets from Stage 1 into the Nginx public web root
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure your custom nginx config is copied over
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard web port 80
EXPOSE 80

# Execute Nginx in the foreground to keep the container active
CMD ["nginx", "-g", "daemon off;"]