FROM node:22-alpine as base

RUN npm install --global http-server

WORKDIR /usr/src/app

COPY ./build/ .

EXPOSE 3000

CMD http-server /usr/src/app -p 3000
