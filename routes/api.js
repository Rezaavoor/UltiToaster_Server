const express = require("express");
const router = express.Router();
const { Gpio: GpioOnoff } = require("onoff");
const { Gpio } = require("pigpio");

const LED = new GpioOnoff(4, "out");

router.get("/", (req, res) => {
  LED.writeSync(LED.readSync() === 1 ? 0 : 1);
  res.send(LED.readSync() + "");
});

router.get("/motors/:id", (req, res) => {
  //id = push or lift
  //pushMotor pushes the bread to the toaster
  //liftMotor lifts down the toaster handle to start toasting
});
const motor = new Gpio(17, { mode: Gpio.OUTPUT });
router.get("/motor/:duration", (req, res) => {
  const dc = (parseInt(req.params.duration) * 255) / 100;
  motor.pwmWrite(Math.floor(dc));
  res.send(dc + "");
});
router.get("/test_connection", (req, res) => {
  res.send("your are connected to the server");
});

module.exports = router;
