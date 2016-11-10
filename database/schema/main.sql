ALTER DATABASE hikari CONNECTION LIMIT 1;

SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'hikari';

DROP DATABASE IF EXISTS hikari;
CREATE DATABASE "hikari";
\c "hikari"

CREATE EXTENSION "uuid-ossp";

\cd :schema_directory

BEGIN;
\i users.sql
\i redis.sql
\i notifications.sql
\i seed.sql
COMMIT;
