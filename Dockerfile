# Usando a imagem oficial do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json antes do código-fonte para otimizar cache
COPY ./frontend/package.json ./

# Instalar dependências antes de copiar o restante do código
RUN npm install

# Copiar o restante do código-fonte
COPY ./frontend .

# Garantir que socket.io-client esteja instalado corretamente
RUN npm install socket.io-client --legacy-peer-deps

# Rodar build do Next.js
RUN npm run buildt

# Expor porta do servidor
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
