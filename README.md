<h1>ArcTouch Challenge</h1>

<h2>Overview</h2>
This project execute a webapp that makes requests to TMDB and show informations about the upcoming movies (title, poster/backdrop, genres and release date) as well as searched movies.

<h2>Architecture</h2>
In this project I made a backend app, responsible to make http requests to TMDB API (the frontent can't talk with TMDB API directly), and a frontend app, responsible to show the informations to the user. The backend runs like a gateway, receiving request from frontend, sending this request to TMDB API, receiving the response and sending to frontend app.

To help on deploy, I used Docker to create two containers and run both with DockerCompose on AWS EC2 instance.

In backend, I used Express framework, and in frontend I used Angular 9.

<h2>Assumptions</h2>

- The 'title' field was the correct movie name instead of 'original_title' field.
- The fully movies list should be displayed paginated to access all movies.

<h2>Build</h2>

To run the project locally, you have two ways:

1. - Use Docker. So, run the command below, in the root directory, to start two containers (backend and frontend), and access the address http://localhost:80/movies

Command: docker-compose -f docker-compose.yml up -d --build

2. - Run the backend and frontend separately
   1. Access the 'backend/src' directory and run the following command: node app.js
   2. Access the 'frontend' directory and run the following command: ng serve

<h2>Libraries</h2>

1. - Backend
   1. Axios: make http request to the TMDB API
   2. Chai/Mocha/Should/Request: make tests
   3. BodyParser: format body message in requests
2. Frontend
   1. NgBootstrap: paginator component
   2. Rxjs: work with observables and async methods
   3. Angular Libs: default components and services from Angular 