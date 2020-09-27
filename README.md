### Local Development Usage

The node application here is driven by yarn and utilizes the scripts defined in package.json.  
We currently have 2 profiles to run on, development and production.  Below is the instructions 
on how to run either.

## Installing Dependencies with Yarn
We first must install all the node modules needed for this project.  To this run the following 
command at the root of the project directory.

```shell script

yarn install

```

## Running on Development
The following scripts below run the application on development profile.
```shell script
# Default profile is dev
yarn start
# or to be explicit
yarn start:dev

```

## Running on Production
```shell script
# To point to the prod server, due to CORS you would not get any response if run locally
yarn start:prod
```

## Docker

To use docker in this repo, you must first install both docker and docker-compose.  The links below
direct you to instruction on how to install each.

Install Docker: https://docs.docker.com/get-docker/
Install Docker Compose: https://docs.docker.com/compose/install/

#### Building for Docker

We can build the container and pass in a build arg to specify which backend we want to point to.
Below is an example of building default images which are configured to point to the dev server:

```shell script
docker build 
# At the root of the project
docker build -t cth_frontend:dev .
```
The above will create an image aliased with 'cth_frontend:dev'.


To build one oriented to the production backend we run the following command.
```shell script
docker build --build-arg API_URL=https://www.civictechhub.org -t cth_frontend:prod .
```
This will create an image aliased with 'cth_frontend:prod' that points to prod server
The build arg we pass here to API_URL can be changed to build different images for 
different servers and environments.

Regardless of the API_URL the images are always built for production, making the frontend
optimized in the container.

#### Running for Docker

The quick way to run the application via docker where it would build and run in one command can 
be done with the following steps:

```shell script
# From project root
# For Dev Environment Backend running on optimized backend packaged image
docker-compose -f docker/docker-compose.yml up -d

#  If you would like it to rebuild the package first run the following
docker-compose -f docker/docker-compose.yml up -d --build

```

 Once up you can find the frontend in the exact same way as running yarn start locally:
 http://localhost:3000