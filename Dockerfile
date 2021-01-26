FROM node:9-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js .
COPY server.js .
COPY db.js .
COPY products.js .
COPY providersResource.js .
COPY passport.js .
COPY apikeys.js .
COPY setupbd.js .
COPY tests

EXPOSE 3000

CMD npm start