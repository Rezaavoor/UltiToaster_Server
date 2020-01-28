const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
// const logger = (req, res, next) => {
//     console.log('middleware')
//     next()
// }
// app.use(logger)

app.get('/', (req, res) => {
  res.send('here are your orders: [list of orders]')
})

app.get('/toast', (req, res) => {
  res.send('toast')
})

app.get('/schedule', (req, res) => {
  res.send('schedule')
})
app.use('/api', require('./routes/api'))


const PORT = 9999
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))