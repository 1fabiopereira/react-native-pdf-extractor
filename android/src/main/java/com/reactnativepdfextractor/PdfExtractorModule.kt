package com.reactnativepdfextractor

import com.facebook.react.bridge.*
import com.reactnativepdfextractor.core.PdfHandler
import com.reactnativepdfextractor.core.StringHandler
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader
import com.tom_roush.pdfbox.pdmodel.PDDocument

class PdfExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  init {
    PDFBoxResourceLoader.init(reactContext)
  }

  override fun getName(): String {
      return "PdfExtractor"
  }

  @ReactMethod
  fun getAll(promise: Promise) {
    promise.resolve(getPdfText())
  }

  @ReactMethod
  fun getStringThatMatch(patterns: ReadableArray, promise: Promise) {
    val data = getPdfText()

    val regexes = patterns.toArrayList()
      .map { pattern -> pattern.toString().toRegex() }

    val matches = regexes
      .map { regex -> StringHandler.match(data, regex) }
      .filter { match -> !match.isNullOrEmpty() }

    val result = matches.toSet().toList().joinToString("\n")

    promise.resolve(result)
  }


  private fun getPdfText(): String? {
    val data = currentActivity?.intent?.data
    val resolver = currentActivity?.contentResolver

    if(data === null) return null

    val document = PDDocument.load(resolver?.openInputStream(data))
    return PdfHandler.extract(document)
  }
}
