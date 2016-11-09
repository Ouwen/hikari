# Core
This contains the core microservice in charge of handling authentication, and
user resource.

## Connecting
Any other microservice which needs to be authenticated will use the same
public key for decryption.


Or use the certificates in the certificates folder and run this command
`cp -r ./certificates /usr/local/etc/nginx/ssl`

## TODO
1. Setup Docker with docker compose
