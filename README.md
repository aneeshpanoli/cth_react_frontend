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

yarn start

# or to be explicit

yarn start dev

```

## Running on Production (Should not be done locally)
```shell script

yarn start prod

```

### Running with Docker

To use docker in this repo, you must first install both docker and docker-compose.  The links below
direct you to instruction on how to install each.

Install Docker: https://docs.docker.com/get-docker/
Install Docker Compose: https://docs.docker.com/compose/install/

Once the required tools have been installed we can build the project locally as an image with the following 
command at the root.

```shell script

docker build -t cth_frontend:latest .

```
The above command will create a local docker image for you with the alias 'th_frontend:latest'.
This is defined by the -t command with docker which stands for tag you want to give to the image 
being built.


The quick way to run the application via docker where it would build and run in one command can 
be done with the following steps:

```shell script

# Go to docker directory
cd docker

# From here we will run the docker-compose services as detached from our terminal
docker-compose up -d

```

 Once up you can find the frontend in the exact same way as running yarn start locally:
 http://localhost:3000