package com.reactnative.pdf.extractor

import com.facebook.react.bridge.*
import com.reactnative.pdf.extractor.core.PdfHandler
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader

class PdfExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  init {
    PDFBoxResourceLoader.init(reactContext)
  }

  override fun getName(): String {
      return "PdfExtractor"
  }

  @ReactMethod
  fun getUri(promise: Promise) {
    val uri = currentActivity?.intent?.data
    if (uri !== null) promise.resolve(uri.toString())
    promise.resolve(null)
  }

  @ReactMethod
  fun canIExtract(promise: Promise) {
      val uri = currentActivity?.intent?.data
      val resolver = currentActivity?.contentResolver
      return promise.resolve(uri !== null && resolver !== null)
  }

  @ReactMethod
  fun getText(password: String?, promise: Promise) {
      val uri = currentActivity?.intent?.data
      val resolver = currentActivity?.contentResolver

    return try {
      val data = PdfHandler.getText(uri, resolver, null, password)
      promise.resolve(data)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getTextWithPattern(patterns: ReadableArray, password: String?, promise: Promise) {
      val uri = currentActivity?.intent?.data
      val resolver = currentActivity?.contentResolver

    return try {
      val data = PdfHandler.getText(uri, resolver, patterns, password)
      promise.resolve(data)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun isEncrypted(promise: Promise) {
    val uri = currentActivity?.intent?.data
    val resolver = currentActivity?.contentResolver

    return try {
      val data = PdfHandler.isEncrypted(uri, resolver)
      promise.resolve(data)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getNumberOfPages(password: String?, promise: Promise) {
    val uri = currentActivity?.intent?.data
    val resolver = currentActivity?.contentResolver

    return try {
      val data = PdfHandler.getNumberOfPages(uri, resolver, password)
      promise.resolve(data)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }
}
