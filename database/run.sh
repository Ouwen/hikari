#!/bin/bash

if [[ "$(docker images -q postgres 2> /dev/null)" == "" ]]; then
  docker pull postgres
fi

if [[ "$(docker ps | grep test-postgres 2> /dev/null)" == "" ]]; then
  docker run -d -p 5433:5432 \
    --name test-postgres \
    -e POSTGRES_PASSWORD=testtest \
    -v $1/data/test:/var/lib/postgresql/data \
   postgres
  sleep 3
fi

docker run -it --rm \
  -v $1/schema:/src/schema \
  --link test-postgres:postgres postgres \
  psql -h postgres -U postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql
