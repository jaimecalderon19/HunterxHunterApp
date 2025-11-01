# ====== ETAPA 1: Construcción de la app ======
FROM node:18-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiamos los archivos necesarios
COPY package*.json ./
COPY app.json ./
COPY . .

# Instalamos dependencias
RUN npm install -g expo-cli
RUN npm install

# Generamos el build para web
RUN npx expo export --platform web

# ====== ETAPA 2: Servidor Nginx ======
FROM nginx:stable-alpine

# Copiamos el build generado al servidor web
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazamos la configuración por defecto de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
