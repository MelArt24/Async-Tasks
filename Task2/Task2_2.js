// Write use cases for the async-await

function promiseMap(array, callback) {
    const promises = array.map(item => callback(item));
    return Promise.all(promises);
}

async function demoFunc() {
    
    // case 1
    const numbers = [1, 2, 3, 4, 5];

    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    const results1 = await promiseMap(numbers, promiseTriple);
    console.log(results1);
    
    
    // case 2
    const numbers2 = [10, 20, 30];

    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * num), Math.random() * 1000);
        });
    };

    const results2 = await promiseMap(numbers2, promiseSquare);
    console.log(results2);
}

demoFunc();
