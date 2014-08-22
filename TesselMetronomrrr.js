var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port

//using 2 pins, one for driving the motor and one for flashing a LED.
var vibrateMotor = gpio.pwm[0]; //G4
var ledPin = gpio.pwm[1]; //G5

var bpm = 55;

tessel.button.on('release', function(time) {
  	
  	bpm += 5; //start at 60 BPM because thats more or less a standard.

	var frequency = bpmToFreq(bpm,4);
	
	gpio.pwmFrequency(frequency);

	vibrateMotor.pwmDutyCycle(0.5); 
	ledPin.pwmDutyCycle(0.5); 

	console.log("Current BPM: ",bpm, " In Hertz: ", frequency, "(rrr per second)");
	
});

//simple conversion function...
function bpmToFreq(bpm,measure) {

	var divider = 60; //standard 4/4

	switch (measure) {
		case 16:
			divider = 15;
			break;
		case 4:
			divider = 60;
			break;
		default:
			divider = 60;
	}

	return bpm/divider;
}
