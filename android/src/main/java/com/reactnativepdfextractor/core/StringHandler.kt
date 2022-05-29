package com.reactnativepdfextractor.core

class StringHandler {
  companion object {
    @JvmStatic
    fun format(data: String): String {
      return data
        .lines()
        .map { line -> line.replace("\\s+".toRegex(), " ").trim() }
        .filter { line -> line.isNotEmpty() }
        .joinToString("\n")
    }

    @JvmStatic
    fun match(data: String?, regex: Regex?): String? {
      if(data === null || regex === null) return null
      return data
        .lines()
        .filter { line -> regex.containsMatchIn(line) }
        .map { line -> regex.find(line)?.range?.let { line.substring(it) } }
        .joinToString("\n")
    }
  }
}
