package com.reactnative.pdf.extractor

import android.content.ContentResolver
import android.net.Uri

import com.facebook.react.bridge.*
import com.reactnative.pdf.extractor.core.PdfHandler
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader

class PdfExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  var path: Uri? = null

  init {
    PDFBoxResourceLoader.init(reactContext)
  }

  override fun getName(): String {
    return "PdfExtractor"
  }

  fun getCurrentUri(): Uri? {
    return if (path !== null) path else currentActivity?.intent?.data
  }

  fun getCurrentResolver(): ContentResolver? {
    return currentActivity?.contentResolver
  }

  @ReactMethod
  fun getUri(promise: Promise) {
    val uri = getCurrentUri()
    val path = if(uri !== null) uri.toString() else null

    try {
      return promise.resolve(path)
    } catch (e:Exception) {
      return promise.resolve(null)
    }
  }

  @ReactMethod
  fun setUri(uri: String, promise: Promise) {
    try {
      path = Uri.parse(uri)
      return promise.resolve(path.toString())
    } catch (e: Exception) {
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun canIExtract(promise: Promise) {
    val uri = getCurrentUri()
    val resolver = getCurrentResolver()
    return promise.resolve(uri !== null && resolver !== null)
  }

  @ReactMethod
  fun getText(password: String?, promise: Promise) {
    val uri = getCurrentUri()
    val resolver = getCurrentResolver()

    try {
      val data = PdfHandler.getText(uri, resolver, password)
      return promise.resolve(data)
    } catch (e: Exception) {
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun isEncrypted(promise: Promise) {
    val uri = getCurrentUri()
    val resolver = getCurrentResolver()

    try {
      val data = PdfHandler.isEncrypted(uri, resolver)
      return promise.resolve(data)
    } catch (e: Exception) {
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun getNumberOfPages(password: String?, promise: Promise) {
    val uri = getCurrentUri()
    val resolver = getCurrentResolver()

    try {
      val data = PdfHandler.getNumberOfPages(uri, resolver, password)
      return promise.resolve(data)
    } catch (e: Exception) {
      return promise.reject(e)
    }
  }
}
