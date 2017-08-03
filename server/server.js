const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();


app.use(express.static(publicPath));

const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Server running on port ' + port)
})
