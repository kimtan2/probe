const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

// Define routes
router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, Status, PatientenNummer, `Alter`, Diagnose FROM Probe';

        const rows = await pool.query(sqlQuery);
        res.json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }





});

router.post('/', async function(req, res) {
    try {
        const { Status, PatientenNummer, Alter, Diagnose } = req.body;
        console.log("Received body:", req.body);
        
        const sqlQuery = 'INSERT INTO Probe (Status, PatientenNummer, `Alter`, Diagnose ) VALUES (?,?,?,?)';
        const result = await pool.query(sqlQuery, [Status, PatientenNummer, Alter, Diagnose]);
        console.log("Insert successful:", result);

        // Convert BigInt values in the result to string
        const serializedResult = {
            ...result,
            insertId: result.insertId.toString()
        };

        res.json({ message: 'Insert successful', result: serializedResult });
    } catch (error) {
        console.error("Error during insert:", error.message);
        res.status(400).send({ error: error.message });
    }
});


router.put("/", async function(req, res) {
    try {
        const { Status, id } = req.body;
        console.log("Received body for StatusUpdate:", req.body);
        
        // Check and handle BigInt conversion if necessary
        const idToUpdate = typeof id === 'string' && !isNaN(id) ? BigInt(id) : id;

        const sqlQuery = 'UPDATE Probe SET Status=? WHERE id=?';
        const result = await pool.query(sqlQuery, [Status, idToUpdate]);
        console.log("Update successful:", result);

        // Convert BigInt values in the result to string
        const serializedResult = {
            ...result,
            insertId: result.insertId.toString()
        };
        
        res.json({ message: 'Update successful', result: serializedResult });
    } catch (error) {
        console.error("Error during update:", error.message);
        res.status(400).send({ error: error.message });
    }
});






module.exports = router;
