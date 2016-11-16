#!/bin/bash

psql --username postgres -v schema_directory="/src/schema" -a -f /src/schema/main.sql
