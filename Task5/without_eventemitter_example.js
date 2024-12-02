class Observable {
    constructor(name) {
        this.observers = [];
        this.name = name;
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

    setTemperature(temp) {
        console.log(`${this.name}: Температура змінена на ${temp}°C`);
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

const weatherStation = new Observable("weatherStation");

const phoneDisplay = new Observer("phoneDisplay");
const desktopDisplay = new Observer("desktopDisplay");

weatherStation.subscribe(phoneDisplay);
weatherStation.subscribe(desktopDisplay);

console.log()
weatherStation.setTemperature(25);
console.log()
weatherStation.unsubscribe(desktopDisplay);
weatherStation.setTemperature(30);
