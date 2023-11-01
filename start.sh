#!/bin/bash

# Author: Joshua Dotto
# Date: 2023-10-29

# This file serves as the entry point for
# my-web-app

nohup node app.js >> app.log 2>&1 &
nohup node models/mqttData.js >> app.log 2>&1 &