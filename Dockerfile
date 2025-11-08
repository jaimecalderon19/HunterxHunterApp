FROM node:18-alpine AS builder

WORKDIR /app


COPY package*.json ./
COPY app.json ./
COPY . .

RUN npm install -g expo-cli
RUN npm install

RUN npx expo export --platform web

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
