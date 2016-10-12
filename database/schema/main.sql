CREATE EXTENSION "uuid-ossp";

BEGIN;
\i utility.sql
\i users.sql
\i redis.sql
\i notifications.sql
COMMIT;
