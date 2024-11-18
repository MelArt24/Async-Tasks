import kotlinx.coroutines.*

suspend fun <T, R> asyncMap(
    list: List<T>,
    transform: suspend (T) -> R,
    job: Job? = null
): List<R> {
    return coroutineScope {
        list.map { item ->
            async(job?.let { it + coroutineContext } ?: coroutineContext) {
                if (job?.isCancelled == true) throw CancellationException("Operation was cancelled")
                transform(item)
            }
        }.awaitAll()
    }
}

fun main() = runBlocking {
    val job = Job()
    val scope = CoroutineScope(job + Dispatchers.Default)

    val numbers = listOf(1, 2, 3, 4, 5)

    val asyncTriple: suspend (Int) -> Int = { num ->
        delay((500..1000).random().toLong())
        num * 3
    }

    try {
        val results = scope.async {
            asyncMap(numbers, asyncTriple, job)
        }

        delay(1000)
        job.cancel(CancellationException("Aborted manually"))

        println(results.await())
    } catch (e: CancellationException) {
        println("Operation was cancelled: ${e.message}")
    } finally {
        job.cancel()
    }
}
