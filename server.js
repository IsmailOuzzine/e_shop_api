const express = require('express');
const cors = require('cors');
const categoriesRouter = require('./app/routes/categories.router');
const productsRouter = require('./app/routes/products.router');
const usersRouter = require('./app/routes/users.router');
const db = require('./app/models/index');

const app = express();
const port = 3000;
const corsOptions = {
    origin : 'http://localhost:4200'
}

// enable cors to the origin http://localhost:4200
app.use(cors(corsOptions));
// parse requests to json 
app.use(express.json());
// parse 
app.use(express.urlencoded({ extended: true }));
// Response of http://localhost:4200
app.get('/', (req, res) => {
    res.json({message : 'It works!'});
});

// Responses to http://localhost:4200/categories/
app.use('/categories', categoriesRouter);

// Responses to http://localhost:4200/products/
app.use('/products', productsRouter);

// Responses to http://localhost:4200/users/
app.use('/users', usersRouter);

// db.sequelize.sync({ alter: true })
db.sequelize.sync()
    .then(() => console.log('Connected to db - SUCCESS'))
    .catch((err) => console.error('Cannot connect to db. Error :', err));

app.listen(port, () => console.log(`Running the API at http://localhost:${port}`))