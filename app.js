const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('./conn');
// const User = require('./models'); // no use of requiring this in app.js
const router = require('./routes');

app.get('/', (req, res) => {
    res.send('No content to display here, try reaching "localhost:3000/user"!')
});


app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`server is listening at PORT http://localhost:${PORT}`);
});