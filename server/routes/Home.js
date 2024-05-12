const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

// Define routes
router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, PatientenNummer, `Alter`, Diagnose FROM Probe';

        const rows = await pool.query(sqlQuery);
        res.json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }





});

module.exports = router;
