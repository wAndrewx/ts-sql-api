FROM node:16

USER root

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm" , "run" , "dev"]
