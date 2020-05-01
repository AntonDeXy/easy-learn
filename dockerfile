FROM node:12.16 AS build

WORKDIR /usr/source/front/

COPY package.json /usr/source/front/package.json
COPY package-lock.json /usr/source/front/package-lock.json

RUN npm install

COPY . /usr/source/front/

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/source/front/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]