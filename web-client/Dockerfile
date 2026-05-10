
# Dockerfile Dev

# FROM node:22-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

# Dockerfile Production

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_GO_API_URL

ENV VITE_GO_API_URL=$VITE_GO_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]