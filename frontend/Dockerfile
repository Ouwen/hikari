FROM ubuntu:14.04

RUN apt-get update && apt-get install -y \
      curl \
      build-essential \
&&  curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \
&&  apt-get install -y \
      nodejs \
      ruby-dev \
      rubygems-integration

RUN gem install sass compass
RUN npm install -g bower grunt-cli

ADD ./src/client /src/client
ADD ./src/e2e /src/e2e
ADD ./src/bower.json /src
ADD ./src/package.json /src
ADD ./src/local.env.json /src
ADD ./src/package.json /src
ADD ./src/protractor.conf.js /src
ADD ./src/Gruntfile.js /src
ADD ./src/.jsbeautifyrc /src
ADD ./src/.bowerrc /src

WORKDIR /src

RUN npm install
RUN bower install --allow-root

EXPOSE 9000
EXPOSE 35729

CMD ["grunt", "serve"]
