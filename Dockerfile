# Imagen base
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponemos el puerto por defecto de Vite
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo
# El flag --host es vital para que Docker permita ver la web
CMD ["npm", "run", "dev", "--", "--host"]