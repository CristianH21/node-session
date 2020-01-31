const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//MIDDLEWARES
app.use(morgan('combined'));
app.use(bodyParser.json());

//CORS

//ROUTES
app.use('/signup', require('./routes/signup.route'));
app.use('/signin', require('./routes/signin.route'));
app.use('/users', require('./routes/users.route'));

//SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});