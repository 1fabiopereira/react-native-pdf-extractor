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
  }
}
