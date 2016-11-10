#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


if [ "$2" != 'all' ]; then
  read -p "Are you sure you want to override production database? " -n 1 -r
  echo    # (optional) move to a new line
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
  fi
fi

docker run -it --rm \
  -v $DIR/schema:/src/schema \
  -e PGPASSWORD=testtest \
  --network hikari_default \
  --link hikari_db_test_1:postgres postgres \
  psql -h postgres -U postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql

docker run -it --rm \
  -v $DIR/schema:/src/schema \
  -e PGPASSWORD=testtest \
  --network hikari_default \
  --link hikari_db_development_1:postgres postgres \
  psql -h postgres -U postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql

if [ "$2" != 'all' ]; then
  docker run -it --rm \
    -v $DIR/schema:/src/schema \
    -e PGPASSWORD=testtest \
    --network hikari_default \
    --link hikari_db_production_1:postgres postgres \
    psql -h postgres -U postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql
fi
