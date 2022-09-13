# myGuide

This project serves as a backend for the myGuide app. The server allows for Creating, Reading, Updating and Deleting sites and tours from our database.

The server is implemented in Node.js, using express as the framework. The database used is mongoDB using Mongoose to connect between the database and Node.js

## Prerequisites

Ensure you have node.js installed.
To check if node.js is installed, in the terminal run

```
node -v
```

If no version is printed to the console install node.js by visiting

```
https://nodejs.org/en/download/
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

To use this server locally:

1. Clone the repo:

```
git clone https://github.com/callumu21/myguide-BE.git
```

2. Install NPM packages

```
npm install
```

3. Get the URI from your mongoDB cluster. It should look like

```
mongodb+srv://usename:password@databasename.upet69n.mongodb.net/clustername
```

4. Create .env file

```
touch .env.development
```

5. Paste your mongoDB URI in the .env file with the form

```
MONGO_URI = mongodb+srv://usename:password@databasename.upet69n.mongodb.net/clustername
```

6. Run the server locally with

```
node app.js
```

## Endpoints

To view all available endpoints visit

```
localhost:9090/
```

## Running the tests

To run the tests

```
npm test
```

The tests cover:

- GET requests for: sites, tours, sites by its ID, tours by its ID, tours by their author ID.
- POST requests for: sites and tours
- DELETE requests for: site by its ID, tour by its ID
- PATCH requests for: site by its ID, tour by its ID
- Sort querys for: sites and tours
- Error handling for all of the above

## Deployment

To deploy this on a live system we recommend you use render

```
https://render.com/
```

A clear guide on how to do his can be found here

```
https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/
```

## Built With

- express version: 4.18.1
- dotenv version: 16.0.2
- cors version: 2.8.5
- mongodb version: 4.9.1
- mongoose version: 6.5.4
- mongoose-sequence version: 5.3.1
- jest version: 29.0.2
- jest-sorted version: 1.0.14
- supertest version: 6.2.4
- generate-unique-id version: 2.0.1
- multer version: 1.4.5
- multer-s3 version: 2.10.0
- uuid version: 9.0.0

## Authors

- **Callum Underwood** - (https://github.com/callumu21)
- **Jason Efstathiou** - (https://github.com/Nosajthe1)
- **Matt Arwen-Langham** - (https://github.com/MattArwenLangham)
- **Waqas Baig** - (https://github.com/wbaig2)
- **Ben Brennan** - (https://github.com/BrennB99)
