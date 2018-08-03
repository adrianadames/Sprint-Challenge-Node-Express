# Review Questions

## What is Node.js?

Development environment for javascript that can be run outside the browser. One of the main uses
of Node.js is to write server code for web services. 

## What is Express?

A node.js module that sits on top of node.js and facilitates web communication processes that would be more tedious to code using node.js and vanilla js alone. 

## Mention two parts of Express that you learned about this week.

Middleware and routing. Middleware can be used to condition or sanitize data that is passed through request/response handlers. Routing is how you go about setting up the web addresses that an API uses as endpoints to handle data retrieval requests and responses.

## What is Middleware?

Code that can be applied to data that is being passed from one application to another, including within the application itself. 

## What is a Resource?

A resource is anything that can be identified by a Uniform Resource Identifier (i.e. URI/URL). It includes the web pages that serve as endpoints in APIs. 

## What can the API return to help clients know if a request was successful?

The API can return a code and/or message telling the client if the request was successeful or not. 

## How can we partition our application into sub-applications?

Express router is used to partition an application into sub-applications that can be worked on separately to more easily handle the many end-points an API may need to offer. 

## What is express.json() and why do we need it?

Middleware that comes with express that adds support for parsing JSON content out of the request body. 
