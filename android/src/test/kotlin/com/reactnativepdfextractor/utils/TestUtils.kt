package com.reactnativepdfextractor.utils

import java.io.BufferedReader
import java.io.File

class TestUtils {
  companion object {
    private const val resourcesPath = "src/test/kotlin/com/reactnativepdfextractor/core/resources"

    @JvmStatic
    fun loadText(filename: String): String {
      val bufferedReader: BufferedReader = File("${resourcesPath}/${filename}").bufferedReader()
      return bufferedReader.use { it.readText() }
    }

    @JvmStatic
    fun removeExtraLine(str: String): String {
      return str.replace("(\\n)$".toRegex(), "")
    }
  }
}
