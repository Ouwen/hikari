# Hikari Client
This is the client of Hikari. It is a pure angular application. Hikari is a lightweight template for making Angular Material 1.x applications. Included is an authentication system (login, logout), splash page, sidebar, navbar, dashboard, and account settings.

### Table of contents
- [Installation](#installation)
- [Deployment](#deployment)
- [Tests](#tests)
- [Docker](#docker)

## Installation
1) Install Node. The dev environment requires a Node to be installed.
Installation instructions for Node can be found at http://www.nodejs.org.

2) Ensure that ```npm``` (Node Package Manager) is available on the command
line. It ships with
Node and should be installed.

3) Install Ruby and RVM (Ruby Version Manager) - this is available at
http://installrails.com/steps/install_rails. Ensure that the command ```gem``` is
available on the command line.

Run the following commands from the working directory:
```
npm install
npm install -g bower
bower install
gem install compass
```

## Deployment

```
grunt serve
```
Will run a development environment on localhost:9000, you can change the server paths in the bower.json document.

```
grunt serve:dist
```
Will compile the app and serve the compiled app at localhost:8080.


```
grunt
```
Will test and run a production environment locally on localhost:8080

## Tests
When creating a new view be sure to make an e2e test of the page. This will run a chrome browser for an end-to-end test.

## Docker
If you would like to dev without the need of installing deps, install docker and start the `./run.sh` script.
(TODO) Currently grunt test and grunt build do not work in the docker version see github issues for more details.
