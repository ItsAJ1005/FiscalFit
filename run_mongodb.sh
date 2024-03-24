#!/bin/bash

MONGO_CONTAINER_NAME="mongodb_container"
MONGO_PORT="27017"

if [ "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
    echo "MongoDB container is already running."
    mongosh
    exit 0
fi

if [ "$(docker ps -aq -f status=exited -f name=$MONGO_CONTAINER_NAME)" ]; then
    echo "Restarting stopped MongoDB container..."
    docker start $MONGO_CONTAINER_NAME
    mongosh
else
    echo "Starting MongoDB container..."
    docker run -d --name $MONGO_CONTAINER_NAME -p $MONGO_PORT:27017 mongo

    if [ "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
        # dcoker exec -it $MONGO_CONTAINER_NAME
        mongosh
        echo "MongoDB container is now running."
    else
        echo "Failed to start MongoDB container."
    fi
fi
