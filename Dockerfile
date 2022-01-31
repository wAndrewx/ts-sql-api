FROM node:16

USER root

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

# EXPOSE 8000:8000

CMD ["npm" , "run" , "start"]
