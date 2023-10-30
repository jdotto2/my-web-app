#!/bin/bash

# Author: Joshua Dotto
# Date: 2023-10-29

# This file serves as the entry point for
# my-web-app

node app.js &
node models/mqttData.js &
tail -f /dev/null # block the script from exiting to keep the container running!