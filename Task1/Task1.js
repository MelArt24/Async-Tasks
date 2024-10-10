/* Task 1
  * Choose array fn (map/filter/filterMap/some/find/findIndex) (map)
  * Prepare its callback based async counterpart
  * Prepare demo cases for the usage
*/


// callback based async counterpart
async function asyncMap(array, callback) {
    const results = [];
    for (const item of array) {
        results.push(await callback(item));
    }
    return results;
}


// demo case for the usage
async function demoFunc() {
    const numbers = [1, 2, 3, 4, 5];

    const asyncTriple = async (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    const results = await asyncMap(numbers, asyncDouble);
    console.log(results);
}

demoFunc();
