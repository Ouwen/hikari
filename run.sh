#!/bin/bash

docker build -t hikari-docker ./frontend
docker run -it -p 9000:9000 -p 35729:35729 -v $PWD/frontend/src/client:/src/client hikari-docker
