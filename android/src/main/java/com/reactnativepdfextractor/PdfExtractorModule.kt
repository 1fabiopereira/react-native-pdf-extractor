package com.reactnativepdfextractor

import com.facebook.react.bridge.*
import com.reactnativepdfextractor.core.PdfHandler
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader
import kotlinx.coroutines.runBlocking

class PdfExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  init {
    PDFBoxResourceLoader.init(reactContext)
  }

  override fun getName(): String {
      return "PdfExtractor"
  }

  @ReactMethod
  fun getText(password: String?, promise: Promise) {
    runBlocking {
      val uri = currentActivity?.intent?.data
      val resolver = currentActivity?.contentResolver

      try {
        val data = PdfHandler.getText(uri, resolver, null, password)
        return@runBlocking promise.resolve(data)
      } catch (e: Exception) {
        return@runBlocking promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun getTextWithPattern(patterns: ReadableArray, password: String?, promise: Promise) {
    runBlocking {
      val uri = currentActivity?.intent?.data
      val resolver = currentActivity?.contentResolver

      try {
        val data = PdfHandler.getText(uri, resolver, patterns, password)
        return@runBlocking promise.resolve(data)
      } catch (e: Exception) {
        return@runBlocking promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun hasPassword(promise: Promise) {
    val uri = currentActivity?.intent?.data
    val resolver = currentActivity?.contentResolver

    runBlocking {
      try {
        val data = PdfHandler.isEncrypted(uri, resolver)
        return@runBlocking promise.resolve(data)
      } catch (e: Exception) {
        return@runBlocking promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun getNumberOfPages(password: String?, promise: Promise) {
    val uri = currentActivity?.intent?.data
    val resolver = currentActivity?.contentResolver

    runBlocking {
      try {
        val data = PdfHandler.getNumberOfPages(uri, resolver, password)
        return@runBlocking promise.resolve(data)
      } catch (e: Exception) {
        return@runBlocking promise.reject(e)
      }
    }
  }
}
