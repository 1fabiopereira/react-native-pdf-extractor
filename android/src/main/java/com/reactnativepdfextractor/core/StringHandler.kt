package com.reactnativepdfextractor.core

import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking

class StringHandler {
  companion object {
    @JvmStatic
    fun format(data: String?): String? = runBlocking {
      val deferred = async {
        if(data === null) return@async null
        return@async data
          .lines()
          .map { line -> line.replace("\\s+".toRegex(), " ").trim() }
          .filter { line -> line.isNotEmpty() }
          .joinToString("\n")
      }

      return@runBlocking deferred.await()
    }

    @JvmStatic
    fun match(data: String?, regex: Regex?): String? = runBlocking {
      val deferred = async {
        if(data === null || regex === null) return@async null
        return@async data
          .lines()
          .filter { line -> regex.containsMatchIn(line) }
          .map { line -> regex.find(line)?.range?.let { line.substring(it) } }
          .joinToString("\n")
      }

      return@runBlocking deferred.await()
    }
  }
}
