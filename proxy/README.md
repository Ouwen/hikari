# Proxy

This folder contains code necessary for running an nginx proxy via a docker container.

## Customizing
The current nginx.conf assumes you are using docker-compose and that the
upstream `api_server` network `api:3000` exists. You will need to change
`api:3000` to `YOUR_IP:YOUR_PORT` for an external server.


## Running without docker-compose

For some use cases, running nginx alone may be useful. To do so, run the following command
where `internal_network_name` is the network nginx will use to refer to the network
of a container specified by `container_name`.

`
docker run -it --rm \
  -p 443:443 \
  -p 8080:8080 \
  -v ./nginx.conf:/etc/nginx/nginx.conf \
  -v ./certificates/:/etc/nginx/ssl \
  --link "container_name:internal_network_name"
`

If I had a container running named `my_app_container` that exposed port 3000.
Then the following command would work without any modification to nginx.conf

`
docker run -it --rm \
  -p 443:443 \
  -p 8080:8080 \
  -v ./nginx.conf:/etc/nginx/nginx.conf \
  -v ./certificates/:/etc/nginx/ssl \
  --link "my_app_container:api"
`

## Generating Certificates
If you would like to create your own self signed certificates rather than
use the ones provided, run through the following commands.

The common name should be `localhost` when creating self signed certificates.
This requires the installation of `openssl`.

`
openssl genrsa -des3 -out server.key 2048
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
`
