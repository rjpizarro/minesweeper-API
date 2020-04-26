# minesweeper-API

* Heroku app: https://murmuring-basin-21822.herokuapp.com/api

* Docs (swagger): https://murmuring-basin-21822.herokuapp.com/docs
 
## Install & Run

Requirements: 
* **Node v12.16.1**
* **Mongo v4.2.6**

1. Clone the project: `git clone git@github.com:rjpizarro/minesweeper-API.git`
2. Install dependencies: `npm install`
3. Make sure you have a running mongoDB instance
4. Configure `.env` file: 
    1. rename `.env.example` to `.env`
    2. Configure a connection value to your mongoDB instance. Add a port and a secret key for the JWT sign.
5. Run: `npm start`      

## Project Structure

```
minesweeper-API
├── .env
├── babel.config.js
├── envConfig.js
├── jest.config.js
├── package.json
├── tsconfig.json
├── build
├── coverage
├── node_modules
└── src
    ├── app.ts
    ├── libs
    │   └── minesweeper-engine
    └── api
        ├── controllers
        │   ├── auth
        │   ├── boards
        │   ├── games
        │   ├── moves
        │   └── users
        ├── docs
        │   ├── auth
        │   ├── games
        │   ├── moves
        │   └── users
        ├── middlewares
        ├── models
        ├── routes
        └── services
            ├── boards
            ├── games
            └── users
```

At the project root level you will find all the config files for typescript, babel, and jest. There is also an `envConfig` that get the data from the `.env` and configure the keys to be used easily in the rest of the files.
  
Folders like `build`, `coverage`, and `node_modules` are generated after transpile, when running the test, or when installing a dependency, respectively

### `app.ts`

Creates the express app, configures the main routes and the docs UI. Establishes the database connection.   

### `libs/minesweeper-engine`

It is the core of the application. It was the first part developed along with the API structure.

It contains all the logic to handle the game: reveal squares, generate a board randomly, execute a move, and other utilities.

This library was built in a decoupled way from the rest of the API. The goal is that this tool could be moved to another project, like a frontend client if required.

As a core library of the project, it was a priority to ensure their functionality through unit tests.

### `api`

This folder contain all the API logic organized in:   

* **models**: MongoDB schema files created with mongoose library.
* **controllers**: It processes each request and returns a response. It should exist only one controller per file. As a rule, a controller only can access Models through Services. 
* **services**: Are in charge to access the data through Models. Should tackle only one task (find, update, delete, etc). A service can't import another service. It is the controller's scope to use more than one service to get all the data required.  
* **routes**: It defines the resources for the RestAPI. It uses controllers for each route and adds middlewares when needed.
* **middlewares**: It contains express middlewares for tasks like JWT authorization, error handling, etc. 
* **docs**: This project document each resource with OpenAPI 3 (swagger). This folder has the config files for each available resource.  
 
## Scripts

### `npm start`

Run the application with `nodemon` and `ts-node`

### `npm run start:server`

Transpile typescript files into `build` folder and run the output with `node`

### `npm test`

Run `jest` test suite.

### `npm run ts-node`

For development purposes. It allows run one file. 

### `npm run tsc`

Transpiles typescript files and creates the `build` folder. 

## How to play?

A more detailed resource documentation could be found in https://murmuring-basin-21822.herokuapp.com/docs/ 

1. **Create a game**: `POST /api/games`

    Send a request with the board config in the body:
    
    ```
    {
      "rows": 9,
      "cols": 9,
      "mines": 10
    }
    ```  
 
2. **Make a move**: `POST /api/moves`
    
    1. To **reveal a square**, send a request with a `gameId` and the coords (zero based) of the selected square:
    
       ```
       {
         "gameId": "5ea339a76213f4610fa32954"
         "row": 0,
         "col": 0,
       }
       ```
       
       The response will include a masked board, with the position selected revealed: blank space or a number showing the total mines around. If is blank spaces, the game will continue revealing squares until finds a mine near a square. 
       
   2. To **place a flag or a question mark** include a `value` in the request body:
       ```
       {
         "gameId": "5ea339a76213f4610fa32954"
         "row": 0,
         "col": 0,
         "value": "F"
       }
       ```
      `F` represent a flag, `?` add a question mark to the square selected.
      
      When all the Flags were placed correctly over the mines, you will win the game.

3. Plays as a log-in user:
    
    It is possible to register an account, login and retrieve older games created by the user.
    
    1. **Register:** `POST /api/auth/register` 
       ```
       {
         "username": "test"
         "password": "1234"
       }
       ```
   2. **Login**: `POST /api/auth/login`
        ```
        {
            "username": "test"
            "password": "1234"
        }
        ```
      
   3. Use the JWT Token:  
   
        If the login success, the response will include a `JWT token`. Copy the value and place as an authorization header: `Authorization: Bearer [your-token-go-here]`
        
        When the user creates a new game, this one will include a reference to the user ID. This allows the app to make a game "private", only playable by the creator. 
        
        To retrieve all the user games use the endpoint: `GET /api/games` with an authorization header set.
## Cheats

Does this game have cheats?

This is a game, of course it has cheats!

It is possible to "spy" the board. The only thing you have to do is include a `showBoard: true` in the request body when you execute a move. 

The response will include a board without mask, with all the mines revealed ;) 

