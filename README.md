# Running the hikari stack

1. Install docker. https://docs.docker.com/engine/installation/
2. Clone this repo. `git clone https://github.com/Ouwen/hikari.git`
3. Run `docker-compose up --build`
This will build containers and setup volumes for the database.
The api service will not run because the databases do not start in time.

4. Run `docker-compose down` then run `docker-compose up` again.
This will restart containers and the database containers will start before
the api service. A fix will be made in the future.
