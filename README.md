# 🐉 Dungeons & Dragons: Monsters 5e API

This is a custom-built RESTful API designed to serve as the foundation of a D&D 5e Monster Database.

While similar projects exist, this one is personal — I built it because I wanted everything in one place rather than scattered across clunky websites. This API is my first step toward building a comprehensive, streamlined resource for D&D content.

## ⚙️ Tech Stack

- Backend: Node.js, Express     
- Database: MySQL       
- Testing: Postman  
- Validation: express-validator     
- Middleware: body-parser       

### ⚙️ Required Installations
``` bash
npm install express
npm install mysql2
npm install body-parser
npm install express-validator
```
You'll also need:
- MySQL Workbench (for running the .sql script)
- Postman (for testing endpoints)

## 🛠️ Setup Instructions
1. Install dependencies (see above)
2. Configure the `config.json` file:
```json
{
    "server": {
        "port": 4000 // if you are already running a project on this Port, change it to a Port you're not using
    },
    "database": {
        "host": "", //enter your MySQL server name
        "user": "", // enter your MySQL user name
        "password": "", // enter your MySQL password
        "database": "Monsters_5e", // this is the name of the database in the .sql file
        "waitForConnections": true,
        "connectionLimit": 10
    }
}
```     
3. Add this to your `package.json` scripts:
```json
"scripts": {
    "start": "node index.js"
}
```
4. Run the database schema via `Monsters_5e.sql` in MySQL Workbench.
5. Start the API:   
    `npm start`

## 🔍 Using the API (with Postman)
### 🟢 GET /
Tests basic connection
![screenshot of Postman running a GET on http://localhose:4000/](<README Screenshots/SS_get-test.png>)


### 🟡 POST /add-monster
```json
{   
    "CR": 6,    
    "Name": "Drider",   
    "Type": "Monstrosity",  
    "Size": "Large",    
    "Environ": "Underdark"  
}
```     
![screenshot of creating the Drider Monster entry](<README Screenshots/SS_Post-Drider.png>)


### 🟢 GET /monsters
Returns all monsters from the database.
![screenshot of the last 3 monsters](<README Screenshots/SS_GET-Monsters.png>)


### 🗘️ PUT /update-monster/:id
Update a monster by ID:
```json 
{
    "CR": 4,
    "Name": "Incubus",
    "Type": "Fiend",
    "Size": "Medium",
    "Environ": "Urban",
    "monsterId": 8
}
``` 
![screenshot of updating the Incubus Monster entry](<README Screenshots/SS_Update-Incubus.png>)


### 🧢 GET /monsters/:name
Fetch a specific monster by name (e.g. /monsters/Spectator)

*Postman*   
![screenshot of fetching the Spectator](<README Screenshots/SS_GET-Spectator.png>)

*Browser*   
![screenshot of using the URL in web browser](<README Screenshots/SS_GET-Spectator-browser.png>)


## 🧠 What I Learned
- Express route handling and REST principles
- Managing a relational DB connection in Node
- Using Postman to test endpoints efficiently
- Structuring a modular API and planning for future expansions (auth, frontend, etc.)

## 📌 Notes
This is an ongoing project. I plan to add:
- Search and filter functionality
- Monster type classification endpoints
- Frontend integration (possibly React or Svelte)
- Token-based authentication

## ❤️ Personal Note
This project combines my love of code with my love of storytelling and roleplay. It's a passion project, and one I'm proud to keep expanding.