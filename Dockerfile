FROM ubuntu:14.04

RUN apt-get update -y
RUN apt-get install curl -y
RUN apt-get install build-essential -y
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install nodejs -y
RUN apt-get install ruby-dev -y
RUN apt-get install rubygems-integration -y
RUN gem install sass
RUN gem install compass
RUN npm install -g bower grunt-cli

ADD ./src /src
WORKDIR /src

RUN npm install
RUN bower install --allow-root

EXPOSE 9000
EXPOSE 35729

CMD ["grunt", "serve"]
