FROM node:6.9.1

ADD . /usr/src
WORKDIR /usr/src

RUN npm install -g bower grunt-cli && npm install && bower install --allow-root
RUN npm rebuild node-sass

CMD ["grunt", "serve"]
