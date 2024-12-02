const EventEmitter = require('events');


class WeatherStation extends EventEmitter {
    constructor() {
        super();
    }

    setTemperature(temp) {
        this.emit('temperatureChange', temp);
    }
}


class PhoneDisplay {
    update(temp) {
        console.log(`Телефон: Температура змінена на ${temp}°C`);
    }
}


class DesktopDisplay {
    update(temp) {
        console.log(`Десктоп: Температура змінена на ${temp}°C`);
    }
}


const weatherStation = new WeatherStation();

const phoneDisplay = new PhoneDisplay();
const desktopDisplay = new DesktopDisplay();


weatherStation.on('temperatureChange', temp => phoneDisplay.update(temp));
weatherStation.on('temperatureChange', temp => desktopDisplay.update(temp));


weatherStation.setTemperature(25);
weatherStation.setTemperature(30);
