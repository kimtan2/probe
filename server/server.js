const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();
app.use(cors()); // Enable CORS for all routes


/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Routes
 */

app.get('/', (request, response) => {
    response.status(200).send("This is not why you're here. Head to /user/:id and replace :id with your user id")
})



const homeRouter = require("./routes/Home");
app.use('/home',homeRouter);

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})