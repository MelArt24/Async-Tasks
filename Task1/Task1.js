/* Task 1
  * Choose array fn (map/filter/filterMap/some/find/findIndex) (map)
  * Prepare its callback based async counterpart
  * Prepare demo cases for the usage
*/


// callback based async counterpart
async function asyncMap(array, callback) {
    const results = [];
    for (const item of array) {
        try {
            results.push(await callback(item));
        } catch (error) {
            console.error(`Error processing item ${item}:`, error);
            results.push(null);
        }
    }
    return results;
}


// demo case for the usage
async function demoFunc() {
    const numbers = [1, 2, 3, 4, 5];

    const asyncTriple = async (num) => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject(`Failed to process ${num}`);
            } else {
                resolve(num * 3);
            }
        }, Math.random() * 1000);
      });
    };

    const results = await asyncMap(numbers, asyncTriple);
    console.log(results);
}

demoFunc();
