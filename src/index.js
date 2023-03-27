const express = require('express');
const app = express();
const dpiRoutes = require('./routes/dpi.route');
const licenciaRoutes = require('./routes/licencia.route');
const cors = require('cors');

const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 443;

//middlewares
app.use(cors());
app.use(express.json());
app.use('/dpi', dpiRoutes, cors())
app.use('/licencia', licenciaRoutes, cors())

app.get('/', (req, res) => {
    res.send('valugt API');
});

const options = {
  key: fs.readFileSync(path.resolve('/src/selfsigned.key')),
  cert: fs.readFileSync(path.resolve('/src/selfsigned.crt'))
};

https.createServer(options, app).listen(PORT);