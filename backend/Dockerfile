FROM node:current-slim

RUN apt-get update

WORKDIR /app/

COPY package.json /app/package.json
RUN npm install

EXPOSE 3000

COPY . /app

WORKDIR /app/src

CMD node app.js