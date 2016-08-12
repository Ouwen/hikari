#!/bin/bash

docker build -t hikari-docker .
docker run -it -p 9000:9000 -p 35729:35729 -v $PWD/src:/src hikari-docker
