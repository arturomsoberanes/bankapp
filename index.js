const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const user = require('./src/routes/users')
const movements = require('./src/routes/movements')
const { connection } = require('./src/bd-connection')

const port = 4000;

// Used to serve static files from public directory
app.use(express.static('public/build'));
app.use(cors());

// Connect to bd
connection()
  .then(console.log)
  .catch(e => console.error(e))
// Routes for users
app.use('/users', user)
app.use('/movements', movements)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
})

app.listen(port, () => {
  console.log('Running on port ' + port);
})

