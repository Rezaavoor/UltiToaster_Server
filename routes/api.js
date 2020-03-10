const express = require("express");
const router = express.Router();
const Gpio = require('pigpio').Gpio;

const led = new Gpio(4, { mode: Gpio.OUTPUT })

router.get("/led", (req, res) => {
	led.digitalWrite(led.digitalRead() ^ 1);
	res.send('Led status on pin 4 changed to:' + led.digitalRead());
});

const motors = {
	1: new Gpio(17, { mode: Gpio.OUTPUT }),
	2: new Gpio(27, { mode: Gpio.OUTPUT }),
	3: new Gpio(22, { mode: Gpio.OUTPUT }),
	4: new Gpio(10, { mode: Gpio.OUTPUT }),
	5: new Gpio(9, { mode: Gpio.OUTPUT }),
}
router.get("/motor/:motor/:speed", (req, res) => {
	const motorIndex = parseInt(req.params.motor)
	const dc = (parseInt(req.params.speed) * 10) + 1500;
	const motor = motors[motorIndex];
	motor.servoWrite(dc);
	res.send(`motor ${motorIndex} is set to dutycycle ${dc}`);
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
