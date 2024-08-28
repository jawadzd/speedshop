FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
CMD ["npm", "start"]
# FROM nginx:alpine
# COPY --from=build-stage /app/dist/SPEEDSHOP /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]