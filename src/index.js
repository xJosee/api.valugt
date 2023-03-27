const express = require('express');
const app = express();
const dpiRoutes = require('./routes/dpi.route');
const licenciaRoutes = require('./routes/licencia.route');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use('/dpi', dpiRoutes)
app.use('/licencia', licenciaRoutes)

app.get('/', (req, res) => {
    res.send('valugt API');
});

app.listen(PORT, () => {
    console.log('Server started on port',  PORT);
});