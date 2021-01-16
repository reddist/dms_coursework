//чтобы сервер мог принимать запросы
let express = require('express');
let cors = require('cors')
const PORT = 4000;
const userRouter = require('./user.routes')
// создали сервер
let app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.listen(PORT, ()=>console.log("Server started on port  "+ PORT));