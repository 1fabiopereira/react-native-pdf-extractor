package com.reactnativepdfextractor.core

import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking

class StringHandler {
  companion object {
    @JvmStatic
    fun format(data: String?): String? = runBlocking {
      val deferred = async {
        if(data === null) return@async null

        val lines = data.lines()

        return@async lines
          .map { line -> line.replace("\\s+".toRegex(), " ").trim() }
          .filter { line -> line.isNotEmpty() || line.isNotBlank() }
          .joinToString("\n")
          .replace("(\\n)\$".toRegex(), "")
      }

      return@runBlocking deferred.await()
    }

    @JvmStatic
    fun match(data: String?, regex: Regex?): String? = runBlocking {
      val deferred = async {
        if(data === null || regex === null) return@async null

        val lines = data.lines()

        return@async lines
          .filter { line -> regex.containsMatchIn(line) }
          .map { line -> regex.find(line)?.range?.let { line.substring(it) } }
          .joinToString("\n")
          .replace("(\\n)\$".toRegex(), "")
      }

      return@runBlocking deferred.await()
    }
  }
}
