package com.reactnative.pdf.extractor.unit.utils

import java.io.BufferedReader
import java.io.File

class TestUtils {
  companion object {
    private const val resourcesPath = "src/test/kotlin/com/reactnative/pdf/extractor/unit/utils/resources"

    @JvmStatic
    fun loadText(filename: String): String {
      val bufferedReader: BufferedReader = File("$resourcesPath/${filename}").bufferedReader()
      return bufferedReader.use { it.readText() }
    }

    @JvmStatic
    fun removeExtraLine(str: String): String {
      return str.replace("(\\n)$".toRegex(), "")
    }
  }
}
