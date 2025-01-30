# Usando imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas package.json
COPY frontend/package.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY frontend/ .

# Construir o projeto
RUN npm run build

# Expor a porta usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
