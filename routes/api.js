const express = require("express");
const router = express.Router();
const { Gpio } = require("onoff");
const piblaster = require("pi-blaster.js");

const LED = new Gpio(4, "out");

router.get("/", (req, res) => {
	LED.writeSync(LED.readSync() === 1 ? 0 : 1);
	res.send('Led status on pin 4 changed to:' + LED.readSync());
});

router.get("/motors/:id", (req, res) => {
	//id = push or lift
	//pushMotor pushes the bread to the toaster
	//liftMotor lifts down the toaster handle to start toasting
});
//const motor = new Gpio(17, { mode: Gpio.OUTPUT });
router.get("/motor/:motor/:duration", (req, res) => {
	// const dc = (parseInt(req.params.duration) * 255) / 100;
	const pin = parseInt(req.params.motor)
	const dc = parseInt(req.params.duration) / 100;
	// motor.pwmWrite(Math.floor(dc));
	piblaster.setPwm(pin, dc);
	res.send(`motor on pin ${pin} is set to duration ${dc}`);
});
router.get("/switch/:switch/:state", (res, req) => {
	const pin = parseInt(req.params.switch) // gpio pin on raspberry pi
	const state = parseInt(req.params.state) // 1 or 0

	const SWITCH = new Gpio(pin, "out");
	SWITCH.writeSync(state);
	res.send(`Led status on pin ${pin} changed to: ${state}`);
})

module.exports = router;
