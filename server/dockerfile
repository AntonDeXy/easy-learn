FROM node:12.16

WORKDIR /usr/source/back

COPY package.json /usr/source/back/package.json

COPY package-lock.json /usr/source/back/package-lock.json

RUN npm install

COPY . /usr/source/back

CMD ["node", "server.js"]