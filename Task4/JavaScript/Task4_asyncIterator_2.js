// Ongoing processing of large data sets that do not fit in memory

// with controller.abort();

async function* asyncIterator(array) {
    for (const item of array) {
        yield new Promise((resolve) =>
            setTimeout(() => resolve(item), Math.random() * 1000)
        );
    }
}

async function asyncMap(asyncIterable, callback, signal) {
    const results = [];

    for await (const item of asyncIterable) {
        if (signal.aborted) {
            throw new DOMException("Aborted", "AbortError");
        }
        console.log(await callback(item))
        results.push(await callback(item));
    }

    return results;
}

async function demoFunc() {
    const controller = new AbortController();
    const { signal } = controller;

    const numbers = [1, 2, 3, 4, 5];
    const promiseTriple = (num) => Promise.resolve(num * 3);

    try {
        const iterable = asyncIterator(numbers);

        setTimeout(() => {
            console.log("Aborting...");
            controller.abort();
        }, 1500);

        const results1 = await asyncMap(iterable, promiseTriple, signal);
        console.log("Case 1 results:", results1);
    } catch (err) {
        if (err.name === "AbortError") {
            console.error("Case 1 was aborted");
        } else {
            console.error("Error:", err);
        }
    }
}

demoFunc()
    .then(() => console.log("demoFunc completed successfully"))
    .catch((err) => console.error("Error in demoFunc:", err));
