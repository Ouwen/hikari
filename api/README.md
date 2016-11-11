# API

## Updating the API
After running docker-compose up. If you want to update the API simply make changes
to the code. Grunt will auto watch for changes and restart the server.

## Adding a dependency
If you add a dependency to package.json you will have to rebuild the container.
Alternatively, if you want to play around with dependencies feel free to
bash into the running container with the following command.

`docker exec -it hikari_api_1 bash`

## Testing
Saving a test will auto run the testing suite.

## Running without docker-compose
It is possible to run the api code without docker-compose.

Install dependencies with `npm install`.
Alternatively you can copy the dependencies from the running docker compose container with
`docker cp hikari_api_1:/usr/src/node_modules ./api`

Install global grunt dependency with `npm install -g grunt-cli`.
Run the command `grunt serve`.

Your environmental vars should be reflected in `./server/config/local.env.js`

If your databases are running in docker containers ensure their ports are
exposed and use their bound IP address.
