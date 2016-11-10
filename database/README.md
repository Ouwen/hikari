# Database

## First time setup
In order to setup the 3 databases, `test`, `development`, and `production`
run the following command `bash update.sh all`

Respond `y` to overriding the production database.

## Updating the schema
After running docker-compose up. If you want to update the schema you should run the following command.

`docker run -it --rm \
  -v [PATH/TO/SCHEMA]:/src/schema \
  -e PGPASSWORD=testtest \
  --network hikari_default \
  --link hikari_db_[test|development]_1:postgres postgres \
  psql -h postgres -U postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql
`

The [PATH/TO/SCHEMA] is the directory containing the main.sql file you wish to run.
This can be used to completely override the existing test, development, or production
databases.

The command `bash update.sh` will refresh the `test` and `development` databases on changes to the schema.
update.sh requires that docker-compose is running.
