// Wrote use cases for the async-await

import kotlinx.coroutines.*

suspend fun <T, R> asyncMap(list: List<T>, transform: suspend (T) -> R): List<R> {
    return coroutineScope {
        list.map { async { transform(it) } }.awaitAll()
    }
}

fun main() = runBlocking {
    val numbers = listOf(1, 2, 3, 4, 5)

    val asyncTriple: suspend (Int) -> Int = { num ->
        delay(1000)
        num * 3
    }

    val results = asyncMap(numbers, asyncTriple)
    println(results)
}
