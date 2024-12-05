const EventEmitter = require('events');


class WeatherStation extends EventEmitter {
    constructor() {
        super();
    }

    setTemperature(temp) {
        if (typeof temp !== 'number' || temp < -50 || temp > 50) {
            this.emit('error', new Error(`Incorrect temperature: ${temp}. Enter a value from -50 to 50°C.`));
        } else {
            this.emit('temperatureChange', temp);
        }
    }
}


class PhoneDisplay {
    update(temp) {
        console.log(`Smartphone: The temperature has changed by ${temp}°C`);
    }
}


class DesktopDisplay {
    update(temp) {
        console.log(`Desktop: The temperature has changed by ${temp}°C`);
    }
}


const weatherStation = new WeatherStation();

const phoneDisplay = new PhoneDisplay();
const desktopDisplay = new DesktopDisplay();


weatherStation.on('temperatureChange', temp => phoneDisplay.update(temp));
weatherStation.on('temperatureChange', temp => desktopDisplay.update(temp));

weatherStation.on('error', error => {
    console.error(`Error: ${error.message}`);
});

weatherStation.setTemperature(25);
console.log()
weatherStation.setTemperature(30);
console.log()
weatherStation.setTemperature(52);
