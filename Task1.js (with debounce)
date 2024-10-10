const start = Date.now();

async function asyncMap(array, callback, minExecutionTime = 5000) {
    const results = [];

    for (const item of array) {
        const startTime = Date.now();
        results.push(await callback(item));

        const callbackExecutionTime = Date.now() - startTime;

        if (callbackExecutionTime < minExecutionTime) {
            const additionalDelay = minExecutionTime - callbackExecutionTime;
            await new Promise(resolve => setTimeout(resolve, additionalDelay));
        }
    }
    return results;
}

async function demoFunc() {
    const numbers = [1, 2, 3, 4, 5];

    const asyncDouble = async (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), 2000);
        });
    };

    const results = await asyncMap(numbers, asyncDouble, 5000);
    console.log(results);

    const endTime = Date.now();
    const elapsedTime = endTime - start;
    console.log(`Program execution time: ${elapsedTime} ms`);
}

demoFunc();
