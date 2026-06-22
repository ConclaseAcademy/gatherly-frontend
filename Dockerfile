# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the production assets with Nginx
FROM nginx:1.25-alpine
# Copy the custom nginx config we wrote above
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the compiled static files from Stage 1 into the default Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
