## nodejs LTS 중 10.16.3 을 사용
FROM node:10.16.3-alpine

COPY server/package.json /server/package.json
COPY server/src /server/src
RUN cd /server; npm install

WORKDIR /server

CMD npm run start
EXPOSE 3000
