// Ongoing processing of large data sets that do not fit in memory

// with signal.cancel()

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlin.random.Random

fun <T> asyncIterator(array: List<T>): Flow<T> = flow {
    for (item in array) {
        delay(Random.nextLong(1000))
        emit(item)
    }
}

suspend fun <T, R> asyncMap(
    asyncIterable: Flow<T>,
    callback: suspend (T) -> R,
    signal: CompletableJob
): List<R> {
    val results = mutableListOf<R>()
    try {
        asyncIterable.collect { item ->
            if (!signal.isActive) {
                throw CancellationException("Aborted")
            }
            val result = callback(item)
            println("Processed: $result")
            results.add(callback(item))
        }
    } catch (e: CancellationException) {
        throw e
    }
    return results
}

fun demoFunc() = runBlocking {
    val controller = Job() // Аналог AbortController
    val signal = controller

    val numbers = listOf(1, 2, 3, 4, 5)
    val promiseTriple: suspend (Int) -> Int = { num -> num * 3 }

    try {
        val iterable = asyncIterator(numbers)

        launch {
            delay(1500)
            println("Aborting...")
            signal.cancel()
        }

        val results1 = asyncMap(iterable, promiseTriple, signal)
        println("Case 1 results: $results1")
    } catch (err: CancellationException) {
        println("Case 1 was aborted")
    } catch (err: Exception) {
        println("Error: ${err.message}")
    }
}

fun main() {
    demoFunc()
}
