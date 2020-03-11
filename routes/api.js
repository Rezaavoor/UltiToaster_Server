const express = require("express");
const router = express.Router();
const Gpio = require('pigpio').Gpio;

const motors = {
	1: new Gpio(17, { mode: Gpio.OUTPUT }),
	2: new Gpio(27, { mode: Gpio.OUTPUT }),
	3: new Gpio(22, { mode: Gpio.OUTPUT }),
	4: new Gpio(10, { mode: Gpio.OUTPUT }),
	5: new Gpio(9, { mode: Gpio.OUTPUT }),
}
router.get("/motor/:motor/:speed/:time", (req, res) => {
	const time = parseInt(req.params.time) * 1000 //milliseconds
	const motorIndex = parseInt(req.params.motor)
	const dc = (parseInt(req.params.speed) * 10) + 1500; //dutycycle
	const motor = motors[motorIndex];
	motor.servoWrite(dc);
	setTimeout(() => {
		motor.digitalWrite(0)
	}, time)
	res.send(`motor ${motorIndex} is set to dutycycle ${dc} for ${time / 1000} seconds`);
});

const switches = {
	1: new Gpio(2, { mode: Gpio.OUTPUT }),
	2: new Gpio(3, { mode: Gpio.OUTPUT }),
	3: new Gpio(4, { mode: Gpio.OUTPUT }),
	4: new Gpio(11, { mode: Gpio.OUTPUT }),
	5: new Gpio(0, { mode: Gpio.OUTPUT }),
}
router.get("/switch/:switch/:state", (req, res) => {
	const switchIndex = parseInt(req.params.switch) // gpio pin on raspberry pi
	const state = parseInt(req.params.state) // 1 or 0
	const mySwitch = switches[switchIndex]
	mySwitch.digitalWrite(state);
	res.send(`Switch ${switchIndex} status changed to: ${state}`);
})

module.exports = router;
