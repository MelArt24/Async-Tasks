import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun createFlow(array: List<Int>): Flow<Int> = flow {
    array.forEach { item ->
        emit(item)
    }
}

suspend fun <T, R> streamMap(
    stream: Flow<T>,
    callback: suspend (T) -> R,
    signal: Job
): List<R> {
    val results = mutableListOf<R>()
    try {
        stream.collect { value ->
            if (!signal.isActive) {
                throw CancellationException("Aborted")
            }
            results.add(callback(value))
        }
    } catch (e: CancellationException) {
        throw e
    }
    return results
}

fun demoFunc() = runBlocking {
    val controller = Job()

    // case 1
    val numbers = listOf(1, 2, 3, 4, 5)
    val promiseTriple: suspend (Int) -> Int = { num -> num * 3 }

    val stream = createFlow(numbers)

    try {
        val results1 = streamMap(stream, promiseTriple, controller)
        println("Case 1 results: $results1")
    } catch (err: CancellationException) {
        println("Case 1 was aborted")
    } catch (err: Exception) {
        println("Error: ${err.message}")
    }

    controller.cancel()

    // case 2
    val numbers2 = listOf(10, 20, 30)
    val promiseSquare: suspend (Int) -> Int = { num -> num * num }

    val stream2 = createFlow(numbers2)

    try {
        val results2 = streamMap(stream2, promiseSquare, controller)
        println("Case 2 results: $results2")
    } catch (err: CancellationException) {
        println("Case 2 was aborted")
    } catch (err: Exception) {
        println("Error: ${err.message}")
    }
}

fun main() {
    demoFunc()
}
