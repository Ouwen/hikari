DROP DATABASE IF EXISTS "hikari";
CREATE DATABASE "hikari";
\c "hikari"

CREATE EXTENSION "uuid-ossp";

\cd :schema_directory

BEGIN;
\i users.sql
\i redis.sql
\i notifications.sql
COMMIT;
