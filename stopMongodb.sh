#!/bin/bash

# Define variables
MONGO_CONTAINER_NAME="mongodb_container"
# MONGO_PORT="27017"

# Check if a MongoDB container is already running
if [ "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
    docker kill $MONGO_CONTAINER_NAME
    echo "Docker container stoped successfully"
    exit 0
else 
    echo "Docker container is not running"
fi