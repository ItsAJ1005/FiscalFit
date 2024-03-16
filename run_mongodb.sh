#!/bin/bash

# Define variables
MONGO_CONTAINER_NAME="mongodb_container"
MONGO_PORT="27017"

# Check if a MongoDB container is already running
if [ "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
    echo "MongoDB container is already running."
    exit 0
fi

# This container will not be removed until we explicitly remove it while the PC is powered on
# Check if a MongoDB container with the same name exists but stopped
if [ "$(docker ps -aq -f status=exited -f name=$MONGO_CONTAINER_NAME)" ]; then
    echo "Restarting stopped MongoDB container..."
    docker start $MONGO_CONTAINER_NAME
else
    # Run MongoDB container
    echo "Starting MongoDB container..."
    docker run -d --name $MONGO_CONTAINER_NAME -p $MONGO_PORT:27017 mongo

    # Check if MongoDB container is running
    if [ "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
        # dcoker exec -it $MONGO_CONTAINER_NAME
        # mongosh
        echo "MongoDB container is now running."
    else
        echo "Failed to start MongoDB container."
    fi
fi
