/* Task 1
  * Choose array
  * Prepare its callback based async counterpart
  * Prepare demo cases for the usage
*/

import kotlinx.coroutines.*
import kotlin.random.Random

// callback based async counterpart
suspend fun <T, R> asyncMap(list: List<T>, callback: suspend (T) -> R): List<R> {
    val results = mutableListOf<R>()
    for (item in list) {
        try {
            results.add(callback(item))
        } catch (e: Exception) {
            println("Error processing item $item: ${e.message}")
            results.add(null)
        }
    }
    return results
}

// demo case for the usage
fun main() = runBlocking {
    val numbers = listOf(1, 2, 3, 4, 5)

    val asyncTriple: suspend (Int) -> Int = { num ->
        delay(Random.nextLong(1000))
        if (Random.nextDouble() < 0.2) {
            throw Exception("Failed to process $num")
        }
        num * 3
    }

    val results = asyncMap(numbers, asyncTriple)
    println(results)
}
