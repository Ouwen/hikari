# Core
This contains the core microservice in charge of handling authentication, and
user resource.

## Connecting
Any other microservice which needs to be authenticated will use the same
public key for decryption.

## Generating Certificates
Common name should be `localhost`
`
openssl genrsa -des3 -out server.key 2048
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
`

Or use the certificates in the certificates folder and run this command
`cp -r ./certificates /usr/local/etc/nginx/ssl`

## TODO
1. Setup Docker with docker compose
