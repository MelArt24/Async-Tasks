class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}


class WeatherStation extends Observable {
    setTemperature(temp) {
        console.log(`Станція: Температура змінена на ${temp}°C`);
        this.notify(temp);
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} отримав оновлення температури: ${data}°C`);
    }
}

const weatherStation = new WeatherStation();

const phoneDisplay = new Observer("phoneDisplay");
const desktopDisplay = new Observer("desktopDisplay");

weatherStation.subscribe(phoneDisplay);
weatherStation.subscribe(desktopDisplay);

console.log()
weatherStation.setTemperature(25);
console.log()
weatherStation.unsubscribe(desktopDisplay);
weatherStation.setTemperature(30);
