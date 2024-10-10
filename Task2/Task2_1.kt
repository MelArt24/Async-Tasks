// Prepared promise based alternative
// Wrote use case for the promise based solution

import kotlinx.coroutines.*

fun <T, R> promiseMap(scope: CoroutineScope, list: List<T>, callback: (T) -> Deferred<R>): Deferred<List<R>> {
    return scope.async {
        list.map { callback(it).await() }
    }
}

fun main() = runBlocking {
    val numbers = listOf(1, 2, 3, 4, 5)

    val promiseTriple: (Int) -> Deferred<Int> = { num ->
        CompletableDeferred<Int>().apply {
            launch {
                delay(1000)
                complete(num * 3)
            }
        }
    }
    
    val results = promiseMap(this, numbers, promiseTriple).await()
    println(results)
