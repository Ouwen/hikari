FROM node:6.9.1

ADD . /usr/src
WORKDIR /usr/src

ENV PUBLIC_KEY_PATH /usr/src/server/keys/key.pub.pem
ENV PRIVATE_KEY_PATH /usr/src/server/keys/key.pem
ENV DATABASE_POOL_SIZE 25
ENV NODE_ENV development
ENV PORT 3000

RUN npm install -g grunt-cli

# replace this with your application's default port
EXPOSE 3000
