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

    notifyError(error) {
        this.observers.forEach(observer => observer.handleError(error));
    }

    setTemperature(temp) {
        if (typeof temp !== 'number' || temp < -50 || temp > 50) {
            const error = new Error(`Incorrect temperature: ${temp}. Enter a value from -50 to 50°C.`);
            this.notifyError(error);
        } else {
            console.log(`${this.name}: The temperature has changed by ${temp}°C`);
            this.notify(temp);
        }
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} got a temperature update: ${data}°C`);
    }

    handleError(error) {
        console.error(`${this.name} got error: ${error.message}`);
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
console.log()
weatherStation.setTemperature(52);
