# Usando imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas package.json
COPY backend/package.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY backend/ .

# Expor a porta usada pelo backend (exemplo: 4000)
EXPOSE 4000

# Comando para iniciar o servidor
CMD ["npm", "start"]
