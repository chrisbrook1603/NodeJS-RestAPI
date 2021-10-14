#!/bin/bash

################################################
#					       #
#  Shell Script to Build NodeApi-Project image #
#					       #
################################################

DIR=/home/christopher_brook/projectFolder
container_name=nodeapiproject
username=$(who)

if [ ! -d "DIR" ];
then
mkdir /home/christopher_brook/projectFolder && cd /home/<username>/projectFolder
if

echo "cloning latest git repository"
sudo git clone https://github.com/chrisbrook1603/NodeJS-RestAPI

echo "creating dockerfile"
echo -e "FROM node:14 \nWORKDIR /usr/src/app \nCOPY package*.json ./ n\RUN npm install n\COPY . . n\EXPOSE 8080 n\CMD [ 'node', 'start.js' ]"

echo "build image"
sudo docker build . t <username>/nodeapiproject

echo "run image"
sudo docker run -d -p 8080:8080 <username>/nodeapiproject