# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# FIX: Define a Build Argument that Vite can see during 'npm run build'
ARG VITE_API_URL=http://20.25.50.191:5144
ENV VITE_API_URL=$VITE_API_URL

# Compile the application (generates the 'dist' production directory)
RUN npm run build

# Stage 2: Serve the production assets with Nginx
FROM nginx:1.25-alpine
# Copy the custom nginx config we wrote above
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the compiled static files from Stage 1 into the default Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure your custom nginx config is copied over
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard web port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
