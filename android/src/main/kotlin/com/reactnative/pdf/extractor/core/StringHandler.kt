package com.reactnative.pdf.extractor.core

class StringHandler {
  companion object {
    @JvmStatic
     fun format(data: String?): String? {
        if(data === null) return null

        val lines = data.lines()

        return lines
          .map { line -> line.replace("\\s+".toRegex(), " ").trim() }
          .filter { line -> line.isNotEmpty() || line.isNotBlank() }
          .joinToString("\n")
          .replace("(\\n)\$".toRegex(), "")
      }

    @JvmStatic
    fun match(data: String?, regex: Regex?): String? {
        if(data === null || regex === null) return null

        val lines = data.lines()

        return lines
          .filter { line -> regex.containsMatchIn(line) }
          .map { line -> regex.find(line)?.range?.let { line.substring(it) } }
          .joinToString("\n")
          .replace("(\\n)\$".toRegex(), "")
    }
  }
}
