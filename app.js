const express = require('express')
const tcpPortUsed = require('tcp-port-used')
const Gpio = require('pigpio').Gpio;
const cors = require('cors')
const app = express()
app.use(cors())
// const logger = (req, res, next) => {
//     console.log('middleware')
//     next()
// }
// app.use(logger)

const led = new Gpio(4, { mode: Gpio.OUTPUT })
const clientConnectionChecker = setInterval(() => {
	tcpPortUsed.check(3000, '127.0.0.1').then(inUse => {
		console.log('wating for the client...')
		led.digitalWrite(1) // show that server is running and it is waiting for the client
		if (inUse) {
			setTimeout(() => {
				console.log('client is now online on port 3000!')
				setInterval(() => {
					led.digitalWrite(led.digitalRead() ^ 1); // show that client is also running
				}, 1000)
				clearInterval(clientConnectionChecker)
			}, 5900)
		}
	})
}, 6000)

app.get('/', (req, res) => {
	res.send('here are your orders: [list of orders]')
})

app.get('/toast', (req, res) => {
	res.send('toast')
})

app.get('/schedule', (req, res) => {
	res.send('schedule')
})
app.get('/ok', (req, res) => {
	res.send('ok')
})

app.use('/api', require('./routes/api'))

const PORT = 9999
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))