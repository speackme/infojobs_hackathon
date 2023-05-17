# Utilice una imagen de Node.js como base node:18.14.2
FROM node:18.14.2

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Copiar el código fuente de la aplicación
COPY . .

# Instalar dependencias
RUN npm install

# Constuir aplicación para producción
RUN npm run build

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
CMD npm run start
