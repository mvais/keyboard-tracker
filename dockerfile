FROM node:18-alpine3.16 AS base

WORKDIR /keyboard-tracker

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]
