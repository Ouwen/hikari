FROM ubuntu:14.04

COPY ./src/client /src/client
COPY ./src/e2e /src/e2e
COPY ["./src/bower.json", "./src/package.json", "./src/local.env.json", "./src/package.json", "./src/protractor.conf.js", "./src/Gruntfile.js", "./src/.jsbeautifyrc", "./src/.bowerrc", "/src/"]
WORKDIR /src

RUN apt-get update && apt-get install -y \
      curl \
      git \
      build-essential \
      git \
&&  curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \
&&  apt-get install -y \
      nodejs \
      ruby-dev \
      rubygems-integration

RUN gem install sass compass
RUN npm install -g bower grunt-cli && npm install && bower install --allow-root

EXPOSE 9000 35729

CMD ["grunt", "serve"]
