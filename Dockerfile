# Use a imagem oficial do Node.js
FROM node:16.19.1-alpine3.17

# Cria e define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3000

# Define o comando para rodar a aplicação
CMD ["npm", "start"]
