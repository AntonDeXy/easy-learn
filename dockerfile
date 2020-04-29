FROM node:12.16

WORKDIR /usr/source/front

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]