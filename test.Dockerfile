FROM alpine

RUN apk add npm
RUN npm install -g artillery --allow-root --unsafe-perm=true

CMD ["/bin/sh"]