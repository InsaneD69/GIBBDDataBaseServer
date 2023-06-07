FROM node:18 
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm install ts-node --save-dev

