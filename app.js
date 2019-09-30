const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const departmentRoutes = require('./routes/department')
const employeeRoutes = require('./routes/employee')

const app = express()

// Testing the connection
db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(require('cors')())

app.use('/api/department', departmentRoutes)

app.use('/api/employee', employeeRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app