FROM alpine

RUN apk add npm
RUN npm install -g artillery --allow-root --unsafe-perm=true

ENTRYPOINT ["/usr/local/bin/artillery"]