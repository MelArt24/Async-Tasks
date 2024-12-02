// Reactive message based communication between entities

const EventEmitter = require('events');

class ReactiveProcessor extends EventEmitter {
    constructor() {
        super();
    }

    async process(array, fn) {
        const promises = array.map(async (item) => {
            const result = await fn(item);
            this.emit('dataProcessed', result);
            return result;
        });
        return Promise.all(promises);
    }
}

const processor = new ReactiveProcessor();

processor.on('dataProcessed', (result) => {
    console.log(`Оброблено значення: ${result}`);
});

async function demoFunc() {
    // Case 1
    const numbers = [1, 2, 3, 4, 5];
    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    console.log("Починаємо обробку чисел:");
    const results1 = await processor.process(numbers, promiseTriple);
    console.log("Результати обробки:", results1);

    // Case 2
    const numbers2 = [10, 20, 30];
    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * num), Math.random() * 1000);
        });
    };

    console.log("Починаємо обробку чисел:");
    const results2 = await processor.process(numbers2, promiseSquare);
    console.log("Результати обробки:", results2);
}

demoFunc().then(() => {
    console.log("demoFunc completed successfully");
}).catch(err => {
    console.error("Error in demoFunc:", err);
});
