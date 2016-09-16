# Database

In this folder exists all the relations used by the backend.

For development mode, tables are deleted and added an initial seed is run.

For production mode, data is stored in the folder data-volume, this data image
should be backed up daily via a cron job that pushes to s3.

In later deployment stages, the database should sit on something like RDS. Each database update
should create a new database, and migrate existing data.

For early development we can run the database straight out of docker.
