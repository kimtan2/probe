 
 const express = require('express');
const app = express();
const port = 5173;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(5173, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

