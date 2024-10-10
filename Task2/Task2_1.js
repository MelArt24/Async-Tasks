// Prepare promise based alternative
// Write use cases for the promise based solution

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

    promiseMap(numbers, promiseTriple)
        .then(results => {
            console.log(results);
        });

    
    //case 2
    const numbers2 = [10, 20, 30];

    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * num), Math.random() * 1000);
        });
    };
    
    promiseMap(numbers2, promiseSquare)
    .then(squares => {
        console.log(squares);
    });
}

demoFunc();
