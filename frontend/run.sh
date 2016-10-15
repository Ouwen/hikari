#!/bin/bash

if [[ "$(docker images -q hikari-docker:1.0.0 2> /dev/null)" == "" ]]; then
  docker build -t hikari-docker:1.0.0 $1
fi

if [[ "$(docker ps | grep hikari-docker:1.0.0 2> /dev/null)" == "" ]]; then
  docker run -it -d \
  -p 9000:9000 -p 35729:35729 -v $1/src/client:/src/client hikari-docker:1.0.0
fi

open http:/0.0.0.0:9000
