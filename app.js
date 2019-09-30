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

/*
  app.use(passport.initialize())
  require('./middleware/passport')(passport)

  app.use(require('morgan')('dev'))
  app.use('/uploads', express.static('uploads'))
*/
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
//

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(require('cors')())

// app.use('/api/auth', authRoutes)
// app.use('/api/analytics', analyticsRoutes)
// app.use('/api/category', categoryRoutes)
// app.use('/api/order', orderRoutes)
// app.use('/api/position', positionRoutes)

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