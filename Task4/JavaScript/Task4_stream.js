async function streamMap(stream, callback, signal) {
    const reader = stream.getReader();
    const results = [];

    try {
        while (true) {
            if (signal.aborted) {
                throw new DOMException("Aborted", "AbortError");
            }

            const { done, value } = await reader.read();

            if (done) break;

            results.push(await callback(value));
        }
    } finally {
        reader.releaseLock();
    }

    return results;
}

function createReadableStream(array) {
    return new ReadableStream({
        start(controller) {
            array.forEach((item) => controller.enqueue(item));
            controller.close();
        },
    });
}

async function demoFunc() {
    const controller = new AbortController();
    const { signal } = controller;

    const numbers = [1, 2, 3, 4, 5];
    const promiseTriple = (num) => Promise.resolve(num * 3);

    const stream = createReadableStream(numbers);

    try {
        const results1 = await streamMap(stream, promiseTriple, signal);
        console.log("Case 1 results:", results1);
    } catch (err) {
        if (err.name === "AbortError") {
            console.error("Case 1 was aborted");
        } else {
            console.error("Error:", err);
        }
    }

    controller.abort();

    const numbers2 = [10, 20, 30];
    const promiseSquare = (num) => Promise.resolve(num * num);

    const stream2 = createReadableStream(numbers2);

    try {
        const results2 = await streamMap(stream2, promiseSquare, signal);
        console.log("Case 2 results:", results2);
    } catch (err) {
        if (err.name === "AbortError") {
            console.error("Case 2 was aborted");
        } else {
            console.error("Error:", err);
        }
    }
}

demoFunc()
    .then(() => console.log("demoFunc completed successfully"))
    .catch((err) => console.error("Error in demoFunc:", err));
