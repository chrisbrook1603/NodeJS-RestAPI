# NodeJS-RestAPI
This application is designed to provide a mock API service to a virtual products database. This is designed to demonstrate how NodeJS can be deployed to deliver a RESTful API service.

## Table of Contents
[General Info](#general-info)   |   
[Technologies](#technologies)   |   
[Installation](#installation)   |   
[Running the Application](#running-the-application)   |   
[Closing the Application](#closing-the-application)   |   
[Application Functionality](#application-functionality)   |   
[Testing the Application](#testing-the-application)   |   

## General Info
This Node JS application provides a range of RESTful API actions against a dummy virtual database. This application is designed to deomstrate how NodeJS can be used to create sufficent connectivity between a dummy database and the command line in order to impact hypothetical data.
This tool contains API calls that will:
* Create a new product
* Update an existing produce
* Read product details
* Delete a product

## Technologies
https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white

## Installation
To install the application, you will need to install a number of dependencies using the below command:
~~~ bash
$ npm install {PACKAGE-NAME}
~~~

Packages to be installed:
* Express
* Body-Parser
* Chalk
* nedb

## Running the Application
In order to run the application change directory to where the files have been cloned to and from your git bash terminal run:
~~~ bash
$ npm start
~~~

You should then see the following:
~~~ bash
API Listening on http://localhost:8080
~~~

## Closing the Application
n order to stop the application from the git bash terminal that is running the server press CTRL + C

## Application Functionality
**NOTE. For these commands anything surrounded by angled braces <> needs to be replaced by you**

### CREATE

To create the example product run the command:

~~~ bash
$ curl -s -X POST http://localhost:8080/product/create-new -H 'Content-type:application/json' -d '{"name":"example product", "description":"this is an example", "price":9.99, "count" : 1}'
~~~

### UPDATE All Details

To update all details of one of the products

~~~ bash
$ curl -s -X PUT http://localhost:8080/product/update/<id> -H 'Content-type:application/json'  -d '{"name":"updated product", "description":"its brand new", "price":99.99, "count": 55}'
~~~

### UPDATE Product Count

To update just the count of a product:

~~~ bash
$ curl -s -X PUT http://localhost:8080/product/update-count/<id>/<count> -H 'Content-type:application/json'
~~~

### READ (all)

To read all of the products run the command:

~~~ bash
$ curl -s -X GET http://localhost:8080/product/read
~~~

### READ (one)

To read one of the products run the command:

~~~ bash
$ curl -s -X GET http://localhost:8080/product/read/<id>
~~~

### DELETE

To delete one of the products run the command:

~~~ bash
$ curl -s -X DELETE http://localhost:8080/product/delete/<id>
~~~

## Testing

To run tests, from the terminal run the command:

~~~ bash
$ npm test
~~~
