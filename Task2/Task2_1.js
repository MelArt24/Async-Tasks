// Prepare promise based alternative

function promiseMap(array, callback) {
    const promises = array.map(item => callback(item));
    return Promise.all(promises);
}

async function demoFunc() {
    const numbers = [1, 2, 3, 4, 5];

    const promiseDouble = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    promiseMap(numbers, promiseDouble)
        .then(results => {
            console.log(results);
        });

}

demoFunc();
