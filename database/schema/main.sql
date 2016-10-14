DROP DATABASE IF EXISTS "hikari-test";
CREATE DATABASE "hikari-test";
\c "hikari-test"

CREATE EXTENSION "uuid-ossp";

\cd :schema_directory

BEGIN;
\i users.sql
\i redis.sql
\i notifications.sql
COMMIT;
