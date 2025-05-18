// import the librarys required and build server instructions
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const config = require('./config.json');
const { query, validationResult, param, body } = require('express-validator');

const app = express();
const PORT = config.server.port;

// what's to be used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());

// Start the server on the specified port and console the result
app.listen(PORT, () => {
    console.log(`Server successfully connected to Port ${PORT}`);
});

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.root,
    password: config.database.password,
    database: config.database.database,
    waitForConnections: config.database.waitForConnections,
    connectionLimit: config.database.connectionLimit
});

// create first endpoint
app.get('/', (req, res) => {
    res.send('Welcome to my D&D Monsters API for 5e!');
});

// create second endpoint
// this endpoint would require strict access/authorisation
// create new monster and add to the database
// validation method added to ensure the correct data is entered to the database
app.post('/add-monster', [
    body('CR').optional().custom(value => {
        if (typeof value === 'string' || typeof value === 'number') {
            return true;
        }
        throw new Error('CR must be a fraction x/x or a number with 1 to 10 characters');
    }),
    body('Name').isString().withMessage('The Name must be a string of 1 to 255 characters'),
    body('Type').optional().isIn(["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"]).withMessage('Type must be one of the specified values.'),
    body('Size').optional().isIn(["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]).withMessage('The Size must be one of the specified values'),
    body('Environ').optional().isString().withMessage('Environ must be a string from 1 to 255 characters')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { CR, Name, Type, Size, Environ } = req.body; 
    
    const sql = 'INSERT INTO Monsters (CR, Name, Type, Size, Environ) VALUES (?, ?, ?, ?, ?)';
    pool.query(sql, [CR, Name, Type, Size, Environ], (err, result) => {
        if (err) {
            console.error('Error Adding Monster:', err.message);
            return res.status(500).json({ error: 'Database Error' });
        }

        res.status(201).json({ message: `The ${Name} has been added.` });
    });
});

// create third endpoint
// fetch all the monsters on the database
app.get('/monsters', (req, res) => {
    const sql = 'SELECT CR, Name, Type, Size, Environ FROM monsters';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error Fetching Monsters:', err.message);
            return res.status(500).json({ error: 'Database Error' });
        }

        res.status(200).json(results);
    });
});

//create fourth endpoint
// update the NULL values in the Database
// validation method added to ensure that the correct data is being used to update the database
app.put('/update-monster/:MonsterID', [
    param('MonsterID').isInt().withMessage('The MonsterID must be a number'),
    body('CR').optional().custom(value => {
        if (typeof value === 'string' || typeof value === 'number') {
            return true;
        }
        throw new Error('CR must be a fraction x/x or a number with 1 to 10 characters');
    }),
    body('Name').isString().withMessage('The Name must be a string of 1 to 255 characters'),
    body('Type').optional().isIn(["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"]).withMessage('Type must be one of the specified values.'),
    body('Size').optional().isIn(["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]).withMessage('The Size must be one of the specified values'),
    body('Environ').optional().isString().withMessage('Environ must be a string from 1 to 255 characters')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const MonsterID = req.params.MonsterID;
    const { CR, Name, Type, Size, Environ } = req.body;

    const sql = 'UPDATE Monsters SET CR = ?, Name = ?, Type = ?, Size = ?, Environ = ? WHERE MonsterID = ?';
    pool.query(sql, [CR, Name, Type, Size, Environ, MonsterID], (err, result) => {
        if (err) {
            console.error('Error Updating Monster:', err.message);
            return res.status(500).json({ error: 'Database Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Monster Not Found' });
        }
    });

    res.status(200).json({ message: `Monster ${MonsterID} has been updated.` });
});

// create fifth endpoint
// fetch a specific monster from the database using it's Name
// This GET request could be tweaked to allow for every column name so a Monster can be searched by any of the data supplied for it.
app.get('/monsters/:Name', (req, res) => {
    const sql = 'SELECT CR, Name, Type, Size, Environ FROM Monsters WHERE Name = ?';
    const monsterName = req.params.Name;

    pool.query(sql, [monsterName], (err, results) => {
        if (err) {
            console.error('Error Fetching Monster:', err.message);
            return res.status(500).json({ error: 'Database Error' });
        }

        res.status(200).json(results);
    });
});