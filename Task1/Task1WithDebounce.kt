import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

suspend fun <T, R> asyncMap(
    list: List<T>, 
    callback: suspend (T) -> R,
    minExecutionTime: Long = 4000
    ): List<R> {
    val results = mutableListOf<R>()

    for (item in list) {
        val callbackExecutionTime = measureTimeMillis {
            results.add(callback(item))
        }

        if (callbackExecutionTime < minExecutionTime) {
            val additionalDelay = minExecutionTime - callbackExecutionTime
            delay(additionalDelay)
        }
    }

    return results
}

fun main() = runBlocking {
    val numbers = listOf(1, 2, 3, 4, 5)

    val asyncTriple: suspend (Int) -> Int = { num ->
        delay(1000)
        num * 3
    }

    val startTime = System.currentTimeMillis()

    val results = asyncMap(numbers, asyncTriple, 4000)
    println(results)

    val endTime = System.currentTimeMillis()
    println("Program execution time: ${endTime - startTime} ms")
}
