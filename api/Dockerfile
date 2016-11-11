FROM node:6.9.1

ADD . /usr/src
WORKDIR /usr/src

ENV PUBLIC_KEY_PATH /usr/src/server/keys/key.pub.pem
ENV PRIVATE_KEY_PATH /usr/src/server/keys/key.pem

RUN npm install -g grunt-cli
RUN npm install -f
